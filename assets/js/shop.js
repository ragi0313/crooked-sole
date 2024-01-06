const mobileMenuClose = function () {
  $(".mobile-sidebar").removeClass("active");
  $(".overlay").removeClass("active");
}

$(".action-btn").each(function () {
  $(this).on("click", function () {
    $(".mobile-sidebar").addClass("active");
    $(".overlay").addClass("active");
  });
  $(".sidebar-close").on("click", mobileMenuClose);
  $(".overlay").on("click", mobileMenuClose);
});

$(window).scroll(function () {
  var scrollPosition = $(window).scrollTop();
  var threshold = 110;
  var footerPosition = $('.footer').offset().top - $(window).height();

  var sidebar = $('.sidebar');

  if (scrollPosition >= threshold && scrollPosition < footerPosition) {
    sidebar.css({ 'position': 'fixed', 'top': '0' });
  } else if (scrollPosition >= footerPosition) {
    sidebar.css({ 'position': 'absolute', 'top': '100px' });
  } else {
    sidebar.css({ 'position': 'fixed', 'top': '100px' });
  }
});

const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  function updateCartCount() {
    const cartCount = cartItems.length;
    $('.cart-btn .count').text(cartCount);
  }

updateCartCount();

export async function fetchProductData() {
  try {
    const response = await fetch("../shopProductData.json"); 
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching product data:", error);
    return [];
  }
}

let query = "";
let selectedPrice = null;

const urlParams = new URLSearchParams(window.location.search);
const queryFromUrl = urlParams.get('search');

if (queryFromUrl) {
  query = decodeURIComponent(queryFromUrl);
  updateFilteredData();
}


const handlePriceChange = function (event) {
  selectedPrice = event.target.value;
  updateFilteredData();
};

function parsePrice(price) {
  return price || 0; 
}

function checkPriceFilter(price) {
  const numericPrice = parsePrice(price);
  return (
    (selectedPrice === "all") ||
    (selectedPrice === "0" && numericPrice <= 5000) ||
    (selectedPrice === "5000" && numericPrice > 5000 && numericPrice <= 10000) ||
    (selectedPrice === "10000" && numericPrice > 10000 && numericPrice <= 15000) ||
    (selectedPrice === "15000" && numericPrice > 15000)
  );
}

export async function updateFilteredData() {
  const productData = await fetchProductData();

  let filteredItems = productData.filter(function ({ title, category, color, company, newPrice }) {
    const titleMatches = title.toLowerCase().includes(query.toLowerCase());
    const categoryMatches = !selectedCategory || selectedCategory.toLowerCase() === 'all' || (
      Array.isArray(category) ? category.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase()) : 
      category.toLowerCase() === selectedCategory.toLowerCase()
    );
    const colorMatches = !selectedColor || selectedColor.toLowerCase() === 'all' || (
      Array.isArray(color) ? color.includes(selectedColor.toLowerCase()) : color.toLowerCase() === selectedColor.toLowerCase()
    );

    const brandMatches = !selectedBrand || selectedBrand.toLowerCase() === 'all' || company.toLowerCase()  === selectedBrand.toLowerCase();
    const priceMatches = !selectedPrice || selectedPrice.toLowerCase() === 'all' || checkPriceFilter(parsePrice(newPrice))

    return titleMatches && categoryMatches && colorMatches && brandMatches && priceMatches;
  });

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  filteredItems = shuffleArray(filteredItems);
  const resultHtml =
    filteredItems.length > 0
      ? filteredItems
        .map(function ({ id, img, title, reviews, discount, newPrice, star }) {
          const starIcons = Array.from({ length: Math.floor(star) }, () => '<i class="ri-star-fill"></i>').join(' ') +
            (star % 1 !== 0 ? '<i class="ri-star-half-fill"></i>' : '') +
            Array.from({ length: Math.floor(5 - star) }, () => '<i class="ri-star-line"></i>').join(' ');
          return `
              <div class="product-box">
              <a href="product-details.html?id=${id}">
                <div class="product-img-container">
                  <div class="product-img">
                    <img src="${img}" alt="${title}">
                  </div>
                </div>
                <div class="product-text-box">
                  <span href="#" class="product-title">${title}</span>
                  <div class="product-reviews">
                    ${starIcons}
                    <span>(${reviews}+)</span>
                  </div>
                  <div class="product-price">
                    <span class="current">₱${parseInt(newPrice).toLocaleString()} ${discount !== "" ? `<span class="before">${discount}</span>` : ""}</span>
                    <div class="product-heart-btn"><i class="ri-heart-line"></i></div>
                  </div>
                </div>
               </a>
              </div>
            `;
        })
        .join("")
      : `<h1 style="font-weight: 500; padding-bottom: 500px; padding-left: 20px; white-space: nowrap;">No Results Found</h1>`;

  $(".product-container").html(resultHtml);
}


let selectedCategory = null;
let selectedColor = null;
let selectedBrand = null;

$('input[name="search"]').on('keypress', function(event) {
   if(event.which === 13) {
      query = $(this).val().trim();
      if (query !== "") {
        const shopUrl = `shop.html?search=${encodeURIComponent(query)}`;
        window.location.href = shopUrl;
      }
      updateFilteredData();
   }
});

$('input[name="category"]').on('change', function (event) {
  selectedCategory = event.target.value;
  updateFilteredData();
});

$('input[name="color"]').on('change', function (event) {
  selectedColor = event.target.value;
  updateFilteredData();
});

$('input[name="price"]').on('change', handlePriceChange);

$('.r-btns').on('click', function () {
  const brandName = $(this).val();
  selectedBrand = brandName === 'all' ? null : brandName;
  $('.r-btns').removeClass('active');
  $(this).addClass('active');
  updateFilteredData();
});

$(".product-box").on("click", function (e) {
  e.preventDefault();

  const productId = $(this).attr("href").split("=")[1];

  window.location.href = `product-details.html?id=${productId}`;
});

updateFilteredData();
