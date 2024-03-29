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
    let header = select('#header');
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


// Services

// $(".menu-bar > li").click (function () {
//   $ (".menu").css('display', 'none');
// });

// $(".nav-end,").click (function () {
//   $ (".menu").css('display', 'block');
// });


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


//scroll to top on tab click
$('.tablinks, .prod-tablinks').click(function(event) {
  event.preventDefault();

  $('html,body').animate({scrollTop:0}, 400); 
});


/* ====== Product ======*/
//Product - Tabs

function openProd(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("product-tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("prod-tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
// document.getElementById("productOpen").click();

document.addEventListener('DOMContentLoaded', function() {
  var productOpenButton = document.getElementById("productOpen");
  if (productOpenButton) {
    productOpenButton.click();
  } else {
      // console.error("Element with ID 'defaultOpen' not found.");
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
new Swiper('.home-clients-slider', {
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
      spaceBetween: 60
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 80
    },
    992: {
      slidesPerView: 3,
      centeredSlides: true,
      spaceBetween: 40,
      slidesOffsetBefore: -40,
      slidesOffsetAfter: -40
    }
  }
});


/* ======== Products Slider ========== */

// Get all elements with the class '.js-slider'
const sliders = document.querySelectorAll(".js-slider");

// Iterate over each slider element
sliders.forEach(function(slider) {
    new Swiper(slider, {
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
    });
});



/* ======== new Inquiry ======== */
document.addEventListener('DOMContentLoaded', function() {
  // Function to activate the "New Inquiry" tab and display its content
  function activateNewInquiryTab() {
      var newInquiryTabContent = document.getElementById("sub-tab1");
      var newInquiryTabLink = document.getElementById("sub-defaultOpen");

      // Display "New Inquiry" tab content
      if (newInquiryTabContent) {
          newInquiryTabContent.style.display = "block";
      }

      // Remove "active" class from all tab links
      var tabLinks = document.getElementsByClassName("sub-tablinks");
      for (var i = 0; i < tabLinks.length; i++) {
          tabLinks[i].classList.remove("active");
      }

      // Add "active" class to "New Inquiry" tab link
      if (newInquiryTabLink) {
          newInquiryTabLink.classList.add("active");
      }

      // Activate the "New Inquiry" button
      var newInquiryButton = document.getElementById("newInquiryButton");
      if (newInquiryButton) {
          newInquiryButton.classList.add("active");
      }

      // Remove "active" class from the "Submit a Ticket" button
      var submitTicketButton = document.getElementById("sub-defaultOpen");
      if (submitTicketButton) {
          submitTicketButton.classList.remove("active");
      }

      // Hide other tab contents
      var otherTabs = document.getElementsByClassName("sub-tabcontent");
      for (var i = 0; i < otherTabs.length; i++) {
          if (otherTabs[i].id !== "sub-tab1") {
              otherTabs[i].style.display = "none";
          }
      }
  }

  // Check if the URL contains "?activeTab=newInquiry"
  if (window.location.href.indexOf("?activeTab=newInquiry") > -1) {
      // Activate the "New Inquiry" tab and button
      activateNewInquiryTab();
  }
});


/* ====== Leftnav highlight on scroll ======= */
document.addEventListener("DOMContentLoaded", function() {
  const tabLinks = document.querySelectorAll(".left-right .tab a");
  
  window.addEventListener("scroll", function() {
    const sections = document.querySelectorAll(".right-content .id-div");
    const scrollPosition = window.scrollY || window.pageYOffset;
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      
      if (rect.top <= 0 && rect.bottom > 0) {
        const id = section.getAttribute("id");
        tabLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const tabLinks = document.querySelectorAll(".left-right .tab a");
  
  tabLinks.forEach(link => {
    link.addEventListener("click", function(event) {
      
      // Remove the "active" class from all links
      tabLinks.forEach(link => {
        link.classList.remove("active");
      });
      
      // Add the "active" class to the clicked link
      this.classList.add("active");
    });
  });
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


/* ======== Footer Subscribe ========= */

document.querySelector(".email-subscribe").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  var userEmail = document.getElementById("form-email").value.trim(); // Trimmed email value

  console.log("Email:", userEmail); // Log the email value for debugging

  if (userEmail) {
    var url = "https://script.google.com/macros/s/AKfycbxzU0gAEI2KclMR2zjAynv7jpPVwi9jDA_9ZXZKSFdelBwL9w3lHFh4j6yVqVZO66Mt/exec"; // URL of the Google Apps Script endpoint
    subscribe(userEmail, url); // Call the subscribe function with email and url
  } else {
    alert("Please enter an email address"); // If email is not provided, show an alert
  }
});

function subscribe(userEmail, url) {
  var formData = new FormData(); // Create a new FormData object
  formData.append("email", userEmail); // Append the email to the FormData object

  fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(data => {
    alert(data);
    document.querySelector(".email-subscribe").reset();
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    alert("An error occurred. Please try again later.");
  });
}
