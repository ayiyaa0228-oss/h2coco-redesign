
const addBtn = document.getElementById("add-to-cart-btn");

addBtn.addEventListener("click", function () {
    // Collect product info from the page
    const name = document.querySelector(".detail-name").textContent;
    const size = document.querySelector(".detail-size").textContent;
    const priceText = document.querySelector(".detail-price").textContent;
    const price = parseInt(priceText.replace(/[^0-9]/g, ""));
    const qty = parseInt(document.querySelector(".qty-number").textContent);
    const image = document.getElementById("main-product-img").getAttribute("src");

    // Read the existing cart list from localStorage
    let cart = [];
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    // Check if this product is already in the cart
    let found = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name && cart[i].size === size) {
            cart[i].qty = cart[i].qty + qty;
            found = true;
            break;
        }
    }

    // If not found, add as a new product
    if (found === false) {
        const newProduct = {
            name: name,
            size: size,
            price: price,
            qty: qty,
            image: image
        };
        cart.push(newProduct);
    }

    // Save the updated list back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showToast();
});