// script.js

// Function to redirect to the sign-up page
function redirectToSignUp(event) {
  event.preventDefault(); // Prevent default action
  window.location.href = 'sign-up.html'; // Change to your actual sign-up page URL
}

// Function to redirect to the sign-in page
function redirectToSignIn(event) {
  event.preventDefault(); // Prevent default action
  window.location.href = 'sign-in.html'; // Change to your actual sign-in page URL
}

// Add event listeners to buttons after the document has loaded
document.addEventListener('DOMContentLoaded', function() {
  const signUpButton = document.querySelector('.sign-up-button-C61RwL');
  const signInButton = document.querySelector('.sign-in-button-C61RwL');

  if (signUpButton) {
      signUpButton.addEventListener('click', redirectToSignUp);
  }

  if (signInButton) {
      signInButton.addEventListener('click', redirectToSignIn);
  }
});