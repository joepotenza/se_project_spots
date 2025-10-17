// Store initial cards in array
const initialCards = [
  {
    name: "A Perfect Margherita Pizza",
    link: "./images/cards/pizza1.jpg",
  },
  {
    name: "My New Mazda3",
    link: "./images/cards/mazda3.jpg",
  },
  {
    name: "Citi Field - Home of the Mets",
    link: "./images/cards/citi1.jpg",
  },
  {
    name: "Capri, Italy",
    link: "./images/cards/capri1.jpg",
  },
  {
    name: "Rome, Italy",
    link: "./images/cards/rome1.jpg",
  },
  {
    name: "Venice, Italy",
    link: "./images/cards/venice1.jpg",
  },
];

//profile html elements
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editProfileBtn = document.querySelector(".profile__edit-btn");

//profile modal elements
const editProfileModal = document.querySelector("#edit-profile-modal");
const editModalCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileName = editProfileModal.querySelector("#edit-name");
const editProfileDescription =
  editProfileModal.querySelector("#edit-description");
const editProfileForm = document.forms["profile-form"];
const editProfileSubmitBtn =
  editProfileForm.querySelector(".modal__submit-btn");

// clicked on "edit profile"
editProfileBtn.addEventListener("click", (evt) => {
  // open the modal
  openModal(editProfileModal);
  // reset form fields with the current profile name and description
  editProfileName.value = profileName.textContent;
  editProfileDescription.value = profileDescription.textContent;

  // fix it so errors don't show from any earlier cancelled input and the button state is correct
  const inputList = [editProfileName, editProfileDescription];
  inputList.forEach((inputElement) => {
    console.log(`Checking ${inputElement.id}`);
    const errorElement = editProfileForm.querySelector(
      `#${inputElement.id}-error`
    );
    checkInputValidity(inputElement, errorElement, settings.errorClass);
  });
  toggleButtonState(
    inputList,
    editProfileSubmitBtn,
    settings.inactiveButtonClass
  );
});

// clicked on "edit profile" modal close button
editModalCloseBtn.addEventListener("click", closeCurrentModal);

// submitted "edit profile" form
editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (editProfileName.validity.valid && editProfileDescription.validity.valid) {
    profileName.textContent = editProfileName.value;
    profileDescription.textContent = editProfileDescription.value;
    toggleButtonState(
      [editProfileName, editProfileDescription],
      editProfileSubmitBtn,
      settings.inactiveButtonClass
    );
    closeCurrentModal(evt);
  }
});

//new post button
const newPostBtn = document.querySelector(".profile__post-btn");

//new post modal elements
const newPostModal = document.querySelector("#new-post-modal");
const postModalCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = document.forms["post-form"];
const newPostImageLink = newPostModal.querySelector("#post-link");
const newPostCaption = newPostModal.querySelector("#post-caption");
const newPostSubmitBtn = newPostModal.querySelector(".modal__submit-btn");

// clicked "new post"
newPostBtn.addEventListener("click", (evt) => {
  openModal(newPostModal);
});

// clicked "new post" close button
postModalCloseBtn.addEventListener("click", closeCurrentModal);

// submitted "new post" form
newPostForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (newPostCaption.validity.valid && newPostImageLink.validity.valid) {
    addCardElement(
      getCardElement({
        name: newPostCaption.value,
        link: newPostImageLink.value,
      }),
      true
    );
    newPostForm.reset();
    toggleButtonState(
      [newPostCaption, newPostImageLink],
      newPostSubmitBtn,
      settings.inactiveButtonClass
    );
    closeCurrentModal(evt);
  }
});

//cards list elements
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#cards-template")
  .content.querySelector(".card");

// clone template and fill in new card element
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardCaption = cardElement.querySelector(".card__caption");
  const cardLikeButton = cardElement.querySelector(".card__like-btn");
  const cardDeleteButton = cardElement.querySelector(".card__delete-btn");

  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);

  cardCaption.textContent = data.name;

  // card image click handler to show preview
  cardImage.addEventListener("click", (evt) => {
    renderImagePreview(data.link, data.name);
  });

  // like button handler
  cardLikeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-btn_liked");
  });

  // delete button handler
  cardDeleteButton.addEventListener("click", (evt) => {
    cardElement.remove();
  });

  return cardElement;
}

// add new card to DOM
function addCardElement(newCardElement, before = false) {
  if (before) {
    cardsList.prepend(newCardElement);
  } else {
    cardsList.append(newCardElement);
  }
}

// load initial cards
initialCards.forEach((card) => {
  addCardElement(getCardElement(card));
});

// image preview modal elements
const imagePreviewModal = document.querySelector("#preview-modal");
const imagePreviewCloseBtn =
  imagePreviewModal.querySelector(".modal__close-btn");
const imagePreviewImage = imagePreviewModal.querySelector(".modal__image");
const imagePreviewCaption = imagePreviewModal.querySelector(".modal__caption");

// close preview modal
imagePreviewCloseBtn.addEventListener("click", closeCurrentModal);

// show image preview
function renderImagePreview(link, caption) {
  imagePreviewImage.setAttribute("src", link);
  imagePreviewImage.setAttribute("alt", caption);
  imagePreviewCaption.textContent = caption;
  openModal(imagePreviewModal);
}

// Condense the open/close functionality for ease of use

let currentModal;

const escapeListener = (evt) => {
  if (evt.key == "Escape") {
    closeCurrentModal(evt);
  }
};

function closeCurrentModal(evt) {
  if (currentModal) {
    closeModal(currentModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", escapeListener);
  currentModal = modal;
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", escapeListener);
  currentModal = null;
}

// Close the active modal when clicking on the overlay (outside the modal borders)
const allModals = document.querySelectorAll(".modal");
allModals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeCurrentModal(evt);
    }
  });
});
