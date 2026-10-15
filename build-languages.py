"""
Builds the Khmer, Vietnamese and Chinese versions of the site from the English pages.

    python build-languages.py           build km/, vi/ and zh-tw/ and refresh the language switcher
    python build-languages.py --sync    also add any new English text to the files in lang/ (with "" values)
    python build-languages.py --missing also list the text that has no translation yet

How it works
- The English pages in this folder are the source. Edit them as usual.
- lang/km.json, lang/vi.json and lang/zh-tw.json hold the translations, keyed by the English text.
  Text with formatting keeps its tags in both the key and the translation, for example
  "<span class=\"heilight-left\">How</span> we work with our clients."
- A missing or empty translation shows the English instead, so a page never breaks.
- The translated pages are written to km/, vi/ and zh-tw/. Do not edit those folders by hand:
  they are replaced every time this script runs.
- The language switcher, the language fonts and the alternate-language links live between
  <!--lang:...--> markers in every page. This script writes them; edit the templates below instead.
"""

import glob
import html
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
LANG_DIR = os.path.join(ROOT, "lang")

# Full address of the live site, used for the hreflang links Google reads, e.g. "https://www.innercircle.com".
# Leave empty until the domain is known; the hreflang links are left out until then.
SITE_URL = ""

LANGUAGES = [
    # code, <html lang>, name shown in the switcher, short label, Google Fonts stylesheet (None = site fonts)
    {"code": "en", "html_lang": "en", "native": "English", "short": "EN", "font": None},
    {"code": "km", "html_lang": "km", "native": "ភាសាខ្មែរ", "short": "ខ្មែរ",
     "font": "https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;500;600;700&display=swap"},
    {"code": "vi", "html_lang": "vi", "native": "Tiếng Việt", "short": "VI",
     "font": "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap"},
    {"code": "zh-tw", "html_lang": "zh-Hant-TW", "native": "中文 (台灣)", "short": "中文",
     "font": "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap"},
]

# Tags that sit inside a sentence. Text joined by these is translated as one piece,
# so translators can reorder words around them.
INLINE_TAGS = {"span", "strong", "b", "em", "i", "u", "br", "sup", "sub", "mark"}
VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}
TRANSLATED_ATTRS = {"alt", "title", "placeholder", "aria-label"}
URL_ATTRS = {"href", "src", "srcset", "action", "poster", "data-src", "data-background"}

