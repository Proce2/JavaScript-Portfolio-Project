 
 var width = $(window).width();

 window.onscroll = function() {
         if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
             $("#middle").css("background-size", "130% 140%")
         } else {
             $("#middle").css("background-size", "100% 100%");
         }
       };

       /* Content-spinner */
 setTimeout(function() {
     $("#loading").addClass("animated fadeOut");
     setTimeout(function() {
         $("#loading").removeClass("animated fadeOut");
         $("#loading").css("display", "none");
     }, 800);
 }, 1450);

 

 /* Nav Bar, smoothScroll, image*/

 (function() {

     var app = {

         init: function() {
             this.cacheDOM();
             this.bindEvents();
            
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
             $('html, body').animate({
                 scrollTop: $(this.hash).offset().top
             }, 200);
         },
     }

     app.init()

 })();

 