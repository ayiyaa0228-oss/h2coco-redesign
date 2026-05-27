// Find all product cards in the cart
const cartItems = document.querySelectorAll(".cart-item-card");
const totalPriceEl = document.querySelector(".total-price");

// Calculate the subtotal for a single product
function updateSubtotal(card) {
    const price = parseInt(card.querySelector("[data-price]").dataset.price);
    const qty = parseInt(card.querySelector(".qty-number").textContent);
    const subtotal = price * qty;

    // Find the Subtotal row value and update it
    const rows = card.querySelectorAll(".cart-item-row");
    const subtotalEl = rows[rows.length - 1].querySelector(".cart-info-value");
    subtotalEl.textContent = "$ " + subtotal;

    return subtotal;
}

// Calculate the total price of all products
function updateTotal() {
    let total = 0;
    cartItems.forEach(function (card) {
        total = total + updateSubtotal(card);
    });
    totalPriceEl.textContent = "$ " + total;
}

// Recalculate when quantity buttons are clicked
cartItems.forEach(function (card) {
    const buttons = card.querySelectorAll(".qty-btn");
    const numberEl = card.querySelector(".qty-number");

    buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            updateTotal();
        });
    });

    numberEl.addEventListener("input", function () {
        updateTotal();
    });
});

// Calculate once when the page loads
updateTotal();


// Save cart data when clicking Checkout
const checkoutBtn = document.querySelector(".btn-checkout-cart");

checkoutBtn.addEventListener("click", function () {
    const card = cartItems[0];
    const name = card.querySelector(".cart-info-value").textContent;
    const qty = parseInt(card.querySelector(".qty-number").value);

    // Read the subtotal
    const rows = card.querySelectorAll(".cart-item-row");
    const subtotalText = rows[rows.length - 1].querySelector(".cart-info-value").textContent;
    const subtotal = parseInt(subtotalText.replace(/[^0-9]/g, ""));

    // Read the total
    const totalText = document.querySelector(".total-price").textContent;
    const total = parseInt(totalText.replace(/[^0-9]/g, ""));

    const cartData = {
        name: name,
        qty: qty,
        subtotal: subtotal,
        total: total
    };

    localStorage.setItem("cartData", JSON.stringify(cartData));
});