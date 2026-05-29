const continueBtn = document.querySelector(".btn-continue-payment");

continueBtn.addEventListener("click", function (event) {

    // Get all field values
    const firstName = document.querySelector("#first-name").value.trim();
    const lastName = document.querySelector("#last-name").value.trim();
    const address = document.querySelector("#address").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const email = document.querySelector("#email").value.trim();
    const state = document.querySelector("#state").value;

    // Check each field
    let isValid = true;

    if (firstName === "") {
        isValid = false;
        document.querySelector("#first-name").style.borderColor = "red";
    } else {
        document.querySelector("#first-name").style.borderColor = "";
    }

    if (lastName === "") {
        isValid = false;
        document.querySelector("#last-name").style.borderColor = "red";
    } else {
        document.querySelector("#last-name").style.borderColor = "";
    }

    if (address === "") {
        isValid = false;
        document.querySelector("#address").style.borderColor = "red";
    } else {
        document.querySelector("#address").style.borderColor = "";
    }

    if (phone === "" || isNaN(phone)) {
        isValid = false;
        document.querySelector("#phone").style.borderColor = "red";
    } else {
        document.querySelector("#phone").style.borderColor = "";
    }

    if (email === "" || email.indexOf("@") === -1) {
        isValid = false;
        document.querySelector("#email").style.borderColor = "red";
    } else {
        document.querySelector("#email").style.borderColor = "";
    }

    if (state === "") {
        isValid = false;
        document.querySelector("#state").style.borderColor = "red";
    } else {
        document.querySelector("#state").style.borderColor = "";
    }

    // If any field is invalid, stop the button from working
    if (isValid === false) {
        event.preventDefault();
        alert("Please fill in all fields correctly.");
    }
});