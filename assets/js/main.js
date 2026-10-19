(function ($) {

  $(document).ready(function () {

	//=======================
	
	// mobile menu start
	$('#mobile-menu-active').metisMenu();

	$('#mobile-menu-active .dropdown > a').on('click', function (e) {
		e.preventDefault();
	});

	$(".hamburger_menu").on("click", function (e) {
		e.preventDefault();
		$(".slide-bar").toggleClass("show");
		$("body").addClass("on-side");
		$('.body-overlay').addClass('active');
		$(this).addClass('active');
	});

	$(".close-mobile-menu > a").on("click", function (e) {
		e.preventDefault();
		$(".slide-bar").removeClass("show");
		$("body").removeClass("on-side");
		$('.body-overlay').removeClass('active');
		$('.hamburger_menu').removeClass('active');
	});

  

 $(".cover").show();
 $(document).ready(function(){
   $(".cover").delay("500").fadeOut();
   
   var thehours = new Date().getHours();
   var themessage;
   var morning = ('Good morning');
   var afternoon = ('Good afternoon');
   var evening = ('Good evening');
 
   if (thehours >= 0 && thehours < 12){
     themessage = morning; 
   } else if (thehours >= 12 && thehours < 17){
     themessage = afternoon;
   } else if (thehours >= 17 && thehours < 24){
     themessage = evening;
   }
   $('.greeting').append(themessage+" ,");
  
   var usernameFull = "Mitchell Swaffield";
   
   $(".usernameFull").append(usernameFull);
   
   $(".headingNav .fa-bars, .sideBar, .fa-times").click(function(){
     $(".slideBar").toggleClass("hidden");
     $(".mainContent").toggleClass("blurred");
   }); 
   
 });



    //Sliders define
    const logoSlider = $(".logos");
    const caseStudy = $(".case-studes");
    const testimonial3 = $(".testimonials-3");
    const testimonial4 = $(".testimonials-4");
    const caseStudyRtl = $(".case-studes-rtl");

    //Testimonial 3 slider
    testimonial3.owlCarousel({
      loop: true,
      nav: false,
      dots: false,
      items: 3,
      margin: 30,
      responsive: {
        0: {
          items: 1,
        },
        800: {
          items: 2,
        },
        1200: {
          items: 3,
        },
      },
    });

    //Testimonial Slider
    if (testimonial4.length > 0) {
      testimonial4.owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        items: 1,
        navText: [
          "<i class='fa-solid fa-angle-left'></i>",
          "<i class='fa-solid fa-angle-right'></i>",
        ],
      });
    }

    //Logo Slider
    logoSlider.owlCarousel({
      loop: true,
      nav: false,
      dots: false,
      items: 5,
      margin: 30,
      responsive: {
        0: {
          items: 2,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 5,
        },
      },
    });

    //service owlCarousel
    $(".home4-slider-all").owlCarousel({
      loop: true,
      margin: 10,
      dots: true,
      nav: false,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 6,
        },
      },
    });

     //service 7 owlCarousel
     $(".servcie7-slider").owlCarousel({
      loop: true,
      margin: 10,
      dots: false,
      nav: true,
      navText: [
        "<i class='fa-solid fa-arrow-left'></i>",
        "<i class='fa-solid fa-arrow-right'></i>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 4,
        },
      },
    });

    //case study 7 owlCarousel
    $(".case7-slider-all").owlCarousel({
      loop: true,
      margin: 10,
      dots: false,
      nav: true,
      autoplay: true,
      autoplayTimeout: 2000,
      cssEase: 'linear',
      pauseOnHover: false,
      navText: [
        "<i class='fa-solid fa-arrow-left'></i>",
        "<i class='fa-solid fa-arrow-right'></i>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 3,
        },
      },
    });

       //testimonial 7 owlCarousel
       $(".tes7-slider-all").owlCarousel({
        loop: true,
        margin: 10,
        dots: true,
        nav: true,
        autoplay: true,
        autoplayTimeout: 2000,
        cssEase: 'linear',
        navText: [
          "<i class='fa-solid fa-arrow-left'></i>",
          "<i class='fa-solid fa-arrow-right'></i>",
        ],
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 2,
          },
          1000: {
            items: 3,
          },
        },
      });


    // owl-carousel-slider
    $(".trusred-slider-all").owlCarousel({
      loop: true,
      nav: true,
      dots: false,
      autoplay: true,
      // autoplayTimeout: 3000,
      items: 1,
    });

    //CaseStudy owlCarousel
    caseStudy.owlCarousel({
      loop: true,
      nav: true,
      dots: false,
      items: 3,
      margin: 30,
      navText: [
        "<i class='fa-solid fa-arrow-left'></i>",
        "<i class='fa-solid fa-arrow-right'></i>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 3,
        },
      },
    });

    //CaseStudy owlCarousel Rtl
    caseStudyRtl.owlCarousel({
      loop: true,
      nav: true,
      dots: false,
      items: 3,
      margin: 30,
      rtl: true,
      navText: [
        "<i class='fa-solid fa-arrow-left'></i>",
        "<i class='fa-solid fa-arrow-right'></i>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 3,
        },
      },
    });

    //Mobile Menus acitve
    const mobile_menu = $(".mobile-menus");
    const menu_actives = $(".menu-wrap");
    const hamburger_menu = $(".hamburger-menu");
    mobile_menu.on("click", function () {
      menu_actives.toggleClass("mobile-menu-active");
      hamburger_menu.toggleClass("active");
    });


    $(".header-search-btn").on("click", function (e) {
      e.preventDefault();
      $(".header-search-form-wrapper").addClass("open");
      $('.header-search-form-wrapper input[type="search"]').focus();
      $('.body-overlay').addClass('active');
 });
 $(".tx-search-close").on("click", function (e) {
      e.preventDefault();
      $(".header-search-form-wrapper").removeClass("open");
      $("body").removeClass("active");
      $('.body-overlay').removeClass('active');
 });
 

    //product size
    const sizes = $("ul.product-sizes li");

    sizes.on("click", function () {
      $("ul.product-sizes li").removeClass("active");
      $(this).addClass("active");
    });

        //product size
        const cuntries = $(".cuntries-icon-box");

        cuntries.on("click", function () {
          $(".cuntries-icon-box").removeClass("active");
          $(this).addClass("active");
        });


    //product colors
    const colors = $("ul.product-colors li");

    colors.on("click", function () {
      $("ul.product-colors li").removeClass("active");
      $(this).addClass("active");
    });

        //contact colors
        const select = $("ul.select-c li");

        select.on("click", function () {
          $("ul.select-c li").removeClass("active");
          $(this).addClass("active");
        });
     

    //Pricing table buttons

    $("#ce-toggle").click(function (event) {
      $(".plan-toggle-wrap").toggleClass("active");
    });

    $("#ce-toggle").change(function () {
      if ($(this).is(":checked")) {
        $(".tab-content #yearly").hide();
        $(".tab-content #monthly").show();
      } else {
        $(".tab-content #yearly").show();
        $(".tab-content #monthly").hide();
      }
    });

    //testimonial slider
    $(".testimonial-nav").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: ".slider-testimonial",
      dots: false,
      loop: true,
      centerMode: true,
      focusOnSelect: true,
      arrows: false,
    });

    $(".slider-testimonial").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: $(".testimonial-prev-arrow"),
      nextArrow: $(".testimonial-next-arrow"),
      fade: true,
      loop: true,
      asNavFor: ".testimonial-nav",
    });


      //testimonial case study 8
      $(".case8-slider-all").slick({
        centerMode: false,
        margin: "30",
        slidesToShow: 3,
        arrows: true,
        prevArrow: $(".testimonial-prev-arrow1"),
        nextArrow: $(".testimonial-next-arrow1"),
        draggable: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "40px",
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "40px",
              slidesToShow: 1,
            },
          },
        ],
      });


            //testimonial case study 8
            $(".service9-slider-all").slick({
              centerMode: false,
              margin: "30",
              slidesToShow: 3,
              arrows: true,
              prevArrow: $(".testimonial-prev-arrow1"),
              nextArrow: $(".testimonial-next-arrow1"),
              draggable: true,
              responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "40px",
                    slidesToShow: 1,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "40px",
                    slidesToShow: 1,
                  },
                },
              ],
            });



            //testimonial 10
            $(".tes10-slider-all").slick({
              centerMode: false,
              margin: "30",
              slidesToShow: 3,
              autoplay: true,
              autoplayTimeout: 1000,
              arrows: true,
              prevArrow: $(".testimonial10-prev-arrow"),
              nextArrow: $(".testimonial10-next-arrow"),
              draggable: true,
              responsive: [

                {
                  breakpoint: 1080,
                  settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "40px",
                    slidesToShow: 2,
                  },
                },

                {
                  breakpoint: 768,
                  settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "40px",
                    slidesToShow: 1,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "40px",
                    slidesToShow: 1,
                  },
                },
              ],
            });


                //blog 10 slider
                $(".blog10-slider-all").slick({
                  centerMode: false,
                  margin: "30",
                  slidesToShow: 3,
                  arrows: true,
                  autoplay: true,
                  autoplayTimeout: 1000,
                  prevArrow: $(".blog10-prev-arrow"),
                  nextArrow: $(".blog10-next-arrow"),
                  draggable: true,
                  responsive: [
                    {
                      breakpoint: 768,
                      settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: "40px",
                        slidesToShow: 1,
                      },
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: "40px",
                        slidesToShow: 1,
                      },
                    },
                  ],
                });

                //home 11 hero slider
                $(".hero11-slider-area").slick({
                  centerMode: false,
                  margin: "30",
                  slidesToShow: 1,
                  arrows: false,
                  draggable: true,
                  fade: true,
                  dots: true,
                  autoplay: true,
                  autoplayTimeout: 1000,
                  responsive: [
                    {
                      breakpoint: 768,
                      settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: "40px",
                        slidesToShow: 1,
                      },
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: "40px",
                        slidesToShow: 1,
                      },
                    },
                  ],
                });


              // testimonial 8//
              $('.slider-galeria').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                infinite: false,
                asNavFor: '.slider-galeria-thumbs',
                prevArrow: $('.testimonial-next-arrow2'),
                nextArrow: $('.testimonial-prev-arrow2'),
              });
              $('.slider-galeria-thumbs').slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                items:15,
                arrows: true,
                asNavFor: '.slider-galeria',
                vertical: true,
                verticalSwiping: true,
                focusOnSelect: true,
                infinite: false,
                prevArrow: $('.testimonial-next-arrow2'),
                nextArrow: $('.testimonial-prev-arrow2'),
              });



              // testimonial 9//
              $(".tes9-slider-all").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
                focusOnSelect: true,
                asNavFor: ".image-slider-all",
                // autoplay:true,
                // autoplayTimeout:500,
              });

              $('.image-slider-all').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                asNavFor: '.tes9-slider-all',
                dots: false,
                arrows:false,
                fade: true,
                loop:true,
                centerMode: false,
                focusOnSelect: true,
                // autoplay:true,
                // autoplayTimeout:500,
             });





    //testimonial slider Rtl
    $(".testimonial-nav-rtl").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: ".slider-testimonial-rtl",
      dots: false,
      loop: true,
      rtl: true,
      centerMode: true,
      focusOnSelect: true,
      arrows: false,
    });

    $(".slider-testimonial-rtl").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      rtl: true,
      prevArrow: $(".testimonial-prev-arrow"),
      nextArrow: $(".testimonial-next-arrow"),
      fade: true,
      loop: true,
      asNavFor: ".testimonial-nav-rtl",
    });

    //Product slider
    $(".product-slider-single").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: ".product-slider-nav",
      dots: false,
      arrows: false,
      centerMode: false,
      focusOnSelect: true,
    });

    $(".product-slider-nav").slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: false,

      focusOnSelect: true,
      asNavFor: ".product-slider-single",
    });

    // sticky header active
    if ($("#header").length > 0) {
      $(window).on("scroll", function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 1) {
          $("#header").removeClass("sticky");
        } else {
          $("#header").addClass("sticky");
        }
      });
    }

    //up button old function
    if ($(".up-arrow").length > 0) {
      $(window).on("scroll", function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 200) {
          $(".up-arrow").removeClass("active");
        } else {
          $(".up-arrow").addClass("active");
        }
      });
    }

    //minus

    var buttonPlus = $(".qty-btn-plus");
    var buttonMinus = $(".qty-btn-minus");

    var incrementPlus = buttonPlus.click(function () {
      var $n = $(this).parent(".qty-container").find(".input-qty");
      $n.val(Number($n.val()) + 1);
    });

    var incrementMinus = buttonMinus.click(function () {
      var $n = $(this).parent(".qty-container").find(".input-qty");
      var amount = Number($n.val());
      if (amount > 0) {
        $n.val(amount - 1);
      }
    });

    
    //Up button functions
    var progressPath = document.querySelector(".progress-wrap path");
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "none";
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "stroke-dashoffset 10ms linear";
    var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    };
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 550;
    jQuery(window).on("scroll", function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery(".progress-wrap").addClass("active-progress");
      } else {
        jQuery(".progress-wrap").removeClass("active-progress");
      }
    });

    jQuery(".progress-wrap").on("click", function (event) {
      event.preventDefault();
      jQuery("html, body").animate(
        {
          scrollTop: 0,
        },
        duration
      );
      return false;
    });

    //scrolling
    if ($(".scroll").length > 0) {
      var scrollers = $('.scroll');
      scrollers.on("click", function (e) {
        e.preventDefault();
        $("html, body").animate(
          {
            scrollTop: $($(this).attr("href")),
          },
          1000,
          "linear"
        );
      });
    }

    //Aos animation active

    AOS.init({
      offset: 60, // start animations soon after an element enters the screen (200 left sections blank while scrolling)
      once: true, // animate each element only once, not again every time you scroll back up
      duration: 400,
      easing: "ease-in-out",
      anchorPlacement: "top-bottom",
      disable: "mobile",
    });

    //Nice select option active
    const selectOption = $(".niceSelect select");
    if (selectOption.length > 0) {
      selectOption.niceSelect();
    }

    //Dropdown functions
    const dropdownParrent = $("li.dropdown-parrent");
    const dropdownChildren = $("li.dropdown-parrent > a, .menu-arrow");
    const menuArrow = $(".menu-arrow");

    dropdownChildren.on("click", function (e) {
      e.preventDefault();
      $(this).parent(dropdownParrent).toggleClass("active");
      menuArrow.toggleClass("active");
    });

    //Tooltip calling
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    //demo sidebar active
    const demosIcon = $("#demosIcon, .demos");
    const demoSidebar = $("#demo-sidebar");
    demosIcon.on("click", function (e) {
      e.preventDefault();
      demoSidebar.toggleClass("active-sidebar");
    });

    //mobile-wrap
    const mobile_nav_open = $(".mobile-nav-icon");
    const mobile_sidebar = $(".mobile-sidebar");
    const mobile_nav_close = $(".menu-close");
    const has_children = $(".has-children");

    mobile_nav_open.on("click", function () {
      mobile_sidebar.addClass("mobile-menu-active");
    });

    mobile_nav_close.on("click", function () {
      mobile_sidebar.removeClass("mobile-menu-active");
    });
  });


  //mobile-menus
  $(".mobile-nav a").each(function () {
    var href = $(this).attr("href");
    if ((href = "#")) {
      $(this).addClass("hash-nav");
      
    } else {
      $(this).removeClass("hash-nav");
    }
  });



  $.fn.menumarker = function (options) {
    (mobile_menu = $(this)),
      (settings = $.extend(
        {
          format: "dropdown",
          sticky: false,
        },
        options
      ));

    return this.each(function () {
      mobile_menu.find("li ul").parent().addClass("has-sub");
      var multiTg = function () {
        mobile_menu.find(".hash-nav").parent().addClass("hash-has-sub");
        mobile_menu
          .find(".has-sub")
          .prepend('<span class="submenu-button"><em></em></span>');
        mobile_menu.find(".submenu-button").on("click", function () {
          $(this).toggleClass("submenu-opened");
          if ($(this).siblings("ul").hasClass("open-sub")) {
            $(this).siblings("ul").removeClass("open-sub").hide("fadeIn");
            $(this).siblings("ul").hide("fadeIn");
          } else {
            $(this).siblings("ul").addClass("open-sub").hide("fadeIn");
            $(this).siblings("ul").slideToggle().show("fadeIn");
          }
        });
      };

      if (settings.format === "multitoggle") multiTg();
      else mobile_menu.addClass("dropdown");
      if (settings.sticky === true) mobile_menu.css("position", "fixed");
      var resizeFix = function () {
        if ($(window).width() > 991) {
          mobile_menu.find("ul").show("fadeIn");
          mobile_menu.find("ul.sub-menu").hide("fadeIn");
        }
      };
      resizeFix();
      return $(window).on("resize", resizeFix);
    });
  };



    $(document).ready(function () {
    $(".mobile-nav").menumarker({
      format: "multitoggle",
    });

    //Counter
    const ucounter = $(".up-counter");

    if (ucounter.length > 0) {
      ucounter.countUp();
    }





  });


  // $(window).on("load", function (event) {
  //   //Preloader active
  //   const preloader = $(".preloader");
  //   if (preloader.length) {
  //     preloader.delay(200).fadeOut(500);
  //   }
  // });

     //preloader
     $(window).on("load", function (event) {

      setTimeout(function() {
        $('#ctn-preloader').addClass('loaded');
        // Una vez haya terminado el preloader aparezca el scroll
        $('body').removeClass('no-scroll-y');
    
        if ($('#ctn-preloader').hasClass('loaded')) {
          // Es para que una vez que se haya ido el preloader se elimine toda la seccion preloader
          $('#preloader').delay(600).queue(function() {
            $(this).remove();
          });
        }
      },400);
  
      // $('.tlt').textillate();
  
    });
  

         //Video poppup
         if ($(".play-btn").length > 0) {
          $(".play-btn").magnificPopup({
            type: "iframe",
          });
        }

  
})(jQuery);

