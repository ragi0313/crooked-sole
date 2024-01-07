$(document).ready(function(){
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

    if ( $('.float-label') ) {
      $('.floating-label').each(function() {
        var $this = $(this);
  
        $(this).on('focus', 'input', function(){
          $this.find('label').addClass('float');
        });
  
        $(this).on('blur', 'input', function() {
          if ( !$(this).val() ) {
            $this.find('label').removeClass('float');
          }
        });
      });
    }

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function updateOrderDetails(selectedItems) {
        const orderSummaryCardsContainer = $('.order-card-container');
      
        orderSummaryCardsContainer.empty();
    
        selectedItems.forEach(item => {
          const orderCard = $('<div>').addClass('order-card');
          orderCard.html(`
            <div class="order-img">
              <img src="${item.image}" alt="" width="100" height="120">
              <span class="order-quantity">x${item.quantity}</span>
            </div>
            <div class="order-card-details">
              <p class="order-title">${item.name}</p>
              <span class="order-size">Size: ${item.size}</span>
              <span class="order-price">₱${(item.newPrice * item.quantity)}</span>
            </div>
          `);
          orderSummaryCardsContainer.append(orderCard);
        });
      }

      function updateOrderSummary() {
        const totalOrderPrice = calculateTotalOrderPrice();
        const shippingFee = totalOrderPrice > 5000 ? 68 : 0;
        const totalPriceWithShipping = totalOrderPrice + shippingFee;

        $('#totalPriceSummary').text(`₱${totalPriceWithShipping.toLocaleString()}`);
        $('#shippingFee').text(totalOrderPrice > 5000 ? `₱${shippingFee.toLocaleString()}` : 'Free Shipping');
      }
    
      function calculateTotalOrderPrice() {
        let total = 0;
        const checkedItems = JSON.parse(localStorage.getItem('checkedItems')) || [];
    
        checkedItems.forEach(item => {
          total += item.newPrice * item.quantity;
        });
    
        return total;
      }
       
      const checkedItems = JSON.parse(localStorage.getItem('checkedItems')) || [];
      updateOrderDetails(checkedItems);
      
      updateOrderSummary();

      function removeItemByIdAndSize(id, size) {
        const cartItemIndex = cartItems.findIndex(item => item.id === id && item.size === size);
        if (cartItemIndex !== -1) {
          cartItems.splice(cartItemIndex, 1);
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
      }

      function validateForm() {
        let isValid = true;
      
        $('.shipping-info [required]').each(function() {
          let value = $(this).val();
      
          if (!value) {
            isValid = false;
            return false;
          }
        });
      
        let phoneNumber = $('#phoneNumber').val();
        phoneNumber = phoneNumber.replace(/\D/g, '');
      
        if (phoneNumber.length !== 10) {
          alert('Phone number should be a number and should consist of 10 digits')
          isValid = false;
        }
        var zipCode = $('#zipCode').val();
        zipCode = zipCode.replace(/\D/g, '');
      
      
        if (zipCode.length === 0) {
          alert('Invalid zip code')
          isValid = false;
        }
      
        if (isValid) {
          $('.success-modal').addClass('toggle');
      
           checkedItems.forEach(checkedItem => {
            removeItemByIdAndSize(checkedItem.id, checkedItem.size);
          });
      
          localStorage.removeItem('checkedItems');

        } else {
          alert("Please fill in all required fields correctly.");
        }
      }

      $('#placeOrder').on('click', function() {
        validateForm();
      });
});