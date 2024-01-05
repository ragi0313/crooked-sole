import { heroSlideData, saleData, productSideBannerImages } from "./landingProductData.js";
import { fetchProductData } from "./shop.js";

$(function () {
  
  $('#searchField').on('keypress', function (event) {
    if (event.which === 13) { 
      event.preventDefault();

      const query = $('#searchField').val().trim();

      if (query !== "") {
        const shopUrl = `shop.html?search=${encodeURIComponent(query)}`;
        window.location.href = shopUrl;
      }
    }
  });
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
        ${heroSlideData.map(({ imgSrc, title, titleColor, textColor, text, buttonClass }) => `
          <div class="swiper-slide">
            <img src="${imgSrc}" alt="Product Banner" class="hero-img">
            ${title !== undefined ? `
              <div class="hero-content">
                <h2 class="hero-title" style="color: ${titleColor}">${title}</h2>
                <p class="hero-text" style="color: ${textColor}">${text}</p>
                <a href="shop.html" class="btn ${buttonClass}">
                  <span>Shop Now</span>
                  <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                </a>
              </div>
            ` : `
                <a href="shop.html" class="btn ${buttonClass}" style="position: absolute; bottom: 40px; left: 100px;">
                  <span>Shop Now</span>
                  <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                </a>
            `}
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
     loop: true,
     navigation: {
       nextEl: ".swiper-button-next",
       prevEl: ".swiper-button-prev",
     },
     pagination: {
       el: '.swiper-pagination',
       clickable: true,
     },
     autoplay: {
      delay: 2000,
    }
   })
 


   //product slider flash deals
   $('.sale-slider .glider-contain').html(
    saleData.map(({ discount, imageSrc, brand, title, currentPrice, beforePrice }) => `
      <div class="glider">
        <div class="sale-product-box">
          <span class="p-discount"><i class="ri-flashlight-fill"></i><br><b>${discount}%</b></span>
          <div class="sale-img-container">
            <div class="s-img">
              <a href="#">
                <img src="${imageSrc}" alt="">
              </a>
            </div>
          </div>
          <div class="sale-text-box">
            <div class="p-brand"><span>${brand}</span></div>
            <a href="#" class="p-title">${title}</a>
            <div class="p-price">
              <span class="current">${currentPrice} <span class="before">${beforePrice}</span></span>
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


   
   //sidebanner swiper
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
   
   function reloadSlider() {
     sideBannerSlider.css('left', -items[active].offsetLeft + 'px');
     $('.slider .dots li.active').removeClass('active');
     $('.slider .dots li').eq(active).addClass('active');
   }
   
   function updateActive(index) {
     active = index >= 0 ? index % items.length : items.length - 1;
     reloadSlider();
   }
   
   $('#next').on("click", function () {
     updateActive(active + 1);
   });
   
   $('#prev').on("click", function () {
     updateActive(active - 1);
   });
   
   $('.slider .dots li').each(function (key) {
     $(this).on('click', function () {
       updateActive(key);
     });
   });



   

  async function displayGridProducts() {
    const productData = await fetchProductData();
    var upperProduct = productData.slice(0, 8).map(({ id, img, title, newPrice, discount }) => (
      `
       <div class="product-swiper-slide">
         <div class="sale-product-box">
           <div class="sale-img-container">
             <div class="s-img">
               <a href="product-details.html?id=${id}">
                 <img src="${img}" alt="${title}">
               </a>
             </div>
           </div>
           <div class="sale-text-box">
             <a href="product-details.html?id=${id}" class="p-title">${title}</a>
             <div class="p-price">
               <span class="current">₱${parseInt(newPrice).toLocaleString()} ${discount !== '' ? `<span class="before">${discount}</span>` : ''}</span>
             </div>
           </div>
         </div>
       </div>
     `
   ));
  
   var lowerProduct = productData.slice(8, 16).map(({ id, img, title, newPrice, discount }) => (
      `
       <div class="product-swiper-slide">
         <div class="sale-product-box">
           <div class="sale-img-container">
             <div class="s-img">
               <a href="product-details.html?id=${id}">
                 <img src="${img}" alt="${title}">
               </a>
             </div>
           </div>
           <div class="sale-text-box">
             <a href="product-details.html?id=${id}" class="p-title">${title}</a>
             <div class="p-price">
               <span class="current">₱${parseInt(newPrice).toLocaleString()} ${discount !== '' ? `<span class="before">${discount}</span>` : ''}</span>
             </div>
           </div>
         </div>
       </div>
     `
   ));
  
   $(".swiper-containe1 .swiper-wrapper").html(upperProduct.join(''));
   $(".swiper-containe2 .swiper-wrapper").html(lowerProduct.join(''));
  }

  displayGridProducts();

  
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

  $('.sale-product-box').on('click', function(e) {
     e.preventDefault;

     const productId = $(this).attr("href").split("=")[1];
     window.location.href = `product-details.html?id=${productId}`;
  });


  $('#minus, #plus').on('click', function(e) {
    e.preventDefault();
    var value = parseInt($('.quantity-item').val(), 10);
    value += ($(this).attr('id') === 'minus') ? -1 : 1;
    $('.quantity-item').val(Math.max(value, 1));
  });
 