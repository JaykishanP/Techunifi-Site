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

/* ================== About pagination ==================== */

document.addEventListener('DOMContentLoaded', (function() {
  // Set the number of items per page globally
  var itemsPerPage = 4;

  // Function to display the correct page of news items
  function showPage(pageNumber) {
      // Select all elements with the class 'news-rows' (individual news items)
      var newsSections = document.querySelectorAll('.news-rows');
      var paginationButtons = document.querySelectorAll('.news-pagination button');

      // Loop through all news items to display only those that belong to the current page
      for (var i = 0; i < newsSections.length; i++) {
          if (i < pageNumber * itemsPerPage && i >= (pageNumber - 1) * itemsPerPage) {
              newsSections[i].style.display = 'block'; // Show items within the current page range
          } else {
              newsSections[i].style.display = 'none'; // Hide items outside the current page range
          }
      }

      // Loop through all pagination buttons to remove the 'active' class
      paginationButtons.forEach(function(button) {
          button.classList.remove('active'); // Remove 'active' class from all buttons
      });

      // Add the 'active' class to the clicked button
      paginationButtons[pageNumber - 1].classList.add('active');

      // Scroll to the top of the news section
      document.getElementById('tab2').scrollIntoView({ behavior: 'smooth' });
  }

  // Function to create pagination controls
  function setupPagination() {
      // Select all news items and calculate the number of pages needed
      var newsSections = document.querySelectorAll('.news-rows');
      var numPages = Math.ceil(newsSections.length / itemsPerPage);

      // Get the pagination container and clear any existing content
      var pagination = document.getElementById('news-pagination');
      pagination.innerHTML = '';

      // Create page buttons dynamically
      for (var i = 1; i <= numPages; i++) {
          var button = document.createElement('button');
          button.textContent = i;
          button.addEventListener('click', function() {
              showPage(parseInt(this.textContent)); // Call showPage() with the selected page number
          });
          pagination.appendChild(button);
      }

      // Display the first page by default
      showPage(1);
  }

  // Initialize pagination
  if (document.getElementById('news-pagination')) {
      setupPagination();
  }
})());



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

/* === On Press === */



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

        scrollbar: {
          el: slider.querySelector(".swiper-scrollbar"),
          draggable: true, // Allow users to drag the scrollbar
      },
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

