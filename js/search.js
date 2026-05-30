// Product data for search
var products = [
    {
        keyword: "pure",
        name: "Pure Coconut Water",
        size: "500mL / 12 can",
        price: 37,
        image: "../images/flavour-1.png",
        link: "product_1.html"
    },
    {
        keyword: "mango",
        name: "Coconut Water with Mango",
        size: "500mL / 12 can",
        price: 37,
        image: "../images/flavour-2.png",
        link: "product_3.html"
    },
    {
        keyword: "lychee",
        name: "Coconut Water with Lychee",
        size: "500mL / 12 can",
        price: 37,
        image: "../images/flavour-9.png",
        link: ""
    },
    {
        keyword: "chocolate",
        name: "Coconut Water with Chocolate",
        size: "1000mL / 6 case",
        price: 25,
        image: "../images/flavour-5.png",
        link: ""
    }
];

var searchInput = document.querySelector(".search-input");
var dropdown = document.getElementById("search-dropdown");
var resultBox = document.getElementById("search-result");

// Show dropdown when clicking the search input
searchInput.addEventListener("focus", function () {
    dropdown.classList.add("show");
});

// Hide dropdown when clicking outside
document.addEventListener("click", function (event) {
    var isInput = searchInput.contains(event.target);
    var isDropdown = dropdown.contains(event.target);

    if (!isInput && !isDropdown) {
        dropdown.classList.remove("show");
    }
});

// Click a tag to show the result
var tags = document.querySelectorAll(".dropdown-tag");

tags.forEach(function (tag) {
    tag.addEventListener("click", function () {
        var keyword = tag.getAttribute("data-keyword");

        // Fill the search input with the keyword
        searchInput.value = tag.textContent;

        // Hide dropdown
        dropdown.classList.remove("show");

        // Find the matching product
        var product = null;
        for (var i = 0; i < products.length; i++) {
            if (products[i].keyword === keyword) {
                product = products[i];
                break;
            }
        }

        // Build the result card
        if (product) {
            var cardTag = "div";
            var linkAttr = "";
            if (product.link !== "") {
                cardTag = "a";
                linkAttr = ' href="' + product.link + '"';
            }

            resultBox.innerHTML =
                '<div class="search-card">' +
                    '<' + cardTag + ' class="product-card"' + linkAttr + '>' +
                        '<div class="product-img-wrapper">' +
                            '<img src="' + product.image + '" alt="' + product.name + '">' +
                        '</div>' +
                        '<div class="product-info">' +
                            '<h3 class="product-name">' + product.name + '</h3>' +
                            '<p class="product-size">' + product.size + '</p>' +
                            '<p class="product-price">$ ' + product.price + '</p>' +
                            '<span class="btn-add-cart"' +
                                ' data-name="' + product.name + '"' +
                                ' data-size="' + product.size + '"' +
                                ' data-price="' + product.price + '"' +
                                ' data-image="' + product.image + '">Add to cart</span>' +
                        '</div>' +
                    '</' + cardTag + '>' +
                '</div>';

            // Bind the Add to cart button
            var addBtn = resultBox.querySelector(".btn-add-cart");
            addBtn.addEventListener("click", function (event) {
                event.stopPropagation();
                event.preventDefault();

                var name = addBtn.getAttribute("data-name");
                var size = addBtn.getAttribute("data-size");
                var price = parseInt(addBtn.getAttribute("data-price"));
                var image = addBtn.getAttribute("data-image");

                var cart = [];
                var savedCart = localStorage.getItem("cart");
                if (savedCart) {
                    cart = JSON.parse(savedCart);
                }

                var found = false;
                for (var i = 0; i < cart.length; i++) {
                    if (cart[i].name === name && cart[i].size === size) {
                        cart[i].qty = cart[i].qty + 1;
                        found = true;
                        break;
                    }
                }

                if (found === false) {
                    cart.push({
                        name: name,
                        size: size,
                        price: price,
                        qty: 1,
                        image: image
                    });
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartCount();
                showToast();
            });
        }
    });
});

// Check if there is a keyword in the URL (from homepage search)
function checkUrlKeyword() {
    var params = new URLSearchParams(window.location.search);
    var keyword = params.get("keyword");

    if (keyword) {
        // Find the matching tag and trigger its click
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].getAttribute("data-keyword") === keyword) {
                tags[i].click();
                break;
            }
        }
    }
}

checkUrlKeyword();