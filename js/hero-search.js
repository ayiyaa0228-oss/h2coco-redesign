var heroInput = document.querySelector(".hero-search-input");
var heroDropdown = document.getElementById("hero-dropdown");

// Show dropdown when clicking the search box
heroInput.addEventListener("click", function () {
    heroDropdown.classList.add("show");
});

// Hide dropdown when clicking outside
document.addEventListener("click", function (event) {
    var isInput = heroInput.contains(event.target);
    var isDropdown = heroDropdown.contains(event.target);

    if (!isInput && !isDropdown) {
        heroDropdown.classList.remove("show");
    }
});