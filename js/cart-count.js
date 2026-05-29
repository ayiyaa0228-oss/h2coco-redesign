function updateCartCount() {
    const savedCart = localStorage.getItem("cart");
    let totalQty = 0;

    if (savedCart) {
        const cart = JSON.parse(savedCart);
        for (let i = 0; i < cart.length; i++) {
            totalQty = totalQty + cart[i].qty;
        }
    }

    const cartCountEls = document.querySelectorAll(".cart-count");
    cartCountEls.forEach(function (el) {
        el.textContent = totalQty;
    });
}

updateCartCount();