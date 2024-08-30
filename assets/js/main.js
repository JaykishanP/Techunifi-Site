 (function() {
  "use strict";

   //  Easy selector helper function
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

   // Easy event listener function
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

   //  Easy on scroll event listener 
   const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };


  // Scrolls to an element with header offset
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

  // * Toggle .header-scrolled class to #header when page is scrolled
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

   // Back to top button
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
  

  // * Scroll with offset on page load with hash links in the URL
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });


  // Animation on scroll
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  // Initiate Pure Counter 
  new PureCounter();

})(); 


/* Slick Slider*/
var swiper = new Swiper('.bk-slider .swiper', {
  slidesPerView: 3,
  speed: 500,
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  loop: true,
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 1,
    },
    1023: {
      slidesPerView: 1,
    }
    ,
    1024: {
      slidesPerView: 3,
    }
  }
});

// About pagination

function showPage(pageNumber) {
  var newsSections = document.querySelectorAll('.news-section');
  var itemsPerPage = 3; // Change this value to adjust the number of items per page

  for (var i = 0; i < newsSections.length; i++) {
      if (i < pageNumber * itemsPerPage && i >= (pageNumber - 1) * itemsPerPage) {
          newsSections[i].style.display = 'block';
      } else {
          newsSections[i].style.display = 'none';
      }
  }

  // Scroll to the top of the news section
  document.getElementById('tab2').scrollIntoView({ behavior: 'smooth' });
}

// Function to generate pagination controls
function setupPagination() {
  var newsSections = document.querySelectorAll('.news-section');
  var itemsPerPage = 2; // Change this value to adjust the number of items per page
  var numPages = Math.ceil(newsSections.length / itemsPerPage);

  var pagination = document.getElementById('news-pagination');
  pagination.innerHTML = '';

  for (var i = 1; i <= numPages; i++) {
      var button = document.createElement('button');
      button.textContent = i;
      button.addEventListener('click', function() {
          showPage(parseInt(this.textContent));
      });
      pagination.appendChild(button);
  }

  // Show the first page by default
  showPage(1);
}

// Call the setupPagination function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    if(document.getElementById('news-pagination')) {
        setupPagination();
    }
});



/* ==== Submit ticket ===== */

$('option').mousedown(function(e) {
  e.preventDefault();
  $(this).prop('selected', !$(this).prop('selected'));
  return false;
});


/* ====== Menu ====== */
// Menu

const dropdownBtn = document.querySelectorAll(".dropdown-btn");
const dropdown = document.querySelectorAll(".dropdown");
const hamburgerBtn = document.getElementById("hamburger");
const navMenu = document.querySelector(".menu");
const links = document.querySelectorAll(".dropdown a");

function setAriaExpandedFalse() {
  dropdownBtn.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
}

function closeDropdownMenu() {
  dropdown.forEach((drop) => {
    drop.classList.remove("active");
    drop.addEventListener("click", (e) => e.stopPropagation());
  });
}

function toggleHamburger() {
  navMenu.classList.toggle("show");
}

dropdownBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const dropdownIndex = e.currentTarget.dataset.dropdown;
    const dropdownElement = document.getElementById(dropdownIndex);

    dropdownElement.classList.toggle("active");
    dropdown.forEach((drop) => {
      if (drop.id !== btn.dataset["dropdown"]) {
        drop.classList.remove("active");
      }
    });
    e.stopPropagation();
    btn.setAttribute(
      "aria-expanded",
      btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
    );
  });
});

// close dropdown menu when the dropdown links are clicked
links.forEach((link) =>
  link.addEventListener("click", () => {
    closeDropdownMenu();
    setAriaExpandedFalse();
    toggleHamburger();
  })
);

// close dropdown menu when you click on the document body
document.documentElement.addEventListener("click", () => {
  closeDropdownMenu();
  setAriaExpandedFalse();
});

// close dropdown when the escape key is pressed
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDropdownMenu();
    setAriaExpandedFalse();
  }
});

// toggle hamburger menu
hamburgerBtn.addEventListener("click", toggleHamburger);


// 
$(document).ready(function() {

 $(".menu-bar > li").click (function () {
  $ (".menu").addClass('menu-expanded');
});

$(".nav-end").click (function () {
  $ (".menu").removeClass('menu-expanded');
});

});

// mobile li active underline

function toggleUnderline(event) {
  var allMenuItems = document.querySelectorAll('.menu-bar li .nav-link');
  allMenuItems.forEach(function(item) {
    item.classList.remove('underline');
  });
  event.target.classList.add('underline');
}




/* ==== Header navitem color change ==== */


