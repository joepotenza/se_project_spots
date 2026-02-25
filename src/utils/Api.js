export default class Api {
  constructor({ baseUrl, headers }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // single internal function for making API calls
  _makeAPICall({ endpoint, method = "GET", body = "" }) {
    const params = {
      method: method,
      headers: this._headers,
    };
    // Add body parameter when updating or adding content
    if (method === "PATCH" || method === "POST") {
      params.body = body;
    }
    return fetch(`${this._baseUrl}/${endpoint}`, params).then((res) => {
      if (res.ok) {
        // Parse the JSON response on success
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // Load the initial app data when opening the page
  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  // Fetch the user info
  getUserInfo() {
    return this._makeAPICall({ endpoint: "users/me" });
  }

  // Fetch the cards as stored in the API
  getInitialCards() {
    return this._makeAPICall({ endpoint: "cards" });
  }

  // Edit user info
  editUserInfo({ name, about }) {
    return this._makeAPICall({
      endpoint: "users/me",
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
  }

  // Edit user avatar
  editUserAvatar(avatar) {
    return this._makeAPICall({
      endpoint: "users/me/avatar",
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }

  // Add a new card
  addCard({ name, link }) {
    return this._makeAPICall({
      endpoint: "cards",
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
  }

  // Delete a card
  deleteCard(cardId) {
    return this._makeAPICall({
      endpoint: `cards/${cardId}`,
      method: "DELETE",
    });
  }

  // Like a card
  _likeCard(cardId) {
    return this._makeAPICall({
      endpoint: `cards/${cardId}/likes`,
      method: "PUT",
    });
  }

  // Un-like a card
  _unlikeCard(cardId) {
    return this._makeAPICall({
      endpoint: `cards/${cardId}/likes`,
      method: "DELETE",
    });
  }

  // Public method to toggle Like
  toggleCardLike({ cardId, isLiked }) {
    if (!isLiked) return this._likeCard(cardId);
    else return this._unlikeCard(cardId);
  }
}
