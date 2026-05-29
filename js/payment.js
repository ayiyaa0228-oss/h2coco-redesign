const savedCart = localStorage.getItem("cart");

if (savedCart) {
    const cart = JSON.parse(savedCart);

    // Calculate total
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total = total + (cart[i].price * cart[i].qty);
    }

    // Get the table body to add rows
    const tbody = document.querySelector(".bill-table tbody");
    tbody.innerHTML = "";

    // Add a row for each product
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        const subtotal = product.price * product.qty;

        const row = document.createElement("tr");
        row.innerHTML =
            '<td class="bill-td">' + product.name + ' ' + product.size + '</td>' +
            '<td class="bill-td bill-td-right">$ ' + subtotal + '</td>';
        tbody.appendChild(row);
    }

    document.getElementById("bill-total").textContent = "$ " + total;
}