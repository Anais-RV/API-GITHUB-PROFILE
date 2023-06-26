const API_URL = "https://api.github.com/users/";
const main = document.getElementById("main");
const searchBox = document.getElementById("search");

const avatar = document.getElementById("avatar");
const usernameElement = document.getElementById("username");
const bio = document.getElementById("bio");

const followers = document.getElementById("followers");
const following = document.getElementById("following");
const repos = document.getElementById("repos");



const getUser = async (username) => {
  try {
    const response = await axios.get(API_URL + username);
    const usuario = response.data;

    avatar.src = `${usuario.avatar_url || "NO PIC"}`;
    usernameElement.innerHTML = usuario.login;
    bio.innerHTML = `Bio: ${usuario.bio || "No vio available"}`;
    followers.innerHTML = `Followers: ${usuario.followers}`;
    following.innerHTML = `Following: ${usuario.following}`;
    repos.innerHTML = `Repos: ${usuario.public_repos}`;

  } catch (error) {
    console.log(error);
  }
};

const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = searchBox.value;
  getUser(username);
});