// Price filtering
(function () {
  var parent = document.querySelector("#rangeSlider");
  if (!parent) return;

  var rangeS = parent.querySelectorAll("input[type=range]"),
    numberS = parent.querySelectorAll("input[type=number]");

  rangeS.forEach(function (el) {
    el.oninput = function () {
      var slide1 = parseFloat(rangeS[0].value),
        slide2 = parseFloat(rangeS[1].value);

      if (slide1 > slide2) {
        [slide1, slide2] = [slide2, slide1];
      }

      numberS[0].value = slide1;
      numberS[1].value = slide2;
    };
  });

  numberS.forEach(function (el) {
    el.oninput = function () {
      var number1 = parseFloat(numberS[0].value),
        number2 = parseFloat(numberS[1].value);

      if (number1 > number2) {
        var tmp = number1;
        numberS[0].value = number2;
        numberS[1].value = tmp;
      }

      rangeS[0].value = number1;
      rangeS[1].value = number2;
    };
  });
})();


// Custom cursor: blue dot + trailing ring (mouse devices only)
(function () {
  if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  var dot = document.createElement('div');
  var ring = document.createElement('div');
  dot.className = 'ic-cursor-dot';
  ring.className = 'ic-cursor-ring';
  document.body.appendChild(ring);
  document.body.appendChild(dot);

  var mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, started = false;
  var hoverTargets = 'a, button, input, textarea, select, label, [role="button"], .nice-select, .hamburger_menu';
  var lastTarget = null;

  // Luminance (0-1) of an "rgb(...)"/"rgba(...)" string, or null if mostly transparent
  function luminance(color) {
    var m = color.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    var p = m[1].split(',').map(parseFloat);
    if (p.length > 3 && p[3] < 0.5) return null;
    return (0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]) / 255;
  }

  // Walk up from the hovered element to the first large enough element with a solid
  // background colour or gradient, and report whether that background is dark.
  // Elements smaller than the ring (icons, tiny badges) are skipped so the ring matches what surrounds them.
  // Add data-cursor="light" or data-cursor="dark" to any element to force it.
  function isDarkAt(el) {
    for (; el && el !== document.documentElement; el = el.parentElement) {
      var forced = el.getAttribute && el.getAttribute('data-cursor');
      if (forced) return forced === 'light';
      if (el.offsetWidth < 40 || el.offsetHeight < 40) continue;
      var style = getComputedStyle(el);
      var lum = luminance(style.backgroundColor);
      if (lum === null && style.backgroundImage.indexOf('gradient') !== -1) {
        var colors = style.backgroundImage.match(/rgba?\([^)]+\)/g) || [];
        var solid = colors.map(luminance).filter(function (l) { return l !== null; });
        if (solid.length) lum = solid.reduce(function (a, b) { return a + b; }, 0) / solid.length;
      }
      if (lum !== null) return lum < 0.45;
    }
    return false;
  }

  document.addEventListener('mousemove', function (e) {
    if (e.target !== lastTarget) {
      lastTarget = e.target;
      root.classList.toggle('ic-cursor-on-dark', isDarkAt(e.target));
    }
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!started) {
      ringX = mouseX;
      ringY = mouseY;
      started = true;
    }
    dot.style.transform = 'translate(' + mouseX + 'px, ' + mouseY + 'px) translate(-50%, -50%)';
    root.classList.add('ic-cursor-visible');
    root.classList.toggle('ic-cursor-hover', !!(e.target.closest && e.target.closest(hoverTargets)));
  });

  document.addEventListener('mouseleave', function () { root.classList.remove('ic-cursor-visible'); });
  document.addEventListener('mousedown', function () { root.classList.add('ic-cursor-down'); });
  document.addEventListener('mouseup', function () { root.classList.remove('ic-cursor-down'); });

  (function follow() {
    var ease = reduceMotion ? 1 : 0.18;
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;
    ring.style.transform = 'translate(' + ringX + 'px, ' + ringY + 'px) translate(-50%, -50%)';
    requestAnimationFrame(follow);
  })();
})();

