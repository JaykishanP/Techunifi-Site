document.addEventListener('DOMContentLoaded', function () {
    // Form element
    const inquiryForm = document.getElementById('myInquiryForm');
    const modal = document.getElementById('quoteModal');
    const thankYouMessage = document.querySelector('.quote-thanku');
    const closeModalButton = document.querySelector('.close');
  
    // Get CAPTCHA elements
    const captchaCanvas = document.getElementById('captcha');
    const captchaTextBox = document.getElementById('textBox');
    const captchaOutput = document.getElementById('output');
  
    // Generate CAPTCHA
    function generateCaptcha() {
      const ctx = captchaCanvas.getContext('2d');
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const captchaLength = 6;
      let captcha = '';
      for (let i = 0; i < captchaLength; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      captchaOutput.textContent = captcha;
      ctx.clearRect(0, 0, captchaCanvas.width, captchaCanvas.height);
      ctx.font = '30px Arial';
      ctx.fillText(captcha, 10, 40);
    }
  
    generateCaptcha(); // Initial CAPTCHA generation
  
    // Refresh CAPTCHA
    document.getElementById('refreshIcon').addEventListener('click', generateCaptcha);
  
    // Validate CAPTCHA
    function validateCaptcha() {
      return captchaTextBox.value.trim() === captchaOutput.textContent;
    }
  
    // Close modal function
    function closeModal() {
      modal.style.display = 'none'; // Hide the modal
    }
  
    // Close modal when clicking on the close button
    closeModalButton.addEventListener('click', closeModal);
  
    // Handle form submission
    window.handleFormSubmit = function (e) {
      e.preventDefault(); // Prevent default form submission
  
      // Validate CAPTCHA
      if (!validateCaptcha()) {
        alert('Incorrect CAPTCHA. Please try again.');
        generateCaptcha(); // Regenerate CAPTCHA
        return;
      }
  
      // Validate required fields
      const company = document.getElementById('company').value.trim();
      const firstName = document.getElementById('first_name').value.trim();
      const lastName = document.getElementById('last_name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
  
      let isValid = true;
      let errorMessage = '';
  
      // Company, First Name, Last Name, and Email are required
      if (!company || !firstName || !lastName || !email) {
        errorMessage += 'Please fill out all required fields.\n';
        isValid = false;
      }
  
      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        errorMessage += 'Please enter a valid email address.\n';
        isValid = false;
      }
  
      // Phone number validation (simple)
      const phonePattern = /^[\d\s\+\-\(\)]+$/;
      if (phone && !phonePattern.test(phone)) {
        errorMessage += 'Please enter a valid phone number.\n';
        isValid = false;
      }
  
      if (!isValid) {
        alert(errorMessage);
        return;
      }
  
      // Submit the form to the hidden iframe
      inquiryForm.submit();
  
      // Simulate success response and handle UI changes
      setTimeout(function () {
        closeModal(); // Close the modal
        thankYouMessage.style.display = 'block'; // Show the success message
        alert('Thank you! Your inquiry has been submitted successfully.'); // Show the thank you alert
        inquiryForm.reset(); // Optionally reset the form fields
        generateCaptcha(); // Generate a new CAPTCHA for future use
      }, 500);
    };
  });
  