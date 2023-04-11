// Get the form element
const form = document.querySelector("form");

// Get the input elements
const usernameInput = document.querySelector("#username");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");

// Get the error elements
const usernameError = document.querySelector("#username-error");
const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");
const confirmPasswordError = document.querySelector("#confirm-password-error");

function checkValidity(input, error) {
  if (input.validity.valueMissing && input === document.activeElement) {
    error.textContent = "Please fill out this field.";
    input.classList.add("error");
    return false;
  }

  if (input.validity.typeMismatch && input === document.activeElement) {
    error.textContent = "Please enter a valid email address.";
    input.classList.add("error");
    return false;
  }

  if (input.validity.tooShort && input === document.activeElement) {
    error.textContent = `Username must be at least ${input.minLength} characters long.`;
    input.classList.add("error");
    return false;
  }

  error.textContent = "";
  input.classList.remove("error");
  return true;
}

// Define the checkPasswords function
function checkPasswords() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (password !== confirmPassword) {
    passwordError.textContent = "Passwords do not match";
    confirmPasswordError.textContent = "Passwords do not match";
    confirmPasswordInput.setCustomValidity("Passwords do not match");
  } else {
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    confirmPasswordInput.setCustomValidity("");
  }
}

// Add event listeners to the input fields
usernameInput.addEventListener("blur", () => {
  checkValidity(usernameInput, usernameError);
});

nameInput.addEventListener("blur", () => {
  checkValidity(nameInput, nameError);
});

emailInput.addEventListener("blur", () => {
  checkValidity(emailInput, emailError);
});

passwordInput.addEventListener("blur", checkPasswords);
confirmPasswordInput.addEventListener("blur", checkPasswords);

// Add an event listener to the form's submit event
form.addEventListener("submit", (event) => {
  // Check the validity of the input fields
  const isUsernameValid = checkValidity(usernameInput, usernameError);
  const isNameValid = checkValidity(nameInput, nameError);
  const isEmailValid = checkValidity(emailInput, emailError);
  const isPasswordsValid =
    passwordInput.checkValidity() && confirmPasswordInput.checkValidity();

  // If any input field is invalid, prevent submission
  if (!isUsernameValid || !isNameValid || !isEmailValid || !isPasswordsValid) {
    event.preventDefault();
  }
});

// Add event listeners to the input fields to remove error class on input
usernameInput.addEventListener("input", () => {
  checkValidity(usernameInput, usernameError);
});

nameInput.addEventListener("input", () => {
  checkValidity(nameInput, nameError);
});

emailInput.addEventListener("input", () => {
  checkValidity(emailInput, emailError);
});
