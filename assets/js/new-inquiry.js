let captchaText = document.getElementById('captcha');
let ctx = captchaText.getContext("2d");
ctx.font = "35px Raleway";
ctx.fillStyle = "#eb6d47";


let userText = document.getElementById('textBox');
let output = document.getElementById('output');
let refreshIcon = document.getElementById('refreshIcon');
let captchaStr = "";

let alphaNums = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

function generate_captcha() {
    let emptyArr = [];
    for (let i = 1; i <= 7; i++) {
        emptyArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
    }
    captchaStr = emptyArr.join('');
    ctx.clearRect(0, 0, captchaText.width, captchaText.height);
    ctx.fillText(captchaStr, captchaText.width / 9, captchaText.height / 2);
}

generate_captcha();

refreshIcon.onclick = function() {
    generate_captcha();
    userText.value = "";
    output.innerHTML = "";
};

// Math Sum Validation
function inquirygenerateRandomNumbers() {
var inquirynum1 = Math.floor(Math.random() * 10);
var inquirynum2 = Math.floor(Math.random() * 10);
return [inquirynum1, inquirynum2];
}

// Function to update the math sum question with new numbers
function inquiryupdateMathSumQuestion() {
var inquiryrandomNumbers = inquirygenerateRandomNumbers();
var inquirynum1 = inquiryrandomNumbers[0];
var inquirynum2 = inquiryrandomNumbers[1];

// Update the question text
$('#inquirymathSumQuestion').text('What is ' + inquirynum1 + ' + ' + inquirynum2 + '?');

// Store the expected sum in a data attribute for validation
$('#inquirymathSum').data('inquiryexpectedSum', inquirynum1 + inquirynum2);
}

// Call the function to update the math sum question when the document is ready
inquiryupdateMathSumQuestion();


// Form Validation
function validateInquiryForm() {
    var formValid = true;

    $('#myInquiryForm input, #myInquiryForm select, #myInquiryForm textarea').each(function() {
        if ($(this).hasClass('not-required')) {
            return true;
        }

        if (!$(this).val() || ($(this).is('select[multiple]') && $(this).find('option:selected').length === 0)) {
            formValid = false;
            $(this).css('border-color', 'red');
            $('html, body').animate({
                scrollTop: $(this).offset().top - 160 // Adjust the offset to ensure the field is visible
            }, 500);
            return false;
        } else {
            $(this).css('border-color', 'green');
        }
    });

    // Validate math sum question
    var inquirymathSumInput = $('#inquirymathSum'); 
    var inquirymathSumValue = inquirymathSumInput.val();
    var inquiryexpectedSum = inquirymathSumInput.data('inquiryexpectedSum'); 
    if (!inquirymathSumValue || parseInt(inquirymathSumValue) !== inquiryexpectedSum) {
        inquirymathSumInput.css('border-color', 'red');
        formValid = false;
    } else {
        inquirymathSumInput.css('border-color', 'green');
    }

    // Validate captcha
    if (userText.value !== captchaStr) {
        output.style.color = "red";
        output.innerHTML = "Incorrect Captcha!";
        formValid = false;
    } else {
        output.innerHTML = "Correct!";
    }

    if (!formValid) {
        return false;
    }
    return true; 
}

$('#myInquiryForm').submit(function() {
    return validateInquiryForm();
});

// Event listener to update math sum question when the form is reset
$('#myInquiryForm').on('reset', function() {
    inquiryupdateMathSumQuestion();
    generate_captcha();
});

// Dynamic input border color change based on input, change, and blur events
$('#myInquiryForm input, #myInquiryForm select, #myInquiryForm textarea').on('input change blur', function() {
    if (!$(this).hasClass('not-required')) {
        if ($(this).val() || ($(this).is('select[multiple]') && $(this).find('option:selected').length !== 0)) {
            $(this).css('border-color', 'green');
        } else {
            $(this).css('border-color', 'red');
        }
    }
});
