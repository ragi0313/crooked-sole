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


  $(document).on('click', '#minus, #plus', function (e) {
    e.preventDefault();

    const cartCard = $(this).closest('.cart-card');
    const quantityInput = cartCard.find('.quantity-item');

    var value = parseInt(quantityInput.val(), 10);

    value += ($(this).attr('id') === 'minus') ? -1 : 1;

    value = Math.max(value, 1);

    quantityInput.val(value);

    const cartItemId = cartCard.index();
    cartItems[cartItemId].quantity = value;

    updateOrderSummary();
});
  
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
  function generateCartCards(cartItems) {
    const cartList = $('.cart-list');
    cartList.empty();

    if(cartItems.length === 0) {
        const emptyMessage = $('<div>').addClass('cart-empty-message');
        emptyMessage.html(`
          <div class="cart-empty-elements">
            <img src="assets/img/empty-cart.png">
            <span>Your cart is empty</span>
            <a href="shop.html"><button class="btn">Shop Now</button></a>
          </div>
        `)
        $('.cart .container').append(emptyMessage);
        $('.cart-wrapper').css('display', 'none');
    } else {
  
    cartItems.forEach(item => {
      const cartCard = $('<div>').addClass('cart-card');
      cartCard.html(`
        <div class="img-description">
            <input type="checkbox" name="">
            <img src="${item.image}" alt="" width="200" height="130">
          <div class="img-description-info">
            <div class="img-description-text">
              <p class="cart-product-name">${item.name}</p>
              <span class="selected-size">Size ${item.size}</span>
            </div>
            <div class="cart-price">
              <div class="price">
                <span class="current">₱${(item.newPrice * item.quantity).toLocaleString()}</span>
                ${item.oldPrice !== null ? `<span class="before">₱${(item.oldPrice * item.quantity).toLocaleString()}</span>` : ""}
              </div>
            </div>
            <div class="mobile-add-delete-cart">
              <div class="quantity">
                  <a href="#" class="quantity-decrease" id="minus"><span>-</span></a>
                  <input name="quantity" type="text" class="quantity-item" value="${item.quantity}">
                  <a href="#" class="quantity-add" id="plus"><span>+</span></a>
              </div>
              <div class="wishlist-delete">
                  <i class="ri-heart-line"></i>
                  <i class="ri-delete-bin-line" id="removeFromCart"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="add-delete-cart">
          <div class="quantity">
            <a href="#" class="quantity-decrease" id="minus"><span>-</span></a>
            <input name="quantity" type="text" class="quantity-item" value="${item.quantity}">
            <a href="#" class="quantity-add" id="plus"><span>+</span></a>
          </div>
          <div class="wishlist-delete">
            <i class="ri-heart-line"></i>
            <i class="ri-delete-bin-line" id="removeFromCart"></i>
          </div>
        </div>
      `);
      cartList.append(cartCard);
    });
  }
  updateOrderSummary();
}

function updateOrderSummary() {
    const totalOrderPrice = calculateTotalOrderPrice();
    $('.total-price').text(`₱${totalOrderPrice.toLocaleString()}`);
}

function calculateTotalOrderPrice() {
    let total = 0;
    cartItems.forEach(item => {
        total += item.newPrice * item.quantity;
    });
    return total;
}
  
  generateCartCards(cartItems);

  $(document).on('click', '#removeFromCart', function() {
    const cartCard = $(this).closest('.cart-card');
    const cartItemId = cartCard.index();
  
  
    cartItems.splice(cartItemId, 1);
  
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
    cartCard.remove();

    updateOrderSummary();

    updateCartCount();
});


  
  