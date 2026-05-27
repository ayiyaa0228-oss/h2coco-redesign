// Read cart data from localStorage
const savedData = localStorage.getItem("cartData");

if (savedData) {
    // Convert text back to an object
    const cartData = JSON.parse(savedData);

    // Fill the bill table
    document.getElementById("bill-product").textContent = cartData.name;
    document.getElementById("bill-qty").textContent = cartData.qty;
    document.getElementById("bill-subtotal").textContent = "$ " + cartData.subtotal;
    document.getElementById("bill-total").textContent = "$ " + cartData.total;
}