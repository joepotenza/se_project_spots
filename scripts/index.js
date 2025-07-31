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
    link: "./images/card/venice.jpg",
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
  editProfileModal.classList.add("modal_is-opened");
  editProfileName.value = profileName.textContent;
  editProfileDescription.value = profileDescription.textContent;
});

// clicked on "edit profile" modal close button
editModalCloseBtn.addEventListener("click", closeEditModal);

// submitted "edit profile" form
editProfileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = editProfileName.value;
  profileDescription.textContent = editProfileDescription.value;
  closeEditModal();
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
  newPostModal.classList.add("modal_is-opened");
});

// clicked "new post" close button
postModalCloseBtn.addEventListener("click", closeNewPostModal);

// submitted "new post" form
newPostForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(`New Post Image Link: ${newPostImageLink.value}`);
  console.log(`New Post Caption: ${newPostCaption.value}`);
  closeNewPostModal();
});

function closeEditModal(event) {
  editProfileModal.classList.remove("modal_is-opened");
}

function closeNewPostModal(event) {
  newPostModal.classList.remove("modal_is-opened");
}

//Log the card items to console
initialCards.forEach(function (card) {
  console.log(card.name);
});
