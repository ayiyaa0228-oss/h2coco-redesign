var hamburger = document.querySelector(".hamburger");
var drawerMenu = document.getElementById("drawer-menu");
var drawerOverlay = document.getElementById("drawer-overlay");
var drawerClose = document.getElementById("drawer-close");

// Toggle the drawer
hamburger.addEventListener("click", function () {
    drawerMenu.classList.toggle("show");
    drawerOverlay.classList.toggle("show");
});

// Close the drawer
function closeDrawer() {
    drawerMenu.classList.remove("show");
    drawerOverlay.classList.remove("show");
}

drawerClose.addEventListener("click", closeDrawer);
drawerOverlay.addEventListener("click", closeDrawer);