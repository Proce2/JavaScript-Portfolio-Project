 /* Content-spinner */

 var width = $(window).width();

 window.onscroll = function() {
     if ((width >= 900)) {
         if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
             $("#middle").css("background-size", "140% auto");
         } else {
             $("#middle").css("background-size", "100% auto");
         }
     }
 };

 setTimeout(function() {
     $("#loading").addClass("animated fadeOut");
     setTimeout(function() {
         $("#loading").removeClass("animated fadeOut");
         $("#loading").css("display", "none");
     }, 800);
 }, 1450);

 /* end Content-spinner */

 /* Nav Bar */

 (function() {

     var model = {
         skillCounter: 0,
         navToggled: false,
     }

     var app = {

         init: function() {
             this.cacheDOM();
             this.bindEvents();
             this.toggleScroll();

         },

         cacheDOM: function() {
             this.$toggleNav = $('.toggle-nav');
         },

         bindEvents: function() {
             $(window).scroll(this.toggleScroll);
             $('a[href*="#"]').not('[href="#"]').not('[href="#"]').click(this.smoothScroll);
         },

         toggleScroll: function() {
             if ($(document).scrollTop() > 0) {
                 $('nav').addClass('nav-scroll');
             } else {
                 $('nav').removeClass('nav-scroll');
             }
         },

         smoothScroll: function(e) {
             e.preventDefault();
             (model.navToggled) ? app.toggleNav(): '';
             $('html, body').animate({
                 scrollTop: $(this.hash).offset().top
             }, 200);
         },
     }

     app.init()

 })();

 /* end Nav Bar */