TOKEN_RE = re.compile(
    r"<!--.*?-->"                                  # comment
    r"|<(script|style)\b[^>]*>.*?</\1\s*>"         # script / style block, kept as is
    r"|<!?/?[a-zA-Z][^>]*>"                         # tag or doctype
    r"|[^<]+|<",                                    # text
    re.S | re.I,
)
TAG_NAME_RE = re.compile(r"<\s*(/?)\s*([a-zA-Z0-9-]+)")
ATTR_RE = re.compile(r'([a-zA-Z_:][-a-zA-Z0-9_:.]*)(\s*=\s*)("[^"]*"|\'[^\']*\')')
EMPTY_ELEMENT = r"(?:<(?:i|span|b|strong|em)\b[^>]*>\s*(?:<i\b[^>]*>\s*</i>\s*)?</(?:i|span|b|strong|em)\s*>|<br\s*/?>)"
# Leading/trailing pieces that are not part of the sentence: spaces, empty icon elements,
# and the dangling end or start of an element around an image.
INLINE_ALT = "span|strong|b|em|i|u|sup|sub|mark|a"
LEAD_RE = re.compile(r"^(?:\s|" + EMPTY_ELEMENT + r"|</(?:" + INLINE_ALT + r")\s*>)+")
TRAIL_RE = re.compile(r"(?:\s|" + EMPTY_ELEMENT + r"|<(?:" + INLINE_ALT + r")\b[^>]*>)+$")
# A link inside a sentence is translated together with the sentence around it.
SENTENCE_PARENTS = {"p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "td", "figcaption"}
WRAPPED_RE = re.compile(r"<(a|span|strong|b|em)\b[^>]*>(.*)</\1\s*>", re.S)
LETTER_RE =re.compile(r"[^\W\d_]", re.U)
MARKER_RE = re.compile(r"(<!--lang:(\w+)-->)(.*?)(<!--/lang:\2-->)", re.S)


def normalize(text):
    return re.sub(r"\s+", " ", text).strip()


def has_letters(fragment):
    return bool(LETTER_RE.search(html.unescape(re.sub(r"<[^>]+>", " ", fragment))))


def tokenize(source):
    """Splits a page into (kind, start, end, tag name, is closing tag) tokens."""
    tokens = []
    for m in TOKEN_RE.finditer(source):
        s = m.group(0)
        if s.startswith("<!--"):
            tokens.append(("comment", m.start(), m.end(), None, False))
        elif m.group(1):
            tokens.append(("raw", m.start(), m.end(), m.group(1).lower(), False))
        elif s.startswith("<") and len(s) > 1:
            nm = TAG_NAME_RE.match(s)
            name = nm.group(2).lower() if nm else ""
            tokens.append(("tag", m.start(), m.end(), name, bool(nm and nm.group(1))))
        else:
            tokens.append(("text", m.start(), m.end(), None, False))
    return tokens


def find_texts(source):
    """Yields (start, end, key) for every translatable stretch of text in a page."""
    tokens = tokenize(source)
    stack = []          # open elements: (name, skip, link inside a sentence)
    run = []            # tokens of the current text run

    def skipping():
        return any(e[1] for e in stack)

    def inline(name, closing):
        if name in INLINE_TAGS:
            return True
        if name != "a":
            return False
        if closing:
            return any(e[0] == "a" and e[2] for e in stack)
        return parent_name(stack) in SENTENCE_PARENTS

    def flush():
        if not run:
            return None
        start, end = run[0][1], run[-1][2]
        run.clear()
        chunk = source[start:end]
        lead = LEAD_RE.match(chunk)
        if lead:
            start += lead.end()
        chunk = source[start:end]
        trail = TRAIL_RE.search(chunk)
        if trail:
            end -= len(chunk) - trail.start()
        # Text that is all inside one link or span ("<a href=...>Title</a>"): translate just the text.
        whole = WRAPPED_RE.match(source, start, end)
        if whole and whole.end() == end and "<" + whole.group(1) not in whole.group(2):
            start, end = whole.start(2), whole.end(2)
        if end <= start or not has_letters(source[start:end]):
            return None
        return start, end, normalize(source[start:end])

    for tok in tokens:
        kind, start, end, name, closing = tok
        if kind == "text" or (kind == "tag" and inline(name, closing)):
            if not skipping():
                run.append(tok)
            if kind == "tag":
                track(stack, source[start:end], name, closing)
            continue
        found = flush()
        if found:
            yield found
        if kind == "tag":
            track(stack, source[start:end], name, closing)
    found = flush()
    if found:
        yield found


def parent_name(stack):
    """Name of the nearest open element that is not an inline one."""
    return next((e[0] for e in reversed(stack) if e[0] not in INLINE_TAGS), "")


def track(stack, tag, name, closing):
    """Keeps the stack of open elements, so text inside translate="no" is left alone
    and links inside sentences are recognised."""
    if tag.startswith("<!") or name in VOID_TAGS or tag.endswith("/>"):
        return
    if closing:
        for i in range(len(stack) - 1, -1, -1):
            if stack[i][0] == name:
                del stack[i:]
                break
        return
    skip = bool(re.search(r'\btranslate\s*=\s*["\']no["\']', tag, re.I))
    stack.append((name, skip, name == "a" and parent_name(stack) in SENTENCE_PARENTS))


def tag_attr_texts(tag):
    """Yields (match, value) for translatable attributes in one start tag."""
    name = (TAG_NAME_RE.match(tag).group(2) or "").lower()
    attrs = {m.group(1).lower(): m for m in ATTR_RE.finditer(tag)}
    for attr, m in attrs.items():
        value = m.group(3)[1:-1]
        wanted = attr in TRANSLATED_ATTRS
        if name == "meta" and attr == "content":
            kind = (attrs.get("name") or attrs.get("property"))
            wanted = kind is not None and kind.group(3)[1:-1].lower() in ("description", "og:title", "og:description", "twitter:title", "twitter:description")
        if name == "input" and attr == "value":
            t = attrs.get("type")
            wanted = t is not None and t.group(3)[1:-1].lower() in ("submit", "button")
        if wanted and has_letters(value):
            yield m, value


def page_files():
    return sorted(os.path.basename(p) for p in glob.glob(os.path.join(ROOT, "*.html")))


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)