/* ==== how it works redirection ==== */
document.addEventListener('DOMContentLoaded', function() {
  const howItWorksLink = document.querySelector('a[href="#how-it-works"]');
  if (howItWorksLink) {
      howItWorksLink.addEventListener('click', function(e) {
          e.preventDefault();
          
          const target = document.getElementById('how-it-works');
          if (target) {
              const offsetTop = target.offsetTop - 180; // Adjusted offset if necessary
              window.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
              });
          }
      });
  }
});



// Services

// $(".menu-bar > li").click (function () {
//   $ (".menu").css('display', 'none');
// });

// $(".nav-end,").click (function () {
//   $ (".menu").css('display', 'block');
// });


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

/* ===== domain/index.html ===== */
$(document).ready(function() {
  if (window.location.pathname === '/index.html') {
      window.location.replace('/');
  }
});


/* ====== About tabs ====== */
// Tabs

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
// document.getElementById("defaultOpen").click();

document.addEventListener('DOMContentLoaded', function() {
  var defaultOpenButton = document.getElementById("defaultOpen");
  if (defaultOpenButton) {
      defaultOpenButton.click();
  } else {
      // console.error("Element with ID 'defaultOpen' not found.");
  }
});


/* ==== Home to News - About Page ==== */

document.addEventListener('DOMContentLoaded', function() {
  var urlParams = new URLSearchParams(window.location.search);
  var tabParam = urlParams.get('tab');
  if (tabParam === 'news') {
    openTab(null, 'tab2'); // Assuming 'tab2' is the ID of the News tab
    var tabLinks = document.getElementsByClassName('tablinks');
    for (var i = 0; i < tabLinks.length; i++) {
      if (tabLinks[i].getAttribute('data-tab') === 'tab2') {
        tabLinks[i].classList.add('active');
        break; // Stop looping once the News tab link is found
      }
    }
  }
});

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active"); // Remove active class from all tab links
  }
  document.getElementById(tabName).style.display = "block";
  if (evt) {
    evt.currentTarget.classList.add("active"); // Add active class to the clicked tab link
  }
}

/* ==== Home to ClientList - About Page ==== */
document.addEventListener('DOMContentLoaded', function() {
  var urlParams = new URLSearchParams(window.location.search);
  var tabParam = urlParams.get('tab');
  if (tabParam === 'clientList') {
    openTab(null, 'tab4'); // Assuming 'tab2' is the ID of the News tab
    var tabLinks = document.getElementsByClassName('tablinks');
    for (var i = 0; i < tabLinks.length; i++) {
      if (tabLinks[i].getAttribute('data-tab') === 'tab4') {
        tabLinks[i].classList.add('active');
        break; // Stop looping once the News tab link is found
      }
    }
  }
});

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active"); // Remove active class from all tab links
  }
  document.getElementById(tabName).style.display = "block";
  if (evt) {
    evt.currentTarget.classList.add("active"); // Add active class to the clicked tab link
  }
}


/* === Scroll to about top === */
//scroll to top on tab click
$('.tablinks, .prod-tablinks').click(function(event) {
  event.preventDefault();

  $('html,body').animate({scrollTop:0}, 400); 
});


/* ====== Product ======*/
//Product - Tabs

document.addEventListener('DOMContentLoaded', function() {
  // Function to handle tab clicks
  function openProd(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("product-tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("prod-tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active"); // Remove active class from all tab links
    }

    var cityElement = document.getElementById(cityName);
    if (cityElement) {
      cityElement.style.display = "block";
      cityElement.classList.add("active");
    }

    // Add active class to the clicked tab button
    evt.currentTarget.classList.add("active");
  }

  // Find and handle the overview tab
  var productOpenButton = document.getElementById("productOpen");
  var overviewTabContent = document.getElementById("tab-overview");

  if (productOpenButton && overviewTabContent) {
    productOpenButton.classList.add("active"); // Add active class to Overview tab button
    overviewTabContent.style.display = "block"; // Ensure Overview content is visible
    overviewTabContent.classList.add("active"); // Add active class to Overview tab content
  }

  // Adding event listeners to all tab buttons
  var tabButtons = document.querySelectorAll(".prod-tablinks");
  tabButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
      var isActive = button.classList.contains("active");
      if (!isActive || button.id === "productOpen") {
        openProd(event, button.getAttribute("id").replace("prod-", ""));
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var overviewTabButton = document.getElementById("productOpen");
  var overviewTabContent = document.getElementById("tab-overview");

  if (overviewTabButton && overviewTabContent) {
    overviewTabButton.addEventListener("click", function(event) {
      if (!overviewTabButton.classList.contains("active")) {
        overviewTabButton.classList.add("active");
        overviewTabContent.style.display = "block";
      } else {
        overviewTabContent.style.display = "block"; // Ensure content is visible even if button is already active
      }
    });
  }
});



/* ======== Prod tab Mobile slide ============  */
document.addEventListener("DOMContentLoaded", function() {
  const prevButton = document.querySelector(".prod-prev-button");
  const nextButton = document.querySelector(".prod-next-button");
  const tabsContainer = document.querySelector(".tabs-container");

  if (prevButton && nextButton && tabsContainer) {
    prevButton.addEventListener("click", function() {
      tabsContainer.scrollBy({ left: -100, behavior: 'smooth' }); // Scroll left by 100 pixels smoothly
    });

    nextButton.addEventListener("click", function() {
      tabsContainer.scrollBy({ left: 100, behavior: 'smooth' }); // Scroll right by 100 pixels smoothly
    });
  } 
  // else {
  //   console.error("One or more elements not found.");
  // }
});

/* ======= Prod center Mobile slide ========= */
document.addEventListener('DOMContentLoaded', function() {
  function centerActiveTab(tab) {
    if (window.innerWidth <= 767) { // Check if the screen width is 767px or less
      var tabsContainer = document.querySelector('.tabs-container');
      var tabRect = tab.getBoundingClientRect();
      var containerRect = tabsContainer.getBoundingClientRect();

      var offset = tabRect.left - containerRect.left - (containerRect.width / 2) + (tabRect.width / 2);
      tabsContainer.scrollBy({
        left: offset,
        behavior: 'smooth'
      });
    }
  }

  var tabButtons = document.querySelectorAll('.prod-tablinks');
  tabButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
      centerActiveTab(event.currentTarget);
    });
  });
});


