const editProfileModal = document.querySelector("#edit-profile-modal");
const editModalCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const newPostModal = document.querySelector("#new-post-modal");
const postModalCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostBtn = document.querySelector(".profile__post-btn");

editProfileBtn.addEventListener("click", function (event) {
  editProfileModal.classList.add("modal_is-opened");
});

newPostBtn.addEventListener("click", function (event) {
  newPostModal.classList.add("modal_is-opened");
});

editModalCloseBtn.addEventListener("click", function (event) {
  editProfileModal.classList.remove("modal_is-opened");
});

postModalCloseBtn.addEventListener("click", function (event) {
  newPostModal.classList.remove("modal_is-opened");
});