def collect_keys():
    """All English text on the site, in page order, with the pages it appears on."""
    keys = {}
    for page in page_files():
        source = read(os.path.join(ROOT, page))
        source = MARKER_RE.sub(lambda m: m.group(1) + m.group(4), source)
        for _, _, key in find_texts(source):
            keys.setdefault(key, []).append(page)
        for tag in re.findall(r"<[a-zA-Z][^>]*>", source):
            for _, value in tag_attr_texts(tag):
                keys.setdefault(normalize(value), []).append(page)
    return keys


# Text used by the language switcher itself (it is generated below, not read from the pages).
SWITCHER_KEYS = ["Language", "Choose language"]


def load_translations(code):
    path = os.path.join(LANG_DIR, code + ".json")
    if not os.path.exists(path):
        return {}
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    return {normalize(k): v for k, v in data.items() if not k.startswith("_") and isinstance(v, str) and v.strip()}


def sync_translation_files(keys):
    """Adds new English text to each lang/*.json (with an empty value) and lists text no page uses any more."""
    for language in LANGUAGES[1:]:
        path = os.path.join(LANG_DIR, language["code"] + ".json")
        data = {}
        if os.path.exists(path):
            with open(path, encoding="utf-8") as f:
                data = json.load(f)
        merged = {k: v for k, v in data.items() if k.startswith("_")}
        for key in keys:
            merged[key] = data.get(key, "")
        unused = [k for k in data if not k.startswith("_") and k not in merged]
        for key in unused:                 # kept at the end, so no translation is lost by accident
            merged[key] = data[key]
        write(path, json.dumps(merged, ensure_ascii=False, indent=2) + "\n")
        print(f"lang/{language['code']}.json: {len(keys)} texts" + (f", {len(unused)} no longer used (at the end of the file)" if unused else ""))


# ---------- Translating one page ----------

def translate_page(source, t):
    """Replaces English text and attributes with translations from t. Missing ones stay English."""
    edits = [(s, e, t[key]) for s, e, key in find_texts(source) if key in t]
    for s, e, new in reversed(edits):
        source = source[:s] + new + source[e:]

    def attrs(m):
        tag = m.group(0)
        for am, value in reversed(list(tag_attr_texts(tag))):
            new = t.get(normalize(value))
            if new:
                quote = am.group(3)[0]
                new = new.replace(quote, "&quot;" if quote == '"' else "&#39;")
                s, e = am.start(3) + 1, am.end(3) - 1
                tag = tag[:s] + new + tag[e:]
        return tag
    return re.sub(r"<[a-zA-Z][^>]*>", attrs, source)


def is_relative_asset(url):
    """True for links to files in this folder ("assets/img/a.png"); False for pages, anchors and full URLs."""
    url = url.strip()
    if not url or url.startswith(("#", "/", "data:", "mailto:", "tel:", "javascript:")) or re.match(r"^[a-zA-Z][a-zA-Z0-9+.-]*:", url):
        return False
    return not re.split(r"[?#]", url)[0].lower().endswith(".html")


def move_into_folder(source):
    """Fixes file links for a page that lives one folder down (km/index.html): assets/x becomes ../assets/x.
    Links to other pages stay as they are, so they point at the same language."""
    def fix_url(url):
        return "../" + url if is_relative_asset(url) else url

    def tag(m):
        text = m.group(0)
        for am in reversed(list(ATTR_RE.finditer(text))):
            name, value = am.group(1).lower(), am.group(3)[1:-1]
            if name in URL_ATTRS:
                if name == "srcset":
                    new = ", ".join(" ".join([fix_url(p.split()[0])] + p.split()[1:]) for p in value.split(",") if p.strip())
                else:
                    new = fix_url(value)
            elif name == "style":
                new = re.sub(r"url\(\s*(['\"]?)([^'\")]+)\1\s*\)", lambda u: f"url({u.group(1)}{fix_url(u.group(2))}{u.group(1)})", value)
            else:
                continue
            s, e = am.start(3) + 1, am.end(3) - 1
            text = text[:s] + new + text[e:]
        return text
    return re.sub(r"<[a-zA-Z][^>]*>", tag, source)


# ---------- Language switcher, fonts and alternate links ----------

GLOBE_ICON = ('<svg class="ic-lang-globe" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6">'
              '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/></svg>')
CARET_ICON = ('<svg class="ic-lang-caret" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" '
              'stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>')