/* ======== ============ */
// redirect from h to p

function redirectToPage(page, section) {
  window.location.href = `${page}?section=${section}`;
}

function openProd(event, tabName) {
  // Get all elements with class "prod-tablinks" and remove the class "active"
  const tabLinks = document.querySelectorAll('.prod-tablinks');
  tabLinks.forEach(link => link.classList.remove('active'));

  // Get all elements with class "product-tabcontent" and hide them
  const tabContents = document.querySelectorAll('.product-tabcontent');
  tabContents.forEach(content => content.style.display = 'none');

  // Add the "active" class to the button that opened the tab
  const activeButton = document.querySelector(`.prod-tablinks[id="prod-${tabName}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }

  // Show the specific tab content
  document.getElementById(tabName).style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const section = urlParams.get('section');

  if (section) {
    openProd(null, section);
  }
});

function redirectToPage(page, section) {
  window.location.href = `${page}?section=${section}`;
}

/* ======= redirect from h to p Prod center Mobile slide ========= */
document.addEventListener('DOMContentLoaded', function() {
  function centerActiveTab(tab) {
    if (window.innerWidth <= 767) { // Check if the screen width is 767px or less
      var tabsContainer = document.querySelector('.tabs-container');
      var tabRect = tab.getBoundingClientRect();
      var containerRect = tabsContainer.getBoundingClientRect();

      var offset = tabRect.left - containerRect.left - (containerRect.width / 2) + (tabRect.width / 2);
      tabsContainer.scrollBy({
        left: offset,
        behavior: 'smooth'
      });
    }
  }

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const section = urlParams.get('section');

  if (section) {
    const activeButton = document.querySelector(`.prod-tablinks[id="prod-${section}"]`);
    if (activeButton) {
      // Add a slight delay to ensure the DOM has rendered the tab content
      setTimeout(function() {
        centerActiveTab(activeButton);
      }, 100); // Adjust the delay time if necessary
    }
  }
});



/* == == */
window.onload = function() {
  if (performance.navigation.type === 1) {
      // Page is being reloaded
      // Remove the query parameter from the URL
      var currentUrl = window.location.href;
      var cleanUrl = currentUrl.split('?')[0];
      window.history.replaceState({}, document.title, cleanUrl);
  }
};


/* ======== Submit Tab ======== */

function subTicket(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("sub-tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("sub-tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
// document.getElementById("productOpen").click();

document.addEventListener('DOMContentLoaded', function() {
  var productOpenButton = document.getElementById("sub-defaultOpen");
  if (productOpenButton) {
    productOpenButton.click();
  } else {
      // console.error("Element with ID 'defaultOpen' not found.");
  }
});


/* ======== Home img Slider ========= */
// Initialize Swiper
var swiper = new Swiper('.home-clients-slider', {
  speed: 400,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 40
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 4,
      centeredSlides: false,
      spaceBetween: 20,
    }
  }
});


// Home clients scale up
document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById("image-modal");
  
  if (modal) {
    var modalImg = document.getElementById("modal-image");
    var captionText = document.getElementById("caption-image");

    var images = document.querySelectorAll('.swiper-slide img');
    images.forEach(function (img) {
      img.onclick = function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        
        // Get the caption text from the corresponding .home-swipe-img-text element
        var parentSlide = this.closest('.swiper-slide');
        var caption = parentSlide.querySelector('.home-swipe-img-text').innerText;
        captionText.innerHTML = caption;

        swiper.autoplay.stop(); // Stop autoplay when modal is opened
      };
    });

    var span = document.querySelector(".close");

    if (span) {
      span.addEventListener('click', function () {
        modal.style.display = "none";
        swiper.autoplay.start(); // Start autoplay when modal is closed
      });
    }

    modal.addEventListener('click', function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        swiper.autoplay.start(); // Start autoplay when modal is closed
      }
    });
  }
});


/* ======== Products Slider ========== */

// Get all elements with the class '.js-slider'
const sliders = document.querySelectorAll(".js-slider");

// Iterate over each slider element
sliders.forEach(function(slider) {
    const swiper = new Swiper(slider, {
        spaceBetween: 20,
        slidesPerView: 1,
        grabCursor: true,
        pagination: {
            el: slider.querySelector(".swiper-pagination"),
            clickable: true,
        },
        navigation: {
            nextEl: slider.parentNode.querySelector(".swiper-button-next"), // Corrected selector to find next button
            prevEl: slider.parentNode.querySelector(".swiper-button-prev"), // Corrected selector to find previous button
        },
        mousewheel: true,
    });


});



/* ====== Leftnav highlight on scroll ======= */

// document.addEventListener("DOMContentLoaded", function() {
//   const tabLinks = document.querySelectorAll(".left-right .tab a");
  
//   window.addEventListener("scroll", function() {
//     const sections = document.querySelectorAll(".right-content .id-div");
//     const scrollPosition = window.scrollY || window.pageYOffset;
    
//     sections.forEach(section => {
//       const rect = section.getBoundingClientRect();
      
//       if (rect.top <= 0 && rect.bottom > 0) {
//         const id = section.getAttribute("id");
//         tabLinks.forEach(link => {
//           if (link.getAttribute("href") === `#${id}`) {
//             link.classList.add("active");
//           } else {
//             link.classList.remove("active");
//           }
//         });
//       }
//     });
//   });
// });

// document.addEventListener("DOMContentLoaded", function() {
//   const tabLinks = document.querySelectorAll(".left-right .tab a");
  
//   tabLinks.forEach(link => {
//     link.addEventListener("click", function(event) {
      
//       tabLinks.forEach(link => {
//         link.classList.remove("active");
//       });
      
//       this.classList.add("active");
//     });
//   });
// });


document.addEventListener("DOMContentLoaded", function() {
  const tabLinks = document.querySelectorAll(".left-right .tab a");

  // Helper function to set active tab
  function setActiveTab(link) {
    tabLinks.forEach(link => link.classList.remove("active"));
    link.classList.add("active");
  }

  // Click event for tabs
  tabLinks.forEach(link => {
    link.addEventListener("click", function(event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (!targetSection) return;

      // Set active class immediately
      setActiveTab(this);

      // Calculate the top position considering the offset
      const headerOffset = 100; // Adjust as necessary for fixed headers
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      // Smooth scroll to the target section
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Add a temporary flag to prevent scroll event from interfering
      document.body.classList.add('scrolling');
      setTimeout(() => {
        document.body.classList.remove('scrolling');
      }, 1000);
    });
  });

  // Scroll event to update active tab
  function handleScroll() {
    if (document.body.classList.contains('scrolling')) {
      return; // Prevent scroll event from interfering during smooth scroll
    }

    const sections = document.querySelectorAll(".right-content .id-div");
    const scrollPosition = window.scrollY || window.pageYOffset;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const id = section.getAttribute("id");

      if (rect.top <= 100 && rect.bottom >= 100) { // Adjusted offset for better accuracy
        tabLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            setActiveTab(link);
          }
        });
      }
    });
  }

  window.addEventListener("scroll", handleScroll);

  // Intersection Observer for better performance and accuracy
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Adjust the threshold as necessary
  };

  const observer = new IntersectionObserver((entries) => {
    if (document.body.classList.contains('scrolling')) {
      return; // Prevent observer event from interfering during smooth scroll
    }

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        const tabLink = document.querySelector(`.left-right .tab a[href="#${id}"]`);

        if (tabLink) {
          setActiveTab(tabLink);
        }
      }
    });
  }, options);

  document.querySelectorAll('.right-content .id-div').forEach(section => {
    observer.observe(section);
  });

  // Highlight the tab corresponding to the current hash on page load
  if (window.location.hash) {
    const initialTab = document.querySelector(`.left-right .tab a[href="${window.location.hash}"]`);
    if (initialTab) {
      setActiveTab(initialTab);
      const targetSection = document.getElementById(window.location.hash.substring(1));
      if (targetSection) {
        const headerOffset = 100; // Adjust as necessary for fixed headers
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  }
});