/* ======= Submit a Ticket ======= */
if (window.location.pathname === '/submit.html') {
  $(document).ready(function() {

    function submitgenerateRandomNumbers() {
      var submitnum1 = Math.floor(Math.random() * 10);
      var submitnum2 = Math.floor(Math.random() * 10);
      return [submitnum1, submitnum2];
    }

    function submitupdateMathSumQuestion() {
      var submitrandomNumbers = submitgenerateRandomNumbers();
      var submitnum1 = submitrandomNumbers[0];
      var submitnum2 = submitrandomNumbers[1];
      $('#mathSumQuestion').text('What is ' + submitnum1 + ' + ' + submitnum2 + '?');
      $('#mathSum').data('submitexpectedSum', submitnum1 + submitnum2);
    }
    submitupdateMathSumQuestion();

    function validateSubmitForm() {
      var formValid = true;
      $('#submitTicketForm input, #submitTicketForm select, #submitTicketForm textarea').each(function() {
        if ($(this).hasClass('not-required')) {
          return true;
        }
        if (!$(this).val() || ($(this).is('select[multiple]') && $(this).find('option:selected').length === 0)) {
          formValid = false;
          $(this).css('border-color', 'red');
          $('html, body').animate({
            scrollTop: $(this).offset().top - 160
          }, 500);
          return false;
        } else {
          $(this).css('border-color', 'green');
        }
      });
      var submitmathSumInput = $('#mathSum');
      var submitmathSumValue = submitmathSumInput.val();
      var submitexpectedSum = submitmathSumInput.data('submitexpectedSum');
      if (!submitmathSumValue || parseInt(submitmathSumValue) !== submitexpectedSum) {
        submitmathSumInput.css('border-color', 'red');
        formValid = false;
      } else {
        submitmathSumInput.css('border-color', 'green');
      }
      if (!formValid) {
        return false;
      }
      return true;
    }
    $('#submitTicketForm').submit(function() {
      return validateSubmitForm();
    });
    $('#submitTicketForm').on('reset', function() {
      submitupdateMathSumQuestion();
    });
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
}

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

// document.addEventListener('DOMContentLoaded', () => {
//   const modal = document.getElementById('quoteModal');
 
//   // Check if modal exists on the page
//   if (!modal) {
//     console.log('Modal element not found on this page.');
//     return;
//   }

//   const descriptionTextarea = modal.querySelector('.productPage textarea[name="description"]');
//   const closeModalButton = modal.querySelector('.close');
//   const getQuoteLinks = document.querySelectorAll('.card-more .card-get-link');

//   const openModal = () => {
//     modal.style.display = 'block';
//   };

//   const closeModal = () => {
//     modal.style.display = 'none';
//   };

//   if (closeModalButton) {
//     closeModalButton.addEventListener('click', closeModal);
//   }

//   getQuoteLinks.forEach(link => {
//     link.addEventListener('click', event => {
//       event.preventDefault();

//       const card = event.target.closest('.prod-slide-card');

//       if (!card) {
//         console.error('Card element not found.');
//         return;
//       }

//       const cardHeading = card.querySelector('.card-click .card-prod-heading');

//       if (!cardHeading) {
//         console.error('Card heading element not found.');
//         return;
//       }

//       const cardHeadingContent = cardHeading.innerText.trim();

//       if (descriptionTextarea) {
//         descriptionTextarea.value = cardHeadingContent;
//       }

//       openModal();
//     });
//   });

//   window.addEventListener('click', event => {
//     if (event.target === modal) {
//       closeModal();
//     }
//   });

//   window.addEventListener('keydown', event => {
//     if (event.key === 'Escape') {
//       closeModal();
//     }
//   });
// });

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

/* ===== Change order Modal ===== */

/* ===== Password Modal ===== */
var modal = document.getElementById("passwordModal");
var errorMessage = document.getElementById("brand-error-message");

document.addEventListener("DOMContentLoaded", function() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
});

function validateLogin() {
    var password = document.getElementById("protected-password").value;
    var validPassword = "Change_Order$2024";
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


/* ===== Digital Signature ===== */
// Run this script only on the "change-order.html" page
if (window.location.pathname === "/change-order.html") {
  var canvas = document.getElementById("signature-pad");

  function resizeCanvas() {
      var ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);
  }

  window.onresize = resizeCanvas;
  resizeCanvas();

  var signaturePad = new SignaturePad(canvas, {
      backgroundColor: 'rgb(250,250,250)'
  });

  document.getElementById("clear").addEventListener('click', function() {
      signaturePad.clear();
  });
}


/* ===== Change Order ===== */
// JavaScript for change-order.html

if(window.location.pathname === '/change-order.html'){

  $(document).ready(function () {
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
      $('#mathSum').data('expectedSum', num1 + num2);
    }
 
    updateMathSumQuestion();
 
    // Function to validate the form
    function validateTicketForm() {
      var formValid = true;
 
      // Validate all inputs
      $('#submitTicketForm input, #submitTicketForm checkbox, #submitTicketForm select, #submitTicketForm textarea').each(function () {
        if ($(this).hasClass('not-required')) return true;
 
        if (!$(this).val() || ($(this).is('select[multiple]') && $(this).find('option:selected').length === 0)) {
          formValid = false;
          $(this).css('border-color', 'red');
          $('html, body').animate({ scrollTop: $(this).offset().top - 200 }, 500);
          return false; // Stop validation loop
        } else {
          $(this).css('border-color', 'green');
        }
      });
 
      // Signature validation
      if (signaturePad.isEmpty()) {
        formValid = false;
        alert('Please provide your signature.');
        $('html, body').animate({ scrollTop: $('#signature-pad').offset().top - 200 }, 500);
      }
 
      // Math validation
      var mathSumInput = $('#mathSum');
      var mathSumValue = mathSumInput.val();
      var expectedSum = mathSumInput.data('expectedSum');
      if (!mathSumValue || parseInt(mathSumValue) !== expectedSum) {
        mathSumInput.css('border-color', 'red');
        formValid = false;
      } else {
        mathSumInput.css('border-color', 'green');
      }
 
      // CAPTCHA validation
      var captchaResponse = grecaptcha.getResponse();
      if (!captchaResponse) {
        formValid = false;
        $('.g-recaptcha').css('border-color', 'red');
        alert('Please complete the CAPTCHA');
      } else {
        $('.g-recaptcha').css('border-color', 'green');
      }
 
      return formValid;
    }
 
    // Handle form submission
    $('#submitTicketForm').on('submit', function (event) {
      event.preventDefault(); // Prevent default form submission
 
      if (!validateTicketForm()) {
        console.log('Form validation failed.');
        return; // Stop if validation fails
      }
 
      // Generate the PDF
      try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const pageHeight = doc.internal.pageSize.height || 297; // A4 page height (in mm)
        const pageWidth = doc.internal.pageSize.width || 210; // A4 page width (in mm)
        const headerHeight = 40;
        const footerHeight = 30;
     
        // Function to add the header with logo
        function addHeader(doc) {
          return new Promise((resolve, reject) => {
            const imgUrl = 'https://www.techunifi.com/assets/img/hero-img.png';
            const img = new Image();
            img.src = imgUrl;
     
            img.onload = function () {
              doc.addImage(img, 'PNG', 60, 10, 90, 30); // Adjust x, y, width, height as necessary
              resolve();
            };
     
            img.onerror = function () {
              reject('Image failed to load');
            };
          });
        }
     
        // Function to add the footer with contact details
        function addFooter(doc) {
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.text('2638 Willard Dairy Road, Suite 112 High Point, NC 27265', pageWidth / 2, pageHeight - footerHeight + 10, null, null, 'center');
          doc.text('+1 (336) 860-6061 | techunifi.com | Info@techunifi.com', pageWidth / 2, pageHeight - footerHeight + 20, null, null, 'center');
          doc.setLineWidth(0.5);
          doc.line(10, pageHeight - footerHeight, pageWidth - 10, pageHeight - footerHeight); // x1, y1, x2, y2
        }
     
        // Function to add form data content
      // Function to add form data content
  function addContent(doc, y) {
    const formData = $('#submitTicketForm').serializeArray();
    const filteredFormData = formData.filter(field =>
      field.name !== 'orgId' &&
      field.name !== 'retURL' &&
      field.name !== 'mathSum' &&
      field.name !== '00NUm000009SCKP' &&
      field.name !== 'g-recaptcha-response'
    );
 
    const lineHeight = 10; // Line height for text
    const valueIndent = 90; // Increase indent for values to avoid overlap
    const maxWidth = pageWidth - valueIndent - 10; // Maximum width for text wrapping
 
    filteredFormData.forEach(field => {
      const label = $(`label[for='${field.name}']`).text();
      const value = field.value;
 
      // Check for page break
      if (y + lineHeight > pageHeight - footerHeight - 10) {
        doc.addPage();
        y = headerHeight; // Reset y for the new page
        addHeader(doc); // Add header to the new page
      }
 
      // Exclude specific values
      if (!value.includes('00DHo000002fpJX') && !value.includes('{"keyname":"casev2","fallback":"true","orgId":"00DHo000002fpJX","ts"')) {
        // Set bold font for the label text
        doc.setFont('helvetica', 'bold');
        doc.text(`${label}:`, 10, y); // Print label
       
        // Set regular font for the value
        doc.setFont('helvetica', 'normal');
 
        // Split value text into multiple lines if it's too long
        const valueLines = doc.splitTextToSize(value, maxWidth);
 
        // Print each line of the value
        valueLines.forEach(line => {
          if (y + lineHeight > pageHeight - footerHeight - 10) {
            doc.addPage();
            y = headerHeight; // Reset y for the new page
            addHeader(doc); // Add header to the new page
          }
          doc.text(line, valueIndent, y);
          y += lineHeight; // Move to the next line
        });
      }
    });
 
    return y; // Return updated y position
  }
 
     
        // Function to add Terms and Conditions
        function addTermsAndConditions(doc, y) {
          if (y + 60 > pageHeight - footerHeight - 10) {
            doc.addPage();
            y = headerHeight; // Reset y for the new page
            addHeader(doc); // Add header to the new page
          }
     
          doc.setFontSize(14);
          doc.setFont('helvetica', 'bold'); // Normal font for terms and conditions
          doc.text('Terms and Conditions', 10, y);
          y += 10;
          doc.setFont('helvetica', 'normal'); // Normal font for terms and conditions
          doc.text('1. Total payment due 30 days after completion of work.', 10, y);
          y += 10;
          doc.text('2. Refer to the W.O. # in all correspondence and in your payment.', 10, y);
          y += 10;
          doc.text('3. Please send correspondence regarding this work order to:', 10, y);
          y += 10;
          doc.text('   Suzanne Blair - suzanne.blair@techunifi.com.', 10, y);
          y += 10;
     
          // Add hyperlink to the word "website"
          doc.setTextColor(6, 98, 187); // Set text color to #0662BB
          doc.textWithLink('View full terms and conditions', 10, y, { url: 'https://www.techunifi.com/terms-conditions.html' });
          y += 20; // Space before the signature
     
          return y; // Return updated y position
        }
     
        // Start generating the PDF
        async function generatePDF() {
          let y = headerHeight;
     
          // Add header and wait for image to load
          await addHeader(doc);
     
          y+=25;
 
          // Add form content
          y = addContent(doc, y);
     
          y+=10
          // Add Terms and Conditions
          y = addTermsAndConditions(doc, y);
     
          // Add signature if available
          if (!signaturePad.isEmpty()) {
            const signatureImage = signaturePad.toDataURL();
            if (y + 40 > pageHeight - footerHeight - 10) { // Ensure there's enough space for the signature
              doc.addPage();
              y = headerHeight;
              await addHeader(doc); // Add header to the new page
            }
            doc.addImage(signatureImage, 'PNG', 10, y, 190, 30);
            y += 40; // Adjust space after signature
          }
     
          // Add footer to the last page
          addFooter(doc);
     
          // Save the PDF
          doc.save('techunifi-changeOrder-data.pdf');
          console.log('PDF downloaded successfully.');
        }
     
        // Generate the PDF
        generatePDF();
     
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('An error occurred while generating the PDF. Please try again.');
      }
     
     
     
     
      // Submit the form using the native JavaScript submit method to avoid conflicts
      setTimeout(() => {
        var form = document.getElementById('submitTicketForm');
        if (form && form.tagName === 'FORM') {
          HTMLFormElement.prototype.submit.call(form); // Native form submission
        } else {
          console.error('Form not found or not a valid form element.');
        }
      }, 1000);
    });
 
    // Event listener to update math sum question when the form is reset
    $('#submitTicketForm').on('reset', function () {
      updateMathSumQuestion();
    });
 
    // Event listener to update border color on input changes
    $('#submitTicketForm input, #submitTicketForm select, #submitTicketForm textarea').on('input change blur', function () {
      if (!$(this).hasClass('not-required')) {
        if ($(this).val() || ($(this).is('select[multiple]') && $(this).find('option:selected').length !== 0)) {
          $(this).css('border-color', 'green');
        } else {
          $(this).css('border-color', 'red');
        }
      }
    });
  });

}