def page_url(page, target, current):
    """Link from the current language's copy of page to target's copy."""
    up = "" if current["code"] == "en" else "../"
    return up + ("" if target["code"] == "en" else target["code"] + "/") + page


def lang_links(page, current, css_class):
    current_attr = ' aria-current="true"'
    links = []
    for language in LANGUAGES:
        active = language is current
        links.append(
            f'<a href="{page_url(page, language, current)}" hreflang="{language["html_lang"]}" lang="{language["html_lang"]}" '
            f'data-lang="{language["code"]}" class="{css_class}{" active" if active else ""}"'
            f'{current_attr if active else ""}>{language["native"]}</a>')
    return links


def marker_content(name, page, current, t):
    tr = lambda text: t.get(text, text)
    if name == "head":
        lines = []
        if current["font"]:
            lines.append('<link rel="preconnect" href="https://fonts.googleapis.com">')
            lines.append('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>')
            lines.append(f'<link rel="stylesheet" href="{current["font"]}">')
        if SITE_URL:
            for language in LANGUAGES:
                prefix = "" if language["code"] == "en" else language["code"] + "/"
                lines.append(f'<link rel="alternate" hreflang="{language["html_lang"]}" href="{SITE_URL.rstrip("/")}/{prefix}{page}">')
            lines.append(f'<link rel="alternate" hreflang="x-default" href="{SITE_URL.rstrip("/")}/{page}">')
        return "\n  " + "\n  ".join(lines) + "\n  " if lines else ""
    if name == "switcher":
        items = "\n".join(f"                  <li>{a}</li>" for a in lang_links(page, current, "ic-lang-option"))
        return f'''
              <div class="ic-lang" data-ic-lang translate="no">
                <button type="button" class="ic-lang-toggle" aria-expanded="false" aria-controls="ic-lang-menu" aria-label="{tr("Choose language")}: {current["native"]}">
                  {GLOBE_ICON}
                  <span class="ic-lang-name" lang="{current["html_lang"]}">{current["native"]}</span>
                  {CARET_ICON}
                </button>
                <ul class="ic-lang-menu" id="ic-lang-menu">
{items}
                </ul>
              </div>
              '''
    if name == "mobile":
        chips = "\n".join(f"          {a}" for a in lang_links(page, current, "ic-lang-chip"))
        return f'''
      <div class="ic-lang-mobile" translate="no">
        <h3>{tr("Language")}</h3>
        <div class="ic-lang-chips">
{chips}
        </div>
      </div>
      '''
    raise ValueError("Unknown marker " + name)


def fill_markers(source, page, current, t):
    return MARKER_RE.sub(lambda m: m.group(1) + marker_content(m.group(2), page, current, t) + m.group(4), source)


def build():
    keys = list(collect_keys()) + SWITCHER_KEYS
    if "--sync" in sys.argv:
        sync_translation_files(keys)

    pages = page_files()
    for page in pages:                      # English: only the marker regions change
        path = os.path.join(ROOT, page)
        source = read(path)
        updated = fill_markers(source, page, LANGUAGES[0], {})
        if updated != source:
            write(path, updated)

    for language in LANGUAGES[1:]:
        t = load_translations(language["code"])
        folder = os.path.join(ROOT, language["code"])
        for old in glob.glob(os.path.join(folder, "*.html")):
            os.remove(old)
        for page in pages:
            source = read(os.path.join(ROOT, page))
            source = MARKER_RE.sub(lambda m: m.group(1) + m.group(4), source)
            source = translate_page(source, t)
            source = re.sub(r'<html\b[^>]*\blang="[^"]*"', lambda m: re.sub(r'lang="[^"]*"', f'lang="{language["html_lang"]}"', m.group(0)), source, count=1)
            source = move_into_folder(source)
            source = fill_markers(source, page, language, t)
            write(os.path.join(folder, page), source)
        missing = [k for k in keys if k not in t]
        print(f"{language['code']}/: {len(pages)} pages, {len(keys) - len(missing)} of {len(keys)} texts translated"
              + (f" ({len(missing)} still in English)" if missing else ""))
        if missing and "--missing" in sys.argv:
            for key in missing:
                print("    " + key)


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    if "--dump" in sys.argv:
        keys = list(collect_keys()) + SWITCHER_KEYS
        print(json.dumps(keys, ensure_ascii=False, indent=1))
    else:
        build()
