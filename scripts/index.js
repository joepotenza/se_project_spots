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
const editProfileForm = editProfileModal.querySelector(".modal__form");

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
const newPostForm = newPostModal.querySelector(".modal__form");
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
