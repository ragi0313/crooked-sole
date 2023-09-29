$(function () {
   function toggleBackToTop() {
      $(window).width() < 1024 ? $(".back-top").addClass("active") : $(".back-top").removeClass("active");
   };

   //nav
   const mobileMenuClose = function () {
     $(".mobile-navigation-menu").removeClass("active");
     $(".overlay").removeClass("active");
   }
 
   $(".action-btn").each(function () {
     $(this).on("click", function () {
       $(".mobile-navigation-menu").addClass("active");
       $(".overlay").addClass("active");
     });
     $(".menu-close-btn").on("click", mobileMenuClose);
     $(".overlay").on("click", mobileMenuClose);
   });
 
   //categories
   $(".accordion-menu").each(function () {
     $(this).on("click", function () {
       var clickedBtn = $(this).next().hasClass("active");
       $(".submenu-category-list").each(function () {
         if (clickedBtn) return false;
 
         if ($(this).hasClass("active")) {
           $(this).removeClass("active");
           $(".accordion-menu").removeClass("active");
         }
       });
       $(this).next().toggleClass('active');
       $(this).toggleClass('active');
     });
   });
 
   //hero slider
   new Swiper(".swiper-container", {
     loop: false,
     navigation: {
       nextEl: ".swiper-button-next",
       prevEl: ".swiper-button-prev",
     },
     pagination: {
       el: '.swiper-pagination',
       clickable: true,
     },
   })
 
   $("#nextBtn").on("click", function () {
     var nextScroll = $(".glider-contain").scrollLeft() + 250;
     $(".glider-contain").animate({ scrollLeft: nextScroll }, 400);
   });
 
   $("#prevBtn").on("click", function () {
     var prevScroll = $(".glider-contain").scrollLeft() - 250;
     $(".glider-contain").animate({ scrollLeft: prevScroll }, 400);
   });
 
   var imageArray = ["new-arrivals-1.jpg", "new-arrivals-2.jpg"];
   var currentIndex = 0;
 
   function swapImage() {
     if (currentIndex < imageArray.length) {
       $(".arrival-image-swap").attr("src", "./assets/img/" + imageArray[currentIndex]);
       currentIndex++;
     } else currentIndex = 0;
   }
 
   setInterval(swapImage, 900);
 
   //product swiper
   var sideBannerSlider = $('.slider .list');
   var items = $('.slider .list .item');
 
   var active = 0;
 
   $('#next').on("click", function () {
     active = active + 1 <= items.length - 1 ? active + 1 : 0;
     reloadSlider();
   });
 
   $('#prev').on("click", function () {
     active = active - 1 >= 0 ? active - 1 : items.length - 1;
     reloadSlider();
   });
 
   function reloadSlider() {
     sideBannerSlider.css('left', -items[active].offsetLeft + 'px');
     $('.slider .dots li.active').removeClass('active');
     $('.slider .dots li').eq(active).addClass('active');
   };
 
   $('.slider .dots li').each(function (key) {
     $(this).on('click', function () {
       active = key;
       reloadSlider();
     });
   });
 
   $(window).on('resize', function () {
     reloadSlider();
     toggleBackToTop();
   });
 
   var topProduct = $(".swiper-containe1");
   var botProduct = $(".swiper-containe2");
 
   $(".products .swiper-button-prev").on("click", function () {
     var scrollAmount = topProduct.scrollLeft() - 250;
     topProduct.animate({ scrollLeft: scrollAmount }, 400);
     botProduct.animate({ scrollLeft: scrollAmount }, 400);
   });
 
   $(".products .swiper-button-next").on("click", function () {
     var scrollAmount = topProduct.scrollLeft() + 250;
     topProduct.animate({ scrollLeft: scrollAmount }, 400);
     botProduct.animate({ scrollLeft: scrollAmount }, 400);
   });
 
   topProduct.scroll(function () {
     botProduct.scrollLeft(topProduct.scrollLeft());
   });
 
   botProduct.scroll(function () {
     topProduct.scrollLeft(botProduct.scrollLeft());
   });


 });
 