/* ======= Textarea ======= */

const textareas = document.querySelectorAll('.numbered-textarea');

textareas.forEach(textarea => {
  textarea.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      const currentText = textarea.value;
      const lines = currentText.split('\n');
      const lastLine = lines[lines.length - 1];
     
      // Use a regular expression to extract the last line number in the format `X)`
      const match = lastLine.match(/^(\d+)\)/);
      const lastNumber = match ? parseInt(match[1]) : 0;
      const nextNumber = lastNumber + 1;

      textarea.value += `\n${nextNumber}) `;
    }
  });
});


/* ====== Site Search Functionality ====== */
// Function to toggle the modal and manage background scrolling
function toggleModal() {
  const modal = document.getElementById('searchModal');
  const isModalOpen = modal.style.display === 'block';

  if (isModalOpen) {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    clearSearch(); // Clear search when modal is closed
  } else {
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
  }
}

// Close the modal if user clicks outside
window.onclick = function (event) {
  const modal = document.getElementById('searchModal');
  if (event.target === modal) {
    toggleModal();
  }
};

// Close the modal with Escape key
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const modal = document.getElementById('searchModal');
    if (modal.style.display === 'block') {
      toggleModal();
    }
  }
});

// Function to clear the search input and results
function clearSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('searchResults').innerHTML = '';
}

