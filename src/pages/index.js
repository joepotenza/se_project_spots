import {
  enableValidation,
  toggleButtonState,
  checkInputValidity,
  settings,
} from "../scripts/validation.js";

import Api from "../utils/Api.js";

import "./index.css";

// Initiate the API for persistent storage
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7f2eb620-d937-4840-9bb6-36bf77188058",
    "Content-Type": "application/json",
  },
});

// Get data for initial page load: profile info and cards (images)
api
  .getAppInfo()
  .then(([profile, cards]) => {
    renderProfileData({
      name: profile.name,
      description: profile.about,
      avatar: profile.avatar,
    });
    cards.forEach((card) => {
      addCardElement(getCardElement(card));
    });
  })
  .catch(console.error);

//profile html elements
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");
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

const editAvatarBtn = document.querySelector(".profile__avatar-btn");
const editAvatarModal = document.querySelector("#avatar-modal");
const editAvatarCloseBtn = editAvatarModal.querySelector(".modal__close-btn");
const editAvatarLink = editAvatarModal.querySelector("#edit-avatar");
const editAvatarForm = document.forms["avatar-form"];
const editAvatarSubmitBtn = editAvatarForm.querySelector(".modal__submit-btn");

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
    const errorElement = editProfileForm.querySelector(
      `#${inputElement.id}-error`,
    );
    checkInputValidity(inputElement, errorElement, settings.errorClass);
  });
  toggleButtonState(
    inputList,
    editProfileSubmitBtn,
    settings.inactiveButtonClass,
  );
});

// clicked on "edit profile" modal close button
editModalCloseBtn.addEventListener("click", closeCurrentModal);

// clicked on "edit avatar"
editAvatarBtn.addEventListener("click", (evt) => {
  // open the modal
  openModal(editAvatarModal);
  // reset form field with the current avatar image
  editAvatarLink.value = profileAvatar.src;

  // fix it so errors don't show from any earlier cancelled input and the button state is correct
  const inputList = [editAvatarLink];
  inputList.forEach((inputElement) => {
    const errorElement = editAvatarForm.querySelector(
      `#${inputElement.id}-error`,
    );
    checkInputValidity(inputElement, errorElement, settings.errorClass);
  });
  toggleButtonState(
    inputList,
    editAvatarSubmitBtn,
    settings.inactiveButtonClass,
  );
});

// clicked on "edit avatar" modal close button
editAvatarCloseBtn.addEventListener("click", closeCurrentModal);

// Display the profile data (either from form submit or from API load)
const renderProfileData = ({ name, description, avatar }) => {
  profileName.textContent = name;
  profileDescription.textContent = description;
  if (avatar !== undefined) profileAvatar.src = avatar;
};

// submitted "edit profile" form
editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (editProfileName.validity.valid && editProfileDescription.validity.valid) {
    const oldValue = editProfileSubmitBtn.textContent;
    editProfileSubmitBtn.textContent = "Saving...";
    api
      .editUserInfo({
        name: editProfileName.value,
        about: editProfileDescription.value,
      })
      .then((profile) => {
        renderProfileData({
          name: profile.name,
          description: profile.about,
        });
        toggleButtonState(
          [editProfileName, editProfileDescription],
          editProfileSubmitBtn,
          settings.inactiveButtonClass,
        );
        editProfileSubmitBtn.textContent = oldValue;
        closeCurrentModal(evt);
      })
      .catch(console.error);
  }
});

// submitted "edit avatar" form
editAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (editAvatarLink.validity.valid) {
    const oldValue = editAvatarSubmitBtn.textContent;
    editAvatarSubmitBtn.textContent = "Saving...";
    api
      .editUserAvatar(editAvatarLink.value)
      .then((profile) => {
        renderProfileData({
          name: profile.name,
          description: profile.about,
          avatar: profile.avatar,
        });
        toggleButtonState(
          [editAvatarLink],
          editAvatarSubmitBtn,
          settings.inactiveButtonClass,
        );
        editAvatarSubmitBtn.textContent = oldValue;
        closeCurrentModal(evt);
      })
      .catch(console.error);
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
    const oldValue = newPostSubmitBtn.textContent;
    newPostSubmitBtn.textContent = "Saving...";
    api
      .addCard({
        name: newPostCaption.value,
        link: newPostImageLink.value,
      })
      .then((card) => {
        addCardElement(getCardElement(card), true);
        newPostForm.reset();
        toggleButtonState(
          [newPostCaption, newPostImageLink],
          newPostSubmitBtn,
          settings.inactiveButtonClass,
        );
        newPostSubmitBtn.textContent = oldValue;
        closeCurrentModal(evt);
      })
      .catch(console.error);
  }
});

//cards list elements
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#cards-template")
  .content.querySelector(".card");

// Card Delete modal elements
const deleteCardModal = document.querySelector("#delete-modal");
const deleteCardDeleteBtn = deleteCardModal.querySelector(".modal__delete-btn");
const deleteModalCloseBtn = deleteCardModal.querySelector(".modal__close-btn");
const deleteModalCancelBtn =
  deleteCardModal.querySelector(".modal__cancel-btn");
let deleteCardCurrentId = "";
let deleteCardCurrentElement = "";

// clicked "new post"
newPostBtn.addEventListener("click", (evt) => {
  openModal(newPostModal);
});

// clicked delete modal close or cancel button
deleteModalCloseBtn.addEventListener("click", closeCurrentModal);
deleteModalCancelBtn.addEventListener("click", closeCurrentModal);

// clicked "delete" when the modal is open
deleteCardDeleteBtn.addEventListener("click", (evt) => {
  if (deleteCardCurrentId === "" || deleteCardCurrentElement === "") return;
  const oldValue = deleteCardDeleteBtn.textContent;
  deleteCardDeleteBtn.textContent = "Deleting...";
  api
    .deleteCard(deleteCardCurrentId)
    .then((res) => {
      deleteCardCurrentElement.remove();
      deleteCardDeleteBtn.textContent = oldValue;
      deleteCardCurrentId = "";
      deleteCardCurrentElement = "";
      closeCurrentModal(evt);
    })
    .catch(console.error);
});

// clone template and fill in new card element
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardCaption = cardElement.querySelector(".card__caption");
  const cardLikeButton = cardElement.querySelector(".card__like-btn");
  const cardDeleteButton = cardElement.querySelector(".card__delete-btn");

  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  cardImage.setAttribute("id", data._id);

  cardCaption.textContent = data.name;

  if (data.isLiked) {
    cardLikeButton.classList.add("card__like-btn_liked");
  }

  // card image click handler to show preview
  cardImage.addEventListener("click", (evt) => {
    renderImagePreview(data.link, data.name);
  });

  // like button handler
  cardLikeButton.addEventListener("click", (evt) => {
    // Call the Like toggle function, using the button class as an indicator if the card is already Liked or not
    api
      .toggleCardLike({
        cardId: data._id,
        isLiked: evt.target.classList.contains("card__like-btn_liked"),
      })
      .then((res) => {
        evt.target.classList.toggle("card__like-btn_liked");
      })
      .catch(console.error);
  });

  // delete button handler
  cardDeleteButton.addEventListener("click", (evt) => {
    deleteCardCurrentId = data._id;
    deleteCardCurrentElement = cardElement;
    openModal(deleteCardModal);
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

// Pass the configuration object to enableValidation when we call it.
enableValidation(settings);