/* ======== mobile prod sidebar fixed ======== */

$(document).ready(function() {
  $(document).scroll(function() {
    var scroll_top = $(this).scrollTop();
    var windowHeight = $(window).height();
    var headerHeight = $('header').outerHeight();
    var heroHeight = $('#hero').outerHeight();
    var breadCrumbHeight = $('.bread-crumb-row').outerHeight();
    var headParaHeight = $('.head-para-row').outerHeight();
    var tab = $('.left-right .tab');
    var header = $('header');
    var mobileFixedTabArrow = $('.mobile-fixed-tab-arrow');
    var tabContainers = $('.right-content');
    var footerOffsetTop = $('footer').offset().top;
    var emailSubRowHeight = $('.email-sub-row').outerHeight();

    if (window.matchMedia('(max-width: 767px)').matches) {
      tabContainers.each(function(index) {
        var tabContainer = $(this);
        var tabContainerOffsetTop = tabContainer.offset().top;
        var tabContainerHeight = tabContainer.outerHeight();
        var tabContainerBottom = tabContainerOffsetTop + tabContainerHeight;

        if (scroll_top > tabContainerOffsetTop - (headerHeight + heroHeight + breadCrumbHeight + headParaHeight)) {
          if (scroll_top > tabContainerOffsetTop) {
            if (scroll_top + windowHeight >= footerOffsetTop - emailSubRowHeight) {
              var tabBottom = footerOffsetTop - scroll_top - emailSubRowHeight;
              tab.css({
                'position': 'fixed',
                // 'bottom': tabBottom + 'px',
                'bottom': 'auto',
                'top': 'auto'
              });
            } else {
              tab.css({
                'position': 'fixed',
                'top': headerHeight + heroHeight + breadCrumbHeight + headParaHeight + 'px',
                'bottom': 'auto'
              });
            }

            header.css('display', 'none');
            mobileFixedTabArrow.css('top', '0');
            tab.css('top', '80px');
          } else {
            tab.css({
              'position': 'static',
              'border-right': 'none'
            });
            header.css('display', 'block');
            mobileFixedTabArrow.css('top', 'auto');
            tab.css('top', headerHeight + heroHeight + breadCrumbHeight + headParaHeight + 'px');
          }
        } else {
          header.css('display', 'block');
          mobileFixedTabArrow.css('top', 'auto');
          tab.css({
            'position': 'static',
            'border-right': 'none',
            'top': 'auto'
          });
        }
      });
    } else {
      header.css('display', 'block');
      mobileFixedTabArrow.css('top', 'auto');
      tab.css({
        'position': 'static',
        'border-right': 'none',
        'top': 'auto'
      });
    }
  });
});


