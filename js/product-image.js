// Get the main image and all thumbnails
var mainImg = document.getElementById("main-product-img");
var thumbs = document.querySelectorAll(".thumb-img");

// Add click event to each thumbnail
thumbs.forEach(function (thumb) {
    thumb.addEventListener("click", function () {
        mainImg.src = thumb.src;
        for (var i = 0; i < thumbs.length; i++) {
            thumbs[i].classList.remove("thumb-active");
        }
        thumb.classList.add("thumb-active");
    });
});