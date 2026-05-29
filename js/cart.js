//localStorage.clear();
// Get the containers
const cartItemsBox = document.getElementById("cart-items");
const cartEmptyBox = document.getElementById("cart-empty");
const cartFullBox = document.getElementById("cart-full");
const totalPriceEl = document.querySelector(".total-price");

// Read the cart list from localStorage
let cart = [];
const savedCart = localStorage.getItem("cart");
if (savedCart) {
    cart = JSON.parse(savedCart);
}

// Calculate total and update subtotals
function updateTotal() {
    let total = 0;
    const allCards = document.querySelectorAll(".cart-item-card");

    allCards.forEach(function (card) {
        const price = parseInt(card.querySelector("[data-price]").dataset.price);
        const qty = parseInt(card.querySelector(".qty-number").textContent);
        const subtotal = price * qty;
        total = total + subtotal;
        const rows = card.querySelectorAll(".cart-item-row");
        const subtotalEl = rows[rows.length - 1].querySelector(".cart-info-value");
        subtotalEl.textContent = "$ " + subtotal;
    });

    totalPriceEl.textContent = "$ " + total;
}

// Decide which state to show
if (cart.length === 0) {
    // Cart is empty
    cartEmptyBox.style.display = "flex";
    cartFullBox.style.display = "none";
} else {
    // Cart has products
    cartEmptyBox.style.display = "none";
    cartFullBox.style.display = "block";

    // Build a card for each product
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        const card = document.createElement("div");
        card.className = "cart-item-card";

        // Fill the card with HTML
        card.innerHTML =
            '<img src="../images/cancel_icon.png" alt="Remove" class="cancel-icon" width="36" height="36">' +
            '<img src="' + product.image + '" alt="' + product.name + '" class="cart-item-img">' +
            '<div class="cart-item-info">' +
                '<div class="cart-item-row">' +
                    '<span class="cart-info-label">Product:</span>' +
                    '<span class="cart-info-value">' + product.name + '<br>' + product.size + '</span>' +
                '</div>' +
                '<div class="cart-item-row">' +
                    '<span class="cart-info-label">Price:</span>' +
                    '<span class="cart-info-value" data-price="' + product.price + '">$ ' + product.price + '</span>' +
                '</div>' +
                '<div class="cart-item-row">' +
                    '<span class="cart-info-label">quantity:</span>' +
                    '<div class="cart-qty-controller">' +
                        '<button class="qty-btn" aria-label="Decrease"><span>−</span></button>' +
                        '<span class="qty-number">' + product.qty + '</span>' +
                        '<button class="qty-btn" aria-label="Increase"><span>+</span></button>' +
                    '</div>' +
                '</div>' +
                '<div class="cart-item-row">' +
                    '<span class="cart-info-label">Subtotal:</span>' +
                    '<span class="cart-info-value">$ ' + (product.price * product.qty) + '</span>' +
                '</div>' +
            '</div>';

        cartItemsBox.appendChild(card);

        // Bind the cancel icon to remove this product
        const cancelIcon = card.querySelector(".cancel-icon");
        cancelIcon.addEventListener("click", function () {
            cart.splice(i, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            card.remove();
            if (cart.length === 0) {
                cartEmptyBox.style.display = "flex";
                cartFullBox.style.display = "none";
            }

            updateTotal();
        });
    }

    // Bind quantity buttons after cards are generated
    const allControllers = document.querySelectorAll(".cart-qty-controller");

    allControllers.forEach(function (controller, index) {
        const minusBtn = controller.querySelectorAll(".qty-btn")[0];
        const plusBtn = controller.querySelectorAll(".qty-btn")[1];
        const numberEl = controller.querySelector(".qty-number");

        plusBtn.addEventListener("click", function () {
            let qty = parseInt(numberEl.textContent);
            qty = qty + 1;
            numberEl.textContent = qty;
            cart[index].qty = qty;
            localStorage.setItem("cart", JSON.stringify(cart));
            updateTotal();
        });

        minusBtn.addEventListener("click", function () {
            let qty = parseInt(numberEl.textContent);
            if (qty > 1) {
                qty = qty - 1;
                numberEl.textContent = qty;
                cart[index].qty = qty;
                localStorage.setItem("cart", JSON.stringify(cart));
                updateTotal();
            }
        });
    });

    updateTotal();
}

// Save cart data when clicking Checkout
const checkoutBtn = document.querySelector(".btn-checkout-cart");

checkoutBtn.addEventListener("click", function () {
    const totalText = document.querySelector(".total-price").textContent;
    const total = parseInt(totalText.replace(/[^0-9]/g, ""));

    const cartData = {
        total: total
    };

    localStorage.setItem("cartData", JSON.stringify(cartData));
});