/* ======== menu contact ========= */
$(document).ready(function() {
  function scrollToElementByIdWithJQuery(id) {
    var checkExist = setInterval(function() {
      if ($("#" + id).length) {
        clearInterval(checkExist);
        $('html, body').animate({
          scrollTop: $("#" + id).offset().top
        }, 100); // smooth scroll to the element
      }
    }, 100); // check every 100ms
  }

  if (window.location.hash === '#contact') {
    scrollToElementByIdWithJQuery('contact');
  }
});


/* ==== Form Validation ====  */

$(document).ready(function() {

  /* ======= Submit a Ticket ======= */

    /* === New Inquiry Form === */
    
    function inquirygenerateRandomNumbers() {
      var inquirynum1 = Math.floor(Math.random() * 10);
      var inquirynum2 = Math.floor(Math.random() * 10);
      return [inquirynum1, inquirynum2]
    }
  
    function inquiryupdateMathSumQuestion() {
      var inquiryrandomNumbers = inquirygenerateRandomNumbers();
      var inquirynum1 = inquiryrandomNumbers[0];
      var inquirynum2 = inquiryrandomNumbers[1];
      $('#inquirymathSumQuestion').text('What is ' + inquirynum1 + ' + ' + inquirynum2 + '?');
      $('#inquirymathSum').data('inquiryexpectedSum', inquirynum1 + inquirynum2)
    }
    inquiryupdateMathSumQuestion();
  
    function validateInquiryForm() {
      var formValid = !0;
      $('#myInquiryForm input, #myInquiryForm select, #myInquiryForm textarea').each(function() {
        if ($(this).hasClass('not-required')) {
          return !0
        }
        if (!$(this).val() || ($(this).is('select[multiple]') && $(this).find('option:selected').length === 0)) {
          formValid = !1;
          $(this).css('border-color', 'red');
          $('html, body').animate({
            scrollTop: $(this).offset().top - 160
          }, 500);
          return !1
        } else {
          $(this).css('border-color', 'green')
        }
      });
      var inquirymathSumInput = $('#inquirymathSum');
      var inquirymathSumValue = inquirymathSumInput.val();
      var inquiryexpectedSum = inquirymathSumInput.data('inquiryexpectedSum');
      if (!inquirymathSumValue || parseInt(inquirymathSumValue) !== inquiryexpectedSum) {
        inquirymathSumInput.css('border-color', 'red');
        formValid = !1
      } else {
        inquirymathSumInput.css('border-color', 'green')
      }
      if (!formValid) {
        return !1
      }
      return !0
    }
    $('#myInquiryForm').submit(function() {
      return validateInquiryForm()
    });
    $('#submitTicketForm').on('reset', function() {
      inquiryupdateMathSumQuestion()
    });
    $('#myInquiryForm input, #myInquiryForm select, #myInquiryForm textarea').on('input change blur', function() {
      if (!$(this).hasClass('not-required')) {
        if ($(this).val() || ($(this).is('select[multiple]') && $(this).find('option:selected').length !== 0)) {
          $(this).css('border-color', 'green')
        } else {
          $(this).css('border-color', 'red')
        }
      }
    })



  });


