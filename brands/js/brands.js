
/* ===== Password Modal ===== */

var modal = document.getElementById("passwordModal");
var errorMessage = document.getElementById("brand-error-message");

document.addEventListener("DOMContentLoaded", function() {
    modal.style.display = "block";
});

function validateLogin() {
    var password = document.getElementById("protected-password").value;
    var validPassword = "Brand_Unifi$2024";
    if (password === validPassword) {
        modal.style.display = "none"; 
    } else {
        errorMessage.style.display = "block";
    }
}

function hideErrorMessage() {
    errorMessage.style.display = "none"; 
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        validateLogin();
    }
});













