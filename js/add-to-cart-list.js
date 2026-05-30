const addBtns = document.querySelectorAll(".btn-add-cart");

addBtns.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
        event.stopPropagation();
        event.preventDefault();

        // Read product data from the button's data attributes
        const name = btn.getAttribute("data-name");
        const size = btn.getAttribute("data-size");
        const price = parseInt(btn.getAttribute("data-price"));
        const image = btn.getAttribute("data-image");

        // Read the existing cart from localStorage
        let cart = [];
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }

        // Check if this product is already in the cart
        let found = false;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].name === name && cart[i].size === size) {
                cart[i].qty = cart[i].qty + 1;
                found = true;
                break;
            }
        }

        // If not found, add as new product with qty 1
        if (found === false) {
            const newProduct = {
                name: name,
                size: size,
                price: price,
                qty: 1,
                image: image
            };
            cart.push(newProduct);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        showToast();
    });
});