/* ===== Submit a Ticket ===== */
// JavaScript for submit.html


/* ===== Change Order ===== */
// JavaScript for change-order.html

$(document).ready(function() {
  // Function to generate random numbers for math validation
  function generateRandomNumbers() {
    var num1 = Math.floor(Math.random() * 10);
    var num2 = Math.floor(Math.random() * 10);
    return [num1, num2];
  }

  // Function to update the math sum question with new numbers
  function updateMathSumQuestion() {
    var randomNumbers = generateRandomNumbers();
    var num1 = randomNumbers[0];
    var num2 = randomNumbers[1];
    $('#mathSumQuestion').text('What is ' + num1 + ' + ' + num2 + '?');
    $('#mathSum').data('expectedSum', num1 + num2); // Store the expected sum in a data attribute for validation
  }

  // Call the function to update the math sum question when the document is ready
  updateMathSumQuestion();

  // Function to validate the ticket form
  function validateTicketForm() {
    var formValid = true;

    // Check each input field in the form
    $('#submitTicketForm input, #submitTicketForm select, #submitTicketForm textarea').each(function() {
      // Skip validation for fields with class "not-required"
      if ($(this).hasClass('not-required')) {
        return true; // Skip this field and continue with the next one
      }

      // If the field is empty or not selected
      if (!$(this).val() || ($(this).is('select[multiple]') && $(this).find('option:selected').length === 0)) {
        formValid = false;
        $(this).css('border-color', 'red');
        // Scroll to the field
        $('html, body').animate({
          scrollTop: $(this).offset().top - 200 // Adjust the offset to ensure the field is visible
        }, 500);
        return false; // Exit the loop after scrolling to the first invalid field
      } else {
        // Set border color to green if the field is filled
        $(this).css('border-color', 'green');
      }
    });

    // Validate math sum question after other fields are validated
    var mathSumInput = $('#mathSum');
    var mathSumValue = mathSumInput.val();
    var expectedSum = mathSumInput.data('expectedSum'); // Retrieve the expected sum from the data attribute
    if (!mathSumValue || parseInt(mathSumValue) !== expectedSum) {
      mathSumInput.css('border-color', 'red');
      formValid = false;
    } else {
      mathSumInput.css('border-color', 'green');
    }

    // Validate CAPTCHA
    var captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
      // If CAPTCHA is not completed
      formValid = false;
      $('.g-recaptcha').css('border-color', 'red'); // Optional: You might want to style CAPTCHA differently
      alert('Please complete the CAPTCHA'); // Optional: Alert to inform user
    } else {
      $('.g-recaptcha').css('border-color', 'green'); // Optional: Style CAPTCHA if completed
    }

    // Return false if any field is invalid
    return formValid;
  }

  // Attach submit event handler to the form
  $('#submitTicketForm').on('submit', function(event) {
    if (!validateTicketForm()) {
      event.preventDefault(); // Prevent form submission if validation fails
    }
  });

  // Event listener to update math sum question when the form is reset
  $('#submitTicketForm').on('reset', function() {
    updateMathSumQuestion();
  });

  // Event listener to update border color on input changes
  $('#submitTicketForm input, #submitTicketForm select, #submitTicketForm textarea').on('input change blur', function() {
    if (!$(this).hasClass('not-required')) {
      if ($(this).val() || ($(this).is('select[multiple]') && $(this).find('option:selected').length !== 0)) {
        $(this).css('border-color', 'green');
      } else {
        $(this).css('border-color', 'red');
      }
    }
  });
});







/* ==== Tooltip ==== */
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})


/* ==== Product Accordion Approach ==== */
/* ==== Card Width ==== */

