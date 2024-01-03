



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

 async function fetchProductDetails(productId) {
   const response = await fetch('../shopProductData.json');
   const data = await response.json();


   const product = data.find(product => product.id === productId);

   return product;
}

 
 async function displayProductDetails() {
   const queryString = window.location.search;
   const urlParams = new URLSearchParams(queryString);
   const productId = parseInt(urlParams.get("id"));
 
   try {
   
     const product = await fetchProductDetails(productId);

     if (!product) {
   
       const notFoundMessage = '<img src="assets/img/nproduct.png" alt="error" style="margin-left: 50px">';
       $('.holder').html(notFoundMessage);
       return;
   }
 
    
     const { detailImg, title, company, star, reviews, discount, oldPrice, newPrice, description, color } = product;

     const mobileProductDetails = `
     <div class="mobile-title">
      <h2>${title}</h2>
        <p class="brand">${company}</p>
            
        <div class="price-info">
          <span class="current">₱${parseInt(newPrice).toLocaleString()}</span>
          <span class="before">₱${parseInt(oldPrice).toLocaleString()}</span>
          ${discount !== "" ? `<span class="discount">${discount}</span>` : ""}
        </div>
      </div>
    <div class="side-product-mobile">
      ${detailImg.map(url => `<img src="${url}" alt="${title}">`).join('')}
    </div>
     `;

     const productCard = `
      
         <div class="product-images">
           <div class="side-product">
            ${detailImg.map(url => `<img src="${url}" alt="${title}" class="side-img-prev">`).join('')}
           </div>
           <div class="product-preview" id="showImg">
            <img src="${detailImg[0]}" alt="" class="product-preview-img">
             <div class="preview-buttons">
               <button id="back"><</button>
               <button id="next">></button>
             </div>
           </div>
         </div>
         <div class="product-contents">
           <div class="desktop-title">
             <h2>${title}</h2>
               <p class="brand">${company}</p>
               <div class="price-info">
                 <span class="current">₱${parseInt(newPrice).toLocaleString()}</span>
                 ${oldPrice !== null ? `<span class="before">₱${parseInt(oldPrice).toLocaleString()}</span>` : ""}
                 ${discount !== "" ? `<span class="discount">${discount}</span>` : ""}
               </div>
             </div>
           <div class="sizes">
             <div class="sizes-heading">
               <span>Select Size</span>
               <span><a href="">Size Guide</a></span>
             </div>
             <fieldset>
               <label><input type="radio" name="sizes">US 7<div class="selected"></div></label>
               <label><input type="radio" name="sizes" disabled>US 7.5<div class="selected"></div></label>
               <label><input type="radio" name="sizes">US 8<div class="selected"></div></label>
               <label><input type="radio" name="sizes">US 8.5<div class="selected"></div></label>
               <label><input type="radio" name="sizes">US 9<div class="selected"></div></label>
               <label><input type="radio" name="sizes">US 9.5<div class="selected"></div></label>
               <label><input type="radio" name="sizes">US 10<div class="selected"></div></label>
               <label><input type="radio" name="sizes">US 10.5<div class="selected"></div></label>
               <label><input type="radio" name="sizes">US 11<div class="selected"></div></label>
               <label><input type="radio" name="sizes">US 11.5<div class="selected"></div></label>
               <label><input type="radio" name="sizes">US 12<div class="selected"></div></label>
               <label><input type="radio" name="sizes">US 13<div class="selected"></div></label>
             </fieldset>
           </div>
           <button type="button" class="bag-btn">Add to Bag</button>
           <button type="button" class="fav-btn">Favourite <i class="far fa-heart"></i></button>
           <div class="product-description">
             <p>
              ${description}
             </p>
             <ul>
             <li>
              Color Shown: ${Array.isArray(color) ? color.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(', ') : color.charAt(0). toUpperCase() + color.slice(1)}
             </li>
             </ul>
             <span class="modal">View Product Details</span>
             <div class="product-dropdown" >
               <h3 class="shipping-reviews-text">Free Shipping and Returns <span class="arrow"></span></h3>
               <div class="product-dropdown-items">
                 <span>Orders over ₱5000 gets free shipping.</span><br><br>
                 <p>FREE RETURNS are available if:</p>
                 <ul>
                   <li>Items are received within 15 days from the delivered date.</li>
                   <li>Items received unused, undamaged and in the original package.</li>
                 </ul>
               </div>
             </div>
             <div class="product-dropdown">
               <h3 class="shipping-reviews-text">Reviews(${reviews}) 
                 <i class="ri-star-line"></i>
                 <i class="ri-star-line"></i>
                 <i class="ri-star-line"></i>
                 <i class="ri-star-line"></i>
                 <i class="ri-star-line"></i>
                 <span class="arrow"></span>
               </h3>
               <div class="product-dropdown-items">
                 <span>Orders over ₱5000 gets free shipping.</span>
                 <div class="">
                   <ul>
                     <li>Black</li>
                     <li>Bald</li>
                     <li>A Bitch</li>
                   </ul>  
                 </div>
               </div>
             </div>
           </div>
         </div>
    
    
  
     `;
      $('.product-details-mobile').html(mobileProductDetails);
      $('.holder').html(productCard);
   
     
   } catch (error) {
     console.error("Error fetching or populating product details:", error.message);
   }
 }


displayProductDetails();

var currentIndex = 0;
var images = $('.side-img-prev');
var totalImages = images.length;

$(document).on('mouseenter', '.side-img-prev', function () {
  $('#showImg img').attr('src', $(this).attr('src'));
});

// $(document).on('click', '#back, #next', function () {
//   currentIndex = (currentIndex + (this.id === 'back' ? -1 : 1) + totalImages) % totalImages;
//   $('#showImg img').attr('src', images.eq(currentIndex).attr('src'));
//   console.log('Clicked on navigation button. Current Index:', currentIndex);
// });

$(document).on('click', '.product-dropdown', function () {
  $(this).toggleClass('active');
});