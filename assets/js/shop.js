import { productData } from "./shopProductData.js";


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

$(window).scroll(function() {
    var scrollPosition = $(window).scrollTop();
    var threshold = 95;
    var footerPosition = $('.footer').offset().top - $(window).height(); // Calculate the position of the footer

    var sidebar = $('.sidebar');

    if (scrollPosition >= threshold && scrollPosition < footerPosition) {
        sidebar.css({'position': 'fixed', 'top': '0'});
    } else if (scrollPosition >= footerPosition) {
        sidebar.css({'position': 'absolute', 'top': '100px'});
    } else {
        sidebar.css({'position': 'fixed', 'top': '100px'});
    }
});

let selectedCategory = null;
let selectedPrice = null;
let selectedColor = null;
let selectedBrand = null;
let query = "";

const handleInputChange = function (event) {
  query = event.target.value;
  updateFilteredData();
};

const handlePriceChange = function (event) {
  selectedPrice = event.target.value;
  updateFilteredData();
};

const handleChange = function (event) {
  selectedCategory = event.target.value;
  updateFilteredData();
};

function updateFilteredData() {
  let filteredItems = productData.filter(function (product) {
    return product.title.toLowerCase().includes(query.toLowerCase());
  });

  if(selectedBrand && selectedBrand.toLowerCase() !== 'all') {
    filteredItems = filteredItems.filter(function({ company }) {
      return company.toLowerCase() === selectedBrand.toLowerCase();
    });
  }

  if (selectedCategory && selectedCategory.toLowerCase() !== 'all') {
    filteredItems = filteredItems.filter(function ({ category }) {
      return category.includes(selectedCategory.toLowerCase());
    });
  }

  if (selectedColor && selectedColor.toLowerCase() !== 'all') {
    filteredItems = filteredItems.filter(function ({ color }) {
      return color.includes(selectedColor.toLowerCase());
    });
  }

  if (selectedPrice && selectedPrice.toLowerCase() !== 'all') {
    filteredItems = filteredItems.filter(function ({ newPrice }) {
      const price = parseInt(newPrice.replace("₱", "").replace(",", ""));
      return (
        (selectedPrice === "0" && price <= 5000) ||
        (selectedPrice === "5000" && price > 5000 && price <= 10000) ||
        (selectedPrice === "10000" && price > 10000 && price <= 15000) ||
        (selectedPrice === "15000" && price > 15000)
      );
    });
  }

  const resultHtml =
    filteredItems.length > 0
      ? filteredItems
          .map(function ({ img, title, reviews, discount, newPrice, star }) {
            return `
              <div class="product-box">
                <div class="product-img-container">
                  <div class="product-img">
                    <a href="#">
                      <img src="${img}" alt="${title}">
                    </a>
                  </div>
                </div>
                <div class="product-text-box">
                  <a href="#" class="product-title">${title}</a>
                  <div class="product-reviews">
                    ${star}
                    <span>${reviews}+</span>
                  </div>
                  <div class="product-price">
                    <span class="current">${newPrice} ${discount !== "" ? `<span class="before">${discount}</span>` : ""}</span>
                    <a href="#" class="product-cart-btn"><i class="ri-shopping-cart-2-line"></i></a>
                  </div>
                </div>
              </div>
            `;
          })
          .join("")
      : '<h1 style="font-weight: 500; padding-bottom: 500px;">No Results Found</h1>';

  $(".product-container").html(resultHtml);
}

// Attach event handlers
$('input[name="search"]').on('input', handleInputChange);
$('input[name="category"]').on('change', function (event) {
  selectedCategory = event.target.value;
  updateFilteredData();
});
$('input[name="color"]').on('change', function (event) {
  selectedColor = event.target.value;
  updateFilteredData();
});
$('input[name="price"]').on('change', handlePriceChange);

$('.r-btns').on('click', function() {
  const brandName = $(this).val();
  selectedBrand = brandName === 'all' ? null : brandName;
  $('.r-btns').removeClass('active');
  $(this).addClass('active');
  updateFilteredData();
});

// Initial data rendering
updateFilteredData();
