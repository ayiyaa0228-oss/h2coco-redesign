var nutritionBtn = document.querySelector(".btn-nutrition");
var nutritionOverlay = document.getElementById("nutrition-overlay");

// Open the modal
nutritionBtn.addEventListener("click", function () {
    nutritionOverlay.classList.add("show");
});

// Click anywhere to close
nutritionOverlay.addEventListener("click", function () {
    nutritionOverlay.classList.remove("show");
});