document.addEventListener('DOMContentLoaded', function() {
  const swiperSlides = document.querySelectorAll('.swiper-slide');
  const cardClicks = document.querySelectorAll('.card-click');

  if (swiperSlides.length > 0 && cardClicks.length > 0) {
    // Function to reset width and hide/show card-more and card-chev-right
    function toggleCardDetails(slide, showDetails) {
      const screenWidth = window.innerWidth;
      const cardMore = slide.querySelector('.card-more');
      const cardChevRight = slide.querySelector('.card-click .card-chev-right');
      const cardCollapseContent = slide.querySelector('.card-collapse-content');

      if (cardMore && cardChevRight && cardCollapseContent) {
        if (showDetails) {
          if (screenWidth >= 1024) {
            slide.style.width = '600px'; // Set width to show card-more
          }
          cardMore.classList.add('active'); // Show card-more
          cardChevRight.classList.add('hidden'); // Hide card-chev-right
          cardCollapseContent.style.maxHeight = cardCollapseContent.scrollHeight + 'px'; // Expand content
        } else {
          slide.style.width = ''; // Reset width
          cardMore.classList.remove('active'); // Hide card-more
          cardChevRight.classList.remove('hidden'); // Show card-chev-right
          cardCollapseContent.style.maxHeight = null; // Collapse content
        }
      }
    }

    // Set width and activate card-more for the first slide by default
    toggleCardDetails(swiperSlides[0], true);

    // Handle click on any card-click
    cardClicks.forEach(function(card) {
      card.addEventListener('click', function() {
        // Find the nearest swiper-slide parent
        const swiperSlide = card.closest('.swiper-slide');

        // Reset all slides and hide all card-mores
        swiperSlides.forEach(function(slide) {
          toggleCardDetails(slide, false);
        });

        // Show/hide card-more and reset width for the clicked one
        if (swiperSlide) {
          toggleCardDetails(swiperSlide, true);
        }
      });
    });

    // Handle click on card-more to close it
    swiperSlides.forEach(function(slide) {
      const cardMore = slide.querySelector('.card-more .card-chev-right');
      if (cardMore) {
        cardMore.addEventListener('click', function(event) {
          event.stopPropagation(); // Prevent click event from bubbling up to the card-click
          const swiperSlide = cardMore.closest('.swiper-slide');
          toggleCardDetails(swiperSlide, false);
        });
      }
    });
  }
});

 

/* ===== New How Works ===== */

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.new-how-main');
  const options = {
    root: null,
    threshold: 0.6
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeSection = entry.target;
        adjustAdjacentOpacity(activeSection);
      }
    });
  }, options);

  sections.forEach(section => observer.observe(section));

  function adjustAdjacentOpacity(activeSection) {
    sections.forEach(section => {
      const h1Element = section.querySelector('h2');
      const imgElement = section.querySelector('.col-md-5 img');
      const pElement = section.querySelector('.col-md-5 p');
      const isAdjacentSection = isAdjacent(activeSection, section);

      if (section === activeSection) {
        section.classList.add('active');
        h1Element.style.color = '#EB6D47';
        h1Element.style.opacity = '1';
        imgElement.style.opacity = '1';
        pElement.style.opacity = '1';
      } else if (isAdjacentSection) {
        section.classList.remove('active');
        h1Element.style.color = '#313D53';
        h1Element.style.opacity = '0.7';
        imgElement.style.opacity = '0';
        pElement.style.opacity = '0';
      } else {
        section.classList.remove('active');
        h1Element.style.color = '#313D53';
        h1Element.style.opacity = '0.32';
        imgElement.style.opacity = '0';
        pElement.style.opacity = '0';
      }

      [h1Element, imgElement, pElement].forEach(elem => {
        elem.style.transition = 'opacity 0.7s ease, color 0.7s ease';
      });
    });
  }

  function isAdjacent(section1, section2) {
    const index1 = Array.from(sections).indexOf(section1);
    const index2 = Array.from(sections).indexOf(section2);
    return Math.abs(index1 - index2) === 1;
  }

  sections.forEach(section => {
    const h1Element = section.querySelector('h2');
    const imgElement = section.querySelector('.col-md-5 img');
    const pElement = section.querySelector('.col-md-5 p');

    section.addEventListener('mouseover', () => {
      if (!section.classList.contains('active')) {
        h1Element.style.color = '#EB6D47';
        h1Element.style.opacity = '1';
        imgElement.style.opacity = '1';
        pElement.style.opacity = '1';
      }
    });

    section.addEventListener('mouseout', () => {
      if (!section.classList.contains('active')) {
        h1Element.style.color = '#313D53';
        h1Element.style.opacity = '0.32';
        imgElement.style.opacity = '0';
        pElement.style.opacity = '0';
      }
    });
  });
});


/* ===== Product heading to new Inquiry ===== */

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.card-more .card-get-link').forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      // Find the corresponding card's description
      const card = event.target.closest('.rows');
      const description = card.querySelector('.card-click .card-prod-heading').textContent.trim();

      // Save the description to sessionStorage
      sessionStorage.setItem('cardDescription', description);

      // Redirect to submit.html with activeTab parameter
      window.location.href = event.target.href;
    });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  // Check if there is a description saved in sessionStorage
  const description = sessionStorage.getItem('cardDescription');
  console.log('Loaded Description:', description); // Debugging statement
  if (description) {
    // Fill the Description textarea
    const descriptionTextarea = document.querySelector('textarea[name="description"]');
    if (descriptionTextarea) {
      descriptionTextarea.value = description;
    }

    // Optionally, you can clear the saved description from sessionStorage
    sessionStorage.removeItem('cardDescription');
  }
});



