const controllers = document.querySelectorAll(".cart-qty-controller");

controllers.forEach(function (controller) {
    const minusBtn = controller.querySelectorAll(".qty-btn")[0];
    const plusBtn = controller.querySelectorAll(".qty-btn")[1];  
    const numberEl = controller.querySelector(".qty-number");

    plusBtn.addEventListener("click", function () {
        let qty = parseInt(numberEl.textContent);
        qty = qty + 1;
        numberEl.textContent = qty;
    });

    minusBtn.addEventListener("click", function () {
        let qty = parseInt(numberEl.textContent);
        if (qty > 1) {          
            qty = qty - 1;
            numberEl.textContent = qty;
        }
    });
});