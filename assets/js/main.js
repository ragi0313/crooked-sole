import { heroSlideData, saleData, productSideBannerImages, gridProducts } from "./landingProductData.js";


$(function () {
  
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

 
  //hero
  $('.hero').html(`
    <div class="container">
      <div class="swiper-container">
         <div class="swiper-wrapper">
           ${heroSlideData.map((item) => `
             <div class="swiper-slide">
               <img src="${item.imgSrc}" alt="Product Banner" class="hero-img">
               ${item.title ? `
                 <div class="hero-content">
                   <h2 class="hero-title" style="color: ${item.titleColor}">${item.title}</h2>
                   <p class="hero-text" style="color: ${item.textColor}">${item.text}</p>
                   <a href="shop.html" class="btn ${item.buttonClass || ''}">
                     <span>Shop Now</span>
                     <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                   </a>
                 </div>
               ` : ''}
             </div>
           `).join('')}
         </div>
         <div class="swiper-pagination"></div>
         <div class="swiper-button-next"></div>
         <div class="swiper-button-prev"></div>
      </div>
    </div>
  `);
  
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
 


   //product slider flash deals
   $('.sale-slider .glider-contain').html(
    saleData.map(product => `
      <div class="glider">
        <div class="sale-product-box">
          <span class="p-discount"><i class="ri-flashlight-fill"></i><br><b>${product.discount}%</b></span>
          <div class="sale-img-container">
            <div class="s-img">
              <a href="#">
                <img src="${product.imageSrc}" alt="">
              </a>
            </div>
          </div>
          <div class="sale-text-box">
            <div class="p-brand"><span>${product.brand}</span></div>
            <a href="#" class="p-title">${product.title}</a>
            <div class="p-price">
              <span class="current">${product.currentPrice} <span class="before">${product.beforePrice}</span></span>
              <a href="#" class="p-cart-btn"><i class="ri-shopping-cart-2-line"></i></a>
            </div>
          </div>
        </div>
      </div>
    `).join('')
   );
  
   $("#nextBtn").on("click", function () {
     var nextScroll = $(".glider-contain").scrollLeft() + 250;
     $(".glider-contain").animate({ scrollLeft: nextScroll }, 400);
   });
 
   $("#prevBtn").on("click", function () {
     var prevScroll = $(".glider-contain").scrollLeft() - 250;
     $(".glider-contain").animate({ scrollLeft: prevScroll }, 400);
   });


 
   //image swap new arrivals
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
    const itemsHTML = productSideBannerImages.map(imageSrc => `
     <div class="item">
       <img src="${imageSrc}" alt="">
     </div>
   `).join('');
    
   const dotsHTML = productSideBannerImages.map((index) => `
     <li${index === 0 ? ' class="active"' : ''}></li>
   `).join('');
    
   $('.slider').html(`
     <div class="list">
       ${itemsHTML}
     </div>
     <div class="buttons">
       <button id="prev"><</button>
       <button id="next">></button>
     </div>
     <ul class="dots">
       ${dotsHTML}
     </ul>
   `);
   
   var sideBannerSlider = $('.slider .list');
   var items = $('.slider .list .item');
 
   var active = 0;


   //grid products
   var upperProduct = gridProducts.slice(0, 8).map((product) => (
     `
      <div class="product-swiper-slide">
        <div class="sale-product-box">
          <div class="sale-img-container">
            <div class="s-img">
              <a href="#">
                <img src="${product.imageSrc}" alt="${product.title}">
              </a>
            </div>
          </div>
          <div class="sale-text-box">
            <a href="#" class="p-title">${product.title}</a>
            <div class="p-price">
              <span class="current">${product.currentPrice} ${product.discount !== '' ? `<span class="before">${product.discount}</span>` : ''}</span>
            </div>
          </div>
        </div>
      </div>
    `
  ));

  var lowerProduct = gridProducts.slice(8).map((product) => (
     `
      <div class="product-swiper-slide">
        <div class="sale-product-box">
          <div class="sale-img-container">
            <div class="s-img">
              <a href="#">
                <img src="${product.imageSrc}" alt="${product.title}">
              </a>
            </div>
          </div>
          <div class="sale-text-box">
            <a href="#" class="p-title">${product.title}</a>
            <div class="p-price">
              <span class="current">${product.currentPrice} ${product.discount !== '' ? `<span class="before">${product.discount}</span>` : ''}</span>
            </div>
          </div>
        </div>
      </div>
    `
  ));

  $(".swiper-containe1 .swiper-wrapper").html(upperProduct.join(''));
  $(".swiper-containe2 .swiper-wrapper").html(lowerProduct.join(''));

  //move products function
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
 