/* ==== remove AOS for mobile(<1024) ==== */
document.addEventListener('DOMContentLoaded', function() {
  function removeAOSAttributes() {
    const elements = document.querySelectorAll('[data-aos], [data-aos-delay]');
    if (window.innerWidth < 1024) {
      elements.forEach(element => {
        element.removeAttribute('data-aos');
        element.removeAttribute('data-aos-delay');
      });
    }
  }

  // Run the function on page load
  removeAOSAttributes();

  // Run the function on window resize
  window.addEventListener('resize', function() {
    removeAOSAttributes();
  });
});

   
/* ==== Captcha Implementation==== */
function timestamp() {
  var response = document.getElementById("g-recaptcha-response");
  if (!response) {
      console.warn("g-recaptcha-response element not found");
      return;
  }
  
  if (response.value.trim() === "") {
      var captchaSettingsElem = document.getElementsByName("captcha_settings")[0];
      if (captchaSettingsElem) {
          var elems = JSON.parse(captchaSettingsElem.value);
          elems["ts"] = new Date().getTime(); // no need to stringify here
          captchaSettingsElem.value = JSON.stringify(elems);
      }
  }
}

// Optionally, adjust or replace setInterval based on your needs
setInterval(timestamp, 500);


/* =========  Product heading to Modal Popup new Inquiry ========== */

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('quoteModal');
  
  // Check if modal exists on the page
  if (!modal) {
    console.log('Modal element not found on this page.');
    return;
  }

  const descriptionTextarea = modal.querySelector('.productPage textarea[name="description"]');
  const closeModalButton = modal.querySelector('.close');
  const getQuoteLinks = document.querySelectorAll('.card-more .card-get-link');

  const openModal = () => {
    modal.style.display = 'block';
  };

  const closeModal = () => {
    modal.style.display = 'none';
  };

  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
  }

  getQuoteLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();

      const card = event.target.closest('.prod-slide-card');

      if (!card) {
        console.error('Card element not found.');
        return;
      }

      const cardHeading = card.querySelector('.card-click .card-prod-heading');

      if (!cardHeading) {
        console.error('Card heading element not found.');
        return;
      }

      const cardHeadingContent = cardHeading.innerText.trim();

      if (descriptionTextarea) {
        descriptionTextarea.value = cardHeadingContent;
      }

      openModal();
    });
  });

  window.addEventListener('click', event => {
    if (event.target === modal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
});

/* ========= Lowvoltage Structure cabling popup  ==========  */

document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById("image-modal");
  var body = document.querySelector("body");
  
  if (modal) {
    var modalImg = document.getElementById("modal-image");
    var images = document.querySelectorAll('.low-structure-img img');
    var mediaQuery = window.matchMedia("(max-width: 767px)");
    
    images.forEach(function (img) {
      img.onclick = function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        
        if (mediaQuery.matches) {
          body.style.overflow = "hidden"; // Disable scrolling on body
          window.scrollTo(0, 0); // Scroll to top when modal opens only on small screens
          setTimeout(function () {
            body.style.overflow = "hidden"; // Ensure scrolling is still disabled
          }, 0);
        } else {
          body.style.overflow = "hidden"; // Disable scrolling on body
        }
      };
    });

    var span = document.querySelector(".close");

    if (span) {
      span.addEventListener('click', function () {
        modal.style.display = "none";
        body.style.overflow = "auto"; // Re-enable scrolling on body
      });
    }

    modal.addEventListener('click', function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        body.style.overflow = "auto"; // Re-enable scrolling on body
      }
    });
  }
});


/* ==== Event Close ==== */

// document.addEventListener('DOMContentLoaded', function() {
//   const closeButtons = document.querySelectorAll('.event-close');

//   closeButtons.forEach(function(button) {
//       button.addEventListener('click', function() {
//           this.closest('.event-section').style.display = 'none';

//           const heroSub = document.querySelector('.hero-sub');
//           if (heroSub) {
//               if (window.innerWidth <= 767) {
//                   heroSub.style.padding = '50px 0 0 0';
//               } else {
//                   heroSub.style.padding = '200px 0 0 0';
//               }
//           }
//       });
//   });

//   window.addEventListener('resize', function() {
//       const heroSub = document.querySelector('.hero-sub');
//       if (heroSub) {
//           if (window.innerWidth <= 767) {
//               heroSub.style.padding = '50px 0 0 0';
//           } else {
//               heroSub.style.padding = '200px 0 0 0';
//           }
//       }
//   });
// });


