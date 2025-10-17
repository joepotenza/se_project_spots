// Show error for input (adds error class to input and displays error message )
const showInputError = (
  inputElement,
  errorMessage,
  errorElement,
  errorClass
) => {
  inputElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

// Hide error for input (removes error class from input and removes error message)
const hideInputError = (inputElement, errorElement, errorClass) => {
  inputElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

// Check validity of user input
const checkInputValidity = (inputElement, errorElement, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(
      inputElement,
      inputElement.validationMessage,
      errorElement,
      errorClass
    );
  } else {
    hideInputError(inputElement, errorElement, errorClass);
  }
};

// Return true if any input is invalid
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Toggle submit button based on valid input
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

// Enable form validation for all forms
function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

// Set listeners for all input in a form
function setEventListeners(formElement, config) {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    // error element based on input ID + error suffix
    const errorElement = formElement.querySelector(
      `#${inputElement.id}${config.inputErrorIdSuffix}`
    );
    inputElement.addEventListener("input", function () {
      checkInputValidity(inputElement, errorElement, config.errorClass);
      toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
    });
  });
}

// Declare a configuration object that contains the necessary classes and selectors.
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorIdSuffix: "-error",
  errorClass: "modal__input_has-error",
};

// Pass the configuration object to enableValidation when we call it.
enableValidation(settings);
