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

// clicked on "edit profile"
editProfileBtn.addEventListener("click", function (event) {
  openModal(editProfileModal);
  editProfileName.value = profileName.textContent;
  editProfileDescription.value = profileDescription.textContent;
});

// clicked on "edit profile" modal close button
editModalCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

// submitted "edit profile" form
editProfileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = editProfileName.value;
  profileDescription.textContent = editProfileDescription.value;
  closeModal(editProfileModal);
});

//new post button
const newPostBtn = document.querySelector(".profile__post-btn");

//new post modal elements
const newPostModal = document.querySelector("#new-post-modal");
const postModalCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = document.forms["post-form"];
const newPostImageLink = newPostModal.querySelector("#post-link");
const newPostCaption = newPostModal.querySelector("#post-caption");

// clicked "new post"
newPostBtn.addEventListener("click", function (event) {
  openModal(newPostModal);
});

// clicked "new post" close button
postModalCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

// submitted "new post" form
newPostForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(`New Post Image Link: ${newPostImageLink.value}`);
  console.log(`New Post Caption: ${newPostCaption.value}`);
  closeModal(newPostModal);
});

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#cards-template")
  .content.querySelector(".card");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardCaption = cardElement.querySelector(".card__caption");
  const cardButton = cardElement.querySelector(".card__like-btn");

  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  cardCaption.textContent = data.name;

  return cardElement;
}

initialCards.forEach((card) => {
  const newCardElement = getCardElement(card);
  cardsList.append(newCardElement);
});
