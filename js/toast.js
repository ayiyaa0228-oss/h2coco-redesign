// Function to show the cart toast
function showToast() {
    var toast = document.getElementById("cart-toast");
    toast.classList.add("show");

    // Auto hide after 5 seconds
    var hideTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 5000);

    // Click anywhere to close (except the Open link)
    function closeToast(event) {
        var isOpenLink = event.target.classList.contains("toast-open");
        if (!isOpenLink) {
            toast.classList.remove("show");
            clearTimeout(hideTimer);
            document.removeEventListener("click", closeToast);
        }
    }

    // Delay binding so this same click doesn't immediately close it
    setTimeout(function () {
        document.addEventListener("click", closeToast);
    }, 100);
}