// Function to perform search dynamically on the current page content
let searchIndex = [];

// Load the search index
fetch('search-index.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to load search index: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    searchIndex = data;
  })
  .catch(error => console.error('Error fetching search index:', error));

// Function to perform search dynamically using JSON
function performSearch(event) {
  const query = event.target.value.toLowerCase();
  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = ''; // Clear previous results

  if (query) {
    const results = searchIndex.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query)
    );

    if (results.length > 0) {
      searchResults.innerHTML = results
        .map(result => `
          <li>
            <a href="${result.url}" target="_blank">
              <strong>${result.title}</strong><br>
              <span>${highlightQuery(result.content, query)}</span>
            </a>
          </li>
        `)
        .join('');
    } else {
      searchResults.innerHTML = `<li>No results found. <a href="https://www.techunifi.com/new-inquiry.html" style="text-decoration:underline; font-weight:600; margin-left:5px;">Contact Here</a> </li>`;
    }
  }
}

// Function to highlight matched query in results
function highlightQuery(text, query) {
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

// Debounce function
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Attach debounced event listener to the search input
const searchInput = document.getElementById('searchInput');
const debouncedPerformSearch = debounce(performSearch, 300);
searchInput.addEventListener('input', debouncedPerformSearch);


/* =========== Chat bot  ============= */


const predefinedQA = {

  "services": "Techunifi provides services like structured cabling, telecom solutions, security systems, network solutions, audio & video installations, lighting design, energy solutions, and IT solutions. Learn more: [Techunifi Services](https://www.techunifi.com/#landing-services)",

  "process": "Our process includes Design, Construction, Install, Go Live, and Operations phases to ensure seamless service delivery. Learn more: [Our Process](https://www.techunifi.com/#how-it-works)",

  "clients": "Yes! Some of our clients include Marriott, Sheraton, Hyatt, and Aloft hotels across various locations. See more: [Our Clients](https://www.techunifi.com/about.html?tab=clientList)",

  "products": "We provide Network Solutions, Audio & Video equipment, and Energy Management technologies. Check them here: [Techunifi Products](https://www.techunifi.com/products.html)",

  "contact": "You can reach us through the 'Contact Us' page on our website: [Contact Us](https://www.techunifi.com/new-inquiry.html)",

  "location": "Techunifi is based in High Point, NC. Visit us: [Our Location](https://www.techunifi.com/#footers)",

  "audio": "Our AV Design Team provides distributed audio, conference room setups, and digital signage solutions. Explore here: [Audio & Video Solutions](https://www.techunifi.com/solutions)",
  "home": "Welcome to TechUnifi. Explore our products and services. [Home](https://www.techunifi.com)",
  "about": "Learn more about TechUnifi and our mission to innovate. [About Us](https://www.techunifi.com/about.html)",
  "home": "Welcome to TechUnifi. Explore our products and services. [Home](https://www.techunifi.com/index.html)",
  "about_us": "Learn more about TechUnifi and our mission to innovate. Client, Clients, ClientList [About Us](https://www.techunifi.com/about.html)",
  "services": "Low Voltage, Telecom, Security, Auido-Video, Network, Wifi, Lighting, Energy, It Solutions,WIFI [Services](https://www.techunifi.com/#landing-services)",
  "news": "News, Latest News, New Changes [News](https://www.techunifi.com/about.html?tab=news)",
  "aahoacon": "aahoacon25, AAHOACON25, Aahoacon25 [aahoacon25, AAHOACON25, Aahoacon25](https://www.techunifi.com/aahoacon25.html)",
  "hotel_accomodation": "Hilton, Sheraton, Marriott, Home Suites, Home2 Suites, Homewood, Holiday Inn, Hampton, Best Westren, Courtyard Inn, Hyatt House, Country Inn, Tru, Spark, Fairfield Inn Marriott, Courtyard by Marriot, HITEC, Springhill Suites, Walk-a-thon(Baps Charity), New Port Beach Resort, AAHOACON 24, Dual Brand Hilton, Premier Petroleum Hospitality, Brew Pointe Cafe [Hotel, Accomodation](https://www.techunifi.com/about.html?tab=news>)",
  "product": "Product description. Brands, Innovative solutions for your business. [Product](https://www.techunifi.com/products.html)",
  "submit_a_ticket": "Ticket Form, Service Ticket [Submit A Ticket](https://www.techunifi.com/submit.html)",
  "new_inquiry": "Are you a new client? Let's get in touch! We want to learn about your business and understand how Techunifi can best support you. After you fill out the form, an inquiry will be opened, and a Techunifi representative will reach out to you. [New Inquiry](https://www.techunifi.com/new-inquiry.html)",
  "change_order": "Product description. Innovative solutions for your business. [Change Order](https://www.techunifi.com/change-order.html)",
  "timesheet": "Timesheet, Work Hours, Log Time [Timesheet](https://www.techunifi.com/Excel/timesheet.html)",
  "timesheet_spanish": "Timesheet, Work Hours, Log Time [Timesheet Spanish](https://www.techunifi.com/Excel/timesheet-spanish.html)",
  "terms_and_conditions": "Terms, Conditions, Policy, CopyRight [Terms and Conditions](https://www.techunifi.com/terms-conditions.html)",
  "brands": "Introducing Techunifi: a brand built on the pillars of reliability, sustainability, and support. Our identity is a reflection of these values, guiding everything we do. With a focus on forging enduring connections, we offer solutions that not only meet but exceed expectations. Committed to sustainability, we strive to minimize our environmental impact while maximizing the effectiveness of our innovations. Our sleek and modern aesthetic mirrors our dedication to simplicity and sophistication, ensuring that our brand remains both contemporary and refined. From cutting-edge technology to unparalleled customer support, Techunifi is here to navigate the digital landscape alongside you, where connectivity is reliable and assistance is always at hand. [Brands](https://www.techunifi.com/brands.html)",
  "contact_us": "Contact, Connect [Contact Us](https://www.techunifi.com/new-inquiry.html)",
  "standard": "Site Standard [Standard](https://www.techunifi.com/standard.html)",
  "take_off": "Take Off [Take-Off](https://www.techunifi.com/takeoff.html)",
  "how_it_works": "Design, Construction, Install, Go Live, Operations [How It Works](https://www.techunifi.com/#how-it-works)",
  "login_profile": "Login, EbizCharge [Login, Profile](https://connect.ebizcharge.net/(S(m0bznjppezsmujzremg1hx3y))/EbizLogin.aspx?ReturnUrl=%2fTechunifi)",
  "icc": "Provider of innovative connectivity solutions for networking infrastructure. [ICC](https://www.techunifi.com/products.html?section=low-Voltage)",
  "legrand": "Leading global specialist in electrical and digital building infrastructures. [Legrand](https://www.techunifi.com/products.html?section=low-Voltage)",
  "leviton": "Trusted manufacturer of electrical wiring devices, lighting controls, and network solutions. [Leviton](https://www.techunifi.com/products.html?section=low-Voltage)",
  "c2g": "Supplier of high-quality connectivity solutions for audio/video, PC, and data networking applications. [C2G](https://www.techunifi.com/products.html?section=low-Voltage)",
  "panduit": "Innovator in network infrastructure and industrial electrical solutions. [Panduit](https://www.techunifi.com/products.html?section=low-Voltage)",
  "corning": "Leading provider of optical communications and glass solutions. [Corning](https://www.techunifi.com/products.html?section=low-Voltage)",
  "commscope": "Global leader in network infrastructure solutions for connectivity. [CommScope](https://www.techunifi.com/products.html?section=low-Voltage)",
  "chatsworth_products": "Manufacturer of IT infrastructure and cable management solutions. [Chatsworth Products](https://www.techunifi.com/products.html?section=low-Voltage)",
  "arlington": "Provider of electrical and communication products for construction. [Arlington](https://www.techunifi.com/products.html?section=low-Voltage)",
  "structured_cabling": "Structured cabling is the backbone of your IT infrastructure, providing a standardized method for managing and connecting all your network devices, from data centers to office floors. [Structured Cabling](https://www.techunifi.com/products.html?section=low-Voltage>)",
  "bittel": "Smart home automation and IoT solutions [Bittel](https://www.techunifi.com/products.html?section=telecom)",
  "yealink": "Unified communication solutions [Yealink](https://www.techunifi.com/products.html?section=telecom)",
  "mitel": "Business communications (cloud and on-premise) [Mitel](https://www.techunifi.com/products.html?section=telecom)",
  "polycomm": "Communication and collaboration solutions [Polycomm](https://www.techunifi.com/products.html?section=telecom)",
  "comxchange": "Communication and collaboration platforms [ComXchange](https://www.techunifi.com/products.html?section=telecom)",
  "grandstream": "IP voice and video telephony solutions [Grandstream](https://www.techunifi.com/products.html?section=telecom)",
  "wind_stream": "Network communications and technology solutions [Wind Stream](https://www.techunifi.com/products.html?section=telecom)",
  "phone_suite": "Hotel communication and guest management [Phone Suite](https://www.techunifi.com/products.html?section=telecom)",
  "tigertms": "Hospitality communication solutions [TigerTMS](https://www.techunifi.com/products.html?section=telecom)",
  "vsr_cloud_communications": "Cloud-based communication solutions [VSR Cloud Communications](https://www.techunifi.com/products.html?section=telecom)",
  "telecom___cordless_phones_corded_phones_clocks": "Cordless Phones, Corded Phones, Clocks, cloud telephone systems(PBX), VIOP, SIP & ISP Solutions [Telecom - Cordless Phones, Corded Phones, Clocks](https://www.techunifi.com/products.html?section=telecom)",
  "cordless_phones": "Neo Cordless - Analog, SIP, 77 DECT MINI, 77 DECT MINI SIP, 77 DECT MINI PLUS, 77 DECT MINI PLUS SIP [Cordless Phones](https://www.techunifi.com/products.html?section=telecom)",
  "corded_phones": "77 Slim, 77 Slim SIP, 62 Neo Corded - Analog, 62 Neo Corded - SIP, Neo C2 Analog [Corded Phones](https://www.techunifi.com/products.html?section=telecom)",
  "clocks": "C1 mini, Qi, HC1 Pro Clock, HC2 Pro Clock, D8 Clock, HS1-PD Clock [Clocks](https://www.techunifi.com/products.html?section=telecom)",
  "hikvision": "Leading provider of innovative video surveillance products and solutions. [Hikvision](https://www.techunifi.com/products.html?section=security)",
  "dahua": "Manufacturer of high-performance security and surveillance equipment. [Dahua](https://www.techunifi.com/products.html?section=security)",
  "salient": "Provider of enterprise video surveillance management systems. [Salient](https://www.techunifi.com/products.html?section=security)",
  "ring": "Developer of open-platform software, hardware, and cloud-based services for security. [Ring](https://www.techunifi.com/products.html?section=security)",
  "hanwha_vision": "Supplier of advanced video surveillance solutions. [Hanwha Vision](https://www.techunifi.com/products.html?section=security)",
  "lts": "Supplier of advanced video surveillance equipments. [LTS](https://www.techunifi.com/products.html?section=security)",
  "digital_watchdog": "Manufacturer of high performance video surveillance [Digital Watchdog](https://www.techunifi.com/products.html?section=security)",
  "security": "IP Cameras, Specialty Cameras(MEGApix\u00ae\u00a0IP Cameras), LPR Cameras, Firewalls [Security](https://www.techunifi.com/products.html?section=security)",
  "ip_cameras": "Luma\u2122 X20 4MP IP PTZ Camera With 4X Optical Zoom and Active Deterrence - Black, Digital Watchdog MegaPix\u00ae 2.1MP PTZ IP Camera, Luma Surveillance\u2122 820 Series 8MP Dome IP Outdoor Motorized Camera | Black, Luma Surveillance\u2122 820 Series 8MP Bullet IP Outdoor Camera | Black, Luma Surveillance\u2122 110 Series Bullet IP Outdoor Camera | White [IP Cameras](https://www.techunifi.com/products.html?section=security)",
  "specialty_cameras": "Digital Watchdog MegaPix\u00ae 5MP IVA+ Vandal Turret IP Camera, Digital Watchdog MegaPix\u00ae 2.1MP PTZ IP Camera, Digital Watchdog MegaPix\u00ae 8MP Ultra Wide Bullet IP Camera [Specialty Cameras](https://www.techunifi.com/products.html?section=security)",
  "lpr_cameras": "4 MP ColorVu DeepinView Varifocal Dome Network Camera, 8 MP DeepinView Multi-sensor (TandemVu) Bullet Camera, 4 MP LPR IR Varifocal Bullet Network Camera, IDS-2CD7046G0/EP-IHSY 11-40MM [LPR Cameras](https://www.techunifi.com/products.html?section=security)",
  "jbl": "Renowned manufacturer of high-quality audio equipment. [JBL](https://www.techunifi.com/products.html?section=audio-video)",
  "kramer": "Provider of innovative audio, video, and computer signal processing solutions. [Kramer](https://www.techunifi.com/products.html?section=audio-video)",
  "bose": "Leader in premium audio solutions for professional and personal use. [Bose](https://www.techunifi.com/products.html?section=audio-video)",
  "crown_harman": "Manufacturer of professional audio amplifiers and related equipment. [Crown Harman](https://www.techunifi.com/products.html?section=audio-video)",
  "draper": "Supplier of projection screens and audiovisual equipment. [Draper](https://www.techunifi.com/products.html?section=audio-video)",
  "harman": "Designer and engineer of connected products and solutions for automakers, consumers, and enterprises. [Harman](https://www.techunifi.com/products.html?section=audio-video)",
  "yamaha": "Manufacturer of a wide range of audio products and musical instruments. [Yamaha](https://www.techunifi.com/products.html?section=audio-video)",
  "sonos": "Developer of wireless home sound systems. [Sonos](https://www.techunifi.com/products.html?section=audio-video)",
  "jvc": "Producer of audio and video equipment, including projectors and cameras. [JVC](https://www.techunifi.com/products.html?section=audio-video)",
  "samsung": "Global leader in consumer electronics and digital media technologies. [Samsung](https://www.techunifi.com/products.html?section=audio-video)",
  "atlona": "Provider of AV and IT distribution and connectivity solutions. [Atlona](https://www.techunifi.com/products.html?section=audio-video)",
  "rti": "Manufacturer of control and automation systems for residential and commercial applications. [RTI](https://www.techunifi.com/products.html?section=audio-video)",
  // "lg": "Innovator in consumer electronics, appliances, and mobile communications. [LG](https://www.techunifi.com/products.html?section=audio-video)",
  "audio___video": "Distributed Audio, Conference Room Solutions, Digital Signage, Pro AV [Audio - Video](https://www.techunifi.com/products.html?section=audio-video)",
  "ev_passport": "Provider of electric vehicle charging solutions. [EV Passport](https://www.techunifi.com/products.html?section=energy)",
  "honeywell": "Manufacturer of a wide range of consumer products, engineering services, and aerospace systems. [Honeywell](https://www.techunifi.com/products.html?section=energy)",
  "verdant": "Supplier of energy management solutions for the hospitality industry. [Verdant](https://www.techunifi.com/products.html?section=energy)",
  "lutron": "Leader in lighting control solutions and automated shading systems. [Lutron](https://www.techunifi.com/products.html?section=energy)",
  "blink": "Provider of wireless home security cameras and monitoring systems. [Blink](https://www.techunifi.com/products.html?section=energy)",
  "energy": "Smart Thermostats, EV chargers, eSaaS [Energy](https://www.techunifi.com/products.html?section=energy)",
  "smart_thermostats": "T6 PRO PROGRAMMABLE THERMOSTAT UP TO 3 HEAT/2 COOL, T6 PRO SMART THERMOSTAT MULTI-STAGE 3 HEAT/2 COOL [Smart Thermostats](https://www.techunifi.com/products.html?section=energy)",
  "ev_chargers": "ROSA, LLOYD, LILY, Series 8 Level 2 EV Charging Station, Series 9 - 30kW DC Fast Charging Station [EV chargers](https://www.techunifi.com/products.html?section=energy)",
  "aruba": "Provider of secure networking solutions for enterprises. [Aruba](https://www.techunifi.com/products.html?section=wifi)",
  "dell": "Global technology company offering a wide range of computing products and services. [Dell](https://www.techunifi.com/products.html?section=wifi)",
  "microsoft": "Leading developer of software, hardware, and cloud services. [Microsoft](https://www.techunifi.com/products.html?section=wifi)",
  "lenovo": "Multinational technology company specializing in personal computers and related devices. [Lenovo](https://www.techunifi.com/products.html?section=wifi)",
  // "hp": "Provider of a wide range of hardware and software services for consumers and businesses. [HP](https://www.techunifi.com/products.html?section=wifi)",
  "ekahau": "Developer of Wi-Fi design and troubleshooting solutions. [Ekahau](https://www.techunifi.com/products.html?section=wifi)",
  "ubiquiti": "Manufacturer of wireless data communication and wired products for enterprises and homes. [Ubiquiti](https://www.techunifi.com/products.html?section=wifi)",
  "ionos": "Provider of web hosting and cloud services. [IONOS](https://www.techunifi.com/products.html?section=other-info>)",
  "it_management": "Cloud, Network Management, IT Partner, Firewalls [IT Management](https://www.techunifi.com/products.html?section=other-info>)",
  "wattbox": "Provider of web hosting and cloud services. [Wattbox](https://www.techunifi.com/products.html?section=wifi)",
  "ovrc": "Provider of web hosting and cloud services. [OVrC](https://www.techunifi.com/products.html?section=wifi)",
  "tejas_networks": "Provider of web hosting and cloud services. [Tejas Networks](https://www.techunifi.com/products.html?section=wifi)",
  "tp_link": "Provider of web hosting and cloud services. [TP-Link](https://www.techunifi.com/products.html?section=wifi)",
  "omada": "Provider of web hosting and cloud services. [Omada](https://www.techunifi.com/products.html?section=wifi)",
  "logitech": "Provider of web hosting and cloud services. [Logitech](https://www.techunifi.com/products.html?section=wifi)",
  "fortinet": "Provider of web hosting and cloud services. [Fortinet](https://www.techunifi.com/products.html?section=wifi)",
  "email": "Address, Location, Call, Social Links, Email, Facebook, Instagram, Youtube, LinkedIn, X(Twitter), Pinterest. [Details](https://www.techunifi.com#footers)",
  "Hi":"Hi, I'm the chatbot. How can I help you today? Would you like to know more about our [services](https://www.techunifi.com/#landing-services), [products](https://www.techunifi.com/products.html), or [inquire](https://www.techunifi.com/new-inquiry.html) about your needs?"

};


const synonyms = {
  "home": ["landing page", "main"],
  "about": ["company", "mission", "who we are"],
  "services": ["service", "offerings", "solutions"],
  "news": ["latest updates", "announcements", "press"],
  "aahoacon": ["aahoacon", "aahoa event", "aahoa"],
  "hotel_accommodation": ["hotels", "lodging", "resorts"],
  "product": ["products", "items", "solutions"],
  "submit_ticket": ["support request", "help ticket", "issue report"],
  "new_inquiry": ["contact", "reach out", "get in touch"],
  "change_order": ["modification request", "order update"],
  "timesheet": ["work log", "attendance", "hours logged"],
  "timesheet_spanish": ["spanish work log", "horas registradas"],
  "terms_conditions": ["policies", "rules", "agreements"],
  "brands": ["company brands", "brand partners"],
  "contact_us": ["reach out", "support", "inquiry"],
  "footer": ["site footer", "contact info", "social links"],
  "standard": ["guidelines", "rules", "site standard"],
  "takeoff": ["planning", "estimation"],
  "how_it_works": ["steps", "procedure", "process"],
  "login_profile": ["sign in", "account access", "user profile"],
  "structured_cabling": ["network wiring", "cable management"],
  "telecom": ["telecommunication", "voice systems"],
  "security": ["surveillance", "monitoring", "cctv"],
  "audio_video": ["av", "multimedia", "entertainment"],
  "energy": ["power", "electricity", "green tech"],
  "wifi": ["wireless", "network", "internet"],
  "contact": ["reach", "inquiry", "support"],
  "location": ["address", "place", "venue"],
  "audio": ["sound", "speakers", "av"],
  "Hi": ["hi", "hello", "Hello", "Hey", "Help", "help", "Morning", "Evening", "Afternoon"],
  "email": ["call", "phone", "number", "mail", "location", "address", "pincode", "social","media", "instagram", "linkedin", "facebook", "youtube", "pinterest"]
};

document.addEventListener("DOMContentLoaded", () => {
  clearChatIfNewDay(); // Clear chat history if it's a new day
  loadChatMessages();  // Load previous messages (if any)
});

function toggleChat() {
  const chatPopup = document.getElementById("chatPopup");

  if (chatPopup.style.display === "none" || chatPopup.style.display === "") {
    chatPopup.style.display = "flex";

    loadChatMessages(); // Load messages when chat opens

    const lastInteractionDate = localStorage.getItem("lastInteractionDate");
    const today = new Date().toLocaleDateString();

    // Show greeting message only once per day
    if (!lastInteractionDate || lastInteractionDate !== today) {
      localStorage.setItem("lastInteractionDate", today);
     
      // Check if chat is empty and add greeting
      if (!localStorage.getItem("chatMessages")) {
        const greetingMessage =
          "Hi, I'm the chatbot. How can I help you today? Would you like to know more about our [services](https://www.techunifi.com/#landing-services), [products](https://www.techunifi.com/products.html), or [inquire](https://www.techunifi.com/new-inquiry.html) about your needs?";
        addMessage(greetingMessage, "bot");
      }
    }
  } else {
    chatPopup.style.display = "none";
  }
}

function sendMessage() {
  const userInput = document.getElementById("userInput").value.trim();
  if (!userInput) return;

  addMessage(userInput, "user");
  document.getElementById("userInput").value = "";

  const response = getBotResponse(userInput.toLowerCase());
  addMessage(response, "bot");
}

function getBotResponse(userInput) {
  for (const key in predefinedQA) {
    if (userInput.includes(key) || userInput.includes(key.slice(0, -1))) {
      return predefinedQA[key];
    }
    if (synonyms[key] && synonyms[key].some((syn) => userInput.includes(syn))) {
      return predefinedQA[key];
    }
  }
  return "Sorry, I don't have an exact answer for that. Please visit our website for more details: <a href='https://www.techunifi.com/' target='_blank'>Techunifi</a>";
}

function addMessage(text, sender) {
  const chatbox = document.getElementById("chatbox");

  const messageDiv = document.createElement("div");
  messageDiv.classList.add("chat-bubble", sender);

  if (sender === "bot") {
    messageDiv.innerHTML = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
  } else {
    messageDiv.textContent = text;
  }

  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;

  saveChatMessages(); // Save chat history
}

function saveChatMessages() {
  const chatMessages = document.getElementById("chatbox").innerHTML;
  localStorage.setItem("chatMessages", chatMessages);
}

function loadChatMessages() {
  const storedMessages = localStorage.getItem("chatMessages");
  if (storedMessages) {
    document.getElementById("chatbox").innerHTML = storedMessages;
  }
}

function clearChatIfNewDay() {
  const lastInteractionDate = localStorage.getItem("lastInteractionDate");
  const today = new Date().toLocaleDateString();

  if (lastInteractionDate !== today) {
    localStorage.removeItem("chatMessages");
    localStorage.setItem("lastInteractionDate", today);
  }
}


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


