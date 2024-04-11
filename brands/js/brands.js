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

/* === Toggle Password Eye === */
function togglePasswordVisibility() {
  var passwordInput = document.getElementById("protected-password");
  var toggleButton = document.querySelector(".toggle-password i");

  if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleButton.classList.remove("bx-hide");
      toggleButton.classList.add("bx-show");
  } else {
      passwordInput.type = "password";
      toggleButton.classList.remove("bx-show");
      toggleButton.classList.add("bx-hide");
  }
}

/* === Brand Tab Section === */
function openBrand(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("brand-tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("brand-tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
// document.getElementById("productOpen").click();

document.addEventListener('DOMContentLoaded', function() {
  var brandOpenButton = document.getElementById("brandOpen");
  if (brandOpenButton) {
    brandOpenButton.click();
  } else {
      // console.error("Element with ID 'defaultOpen' not found.");
  }
});


