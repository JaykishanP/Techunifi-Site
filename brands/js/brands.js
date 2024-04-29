/* === General JS === */
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('header');
    let offset = header.offsetHeight;

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#nav-menu');
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled');
      } else {
        selectHeader.classList.remove('header-scrolled');
      }
    };
    window.addEventListener('load', headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  $('.back-to-top').click(function(event) {
    event.preventDefault();
  
    $('html,body').animate({scrollTop:0}, 400); 
  });
  


  /**
   * Scroll with offset on page load with hash links in the URL
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });


  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})();



/* ===== Password Modal ===== */
var modal = document.getElementById("passwordModal");
var errorMessage = document.getElementById("brand-error-message");

document.addEventListener("DOMContentLoaded", function() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
});

function validateLogin() {
    var password = document.getElementById("protected-password").value;
    var validPassword = "Brand_Unifi$2024";
    if (password === validPassword) {
        modal.style.display = "none";
        document.body.style.overflow = ""; // Reset body overflow property
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


/* === Tabs Scroll to top  === */
//scroll to top on tab click
$('.brand-tablinks').click(function(event) {
  event.preventDefault();

  $('html,body').animate({scrollTop:0}, 400); 
});

/* ===== Meta OG ===== */
$(document).ready(function() {
  // Function to set meta tags based on screen size
  function setMetaTags() {
    const screenWidth = window.innerWidth;
    const desktopMetaTags = $('[id^="desktop_"]');
    const mobileMetaTags = $('[id^="mobile_"]');
    
    if (screenWidth >= 1024) {
      desktopMetaTags.css('display', 'block');
      mobileMetaTags.css('display', 'none');
    } else {
      desktopMetaTags.css('display', 'none');
      mobileMetaTags.css('display', 'block');
    }
  }

  // Call the function initially and on window resize
  setMetaTags();
  $(window).resize(setMetaTags);
});