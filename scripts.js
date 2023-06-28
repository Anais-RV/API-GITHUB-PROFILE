const API_URL = "https://api.github.com/users/";
const main = document.getElementById("main");
const searchBox = document.getElementById("search");

// Función para crear los elementos dinamicamente

const createUserElement = (tagName, id, className = "") => {
  const element = document.createElement(tagName);
  if (id) {
    element.id = id;
  }
  if (className) {
    element.className = className;
  }
  return element;
};

// API, conecto

const getUser = async (username) => {
  try {
    if (!username) {
      main.style.display = "none";
      return;
    }

    const response = await axios.get(API_URL + username);
    const usuario = response.data;

    main.innerHTML = ""; // Limpiar contenido previo

    // Creo los elementos para la card

    const card = createUserElement("div", "", "card");
    const avatar = createUserElement("img", "avatar", "avatar");
    const userInfo = createUserElement("div", "", "user-info");
    const usernameElement = createUserElement("h2", "username");
    const bio = createUserElement("p", "bio");
    const followers = createUserElement("p", "followers");
    const following = createUserElement("p", "following");
    const repos = createUserElement("p", "repos");
    const userLink = createUserElement("a", "", "user-link");

    // Asigno contenido

    avatar.src = `${usuario.avatar_url}`;
    usernameElement.innerHTML = usuario.login;
    bio.innerHTML = `Bio: ${usuario.bio || "No bio available"}`;
    followers.innerHTML = `Followers: ${usuario.followers}`;
    following.innerHTML = `Following: ${usuario.following}`;
    repos.innerHTML = `Repos: ${usuario.public_repos}`;

    userLink.href = usuario.html_url;
    userLink.target = "_blank";
    userLink.innerHTML = "GitHub Profile";

    // Inserto

    userInfo.appendChild(usernameElement);
    userInfo.appendChild(bio);
    userInfo.appendChild(followers);
    userInfo.appendChild(following);
    userInfo.appendChild(repos);
    userInfo.appendChild(userLink);
    

    card.appendChild(avatar);
    card.appendChild(userInfo);

    // Agrego tarjeta del usuario

    main.appendChild(card);

    main.style.display = "block";
  } catch (error) {
    console.log(error);
  }
};

// Buscador de usuario

const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = searchBox.value;
  getUser(username);
});

// Ocultar la card hasta que tenga búsqueda

main.style.display = "none";