// Highlight the current page in the main menu (service detail pages count as Services)
(function () {
  var page = location.pathname.split('/').pop() || 'index.html';
  var servicePages = ['business-strategy.html', 'company-setup.html', 'finance-advisory.html', 'hr.html', 'marketing.html', 'operations.html'];
  if (servicePages.indexOf(page) !== -1) page = 'service-1.html';
  var links = document.querySelectorAll('.main-menu .menu_list a');
  for (var i = 0; i < links.length; i++) {
    if (links[i].getAttribute('href') === page) links[i].classList.add('active');
  }
})();

// Language switcher: open/close the dropdown and remember the visitor's choice
(function () {
  var STORAGE_KEY = 'ic-lang';

  function save(code) {
    try { localStorage.setItem(STORAGE_KEY, code); } catch (e) { /* storage blocked: nothing to remember */ }
  }

  document.querySelectorAll('[data-ic-lang]').forEach(function (box) {
    var toggle = box.querySelector('.ic-lang-toggle');
    function setOpen(open) {
      box.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!box.classList.contains('open'));
    });
    document.addEventListener('click', function (e) {
      if (!box.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && box.classList.contains('open')) {
        setOpen(false);
        toggle.focus();
      }
    });
  });

  document.querySelectorAll('a[data-lang]').forEach(function (link) {
    link.addEventListener('click', function () { save(link.getAttribute('data-lang')); });
  });

  // A returning visitor who chose another language lands on the home page in that language
  // (only when arriving from outside the site, so clicking "English" or "Home" always works).
  var page = location.pathname.split('/').pop() || 'index.html';
  if (document.documentElement.lang === 'en' && page === 'index.html') {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    var fromThisSite = document.referrer && document.referrer.indexOf(location.origin) === 0 && location.origin !== 'null';
    var target = document.querySelector('a[data-lang="' + saved + '"]');
    if (saved && saved !== 'en' && target && !fromThisSite) location.replace(target.href);
  }
})();
