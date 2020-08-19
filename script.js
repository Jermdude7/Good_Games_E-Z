let gameInfo = null;

let gameName = "pubg";
let queryURL = "https://api.rawg.io/api/games?search=";
let titleHeader = document.getElementById("title");
let rating = document.getElementById("rating");
let background = document.getElementById("backgroundImg");
let platformList = document.getElementById("platforms");
let released = document.getElementById("release");

function getGame(gameName) {
  $.ajax({
    url: queryURL + gameName,
    method: "GET",
  }).then(function (res) {
    response = res.results[0];
    gameInfo = {
      title: response.name,
      rating: response.metacritic,
      image: response.background_image,
      platform: response.platforms,
      released: response.released,
    };
    rating.textContent = response.metacritic;
    titleHeader.textContent = response.name;
    background.setAttribute("src", response.background_image);
    //   platformList.textContent =
    released.textContent = response.released;
    console.log(response);
    document.getElementById("gameData").style.display = "block";
    for (let listElement of response.platforms) {
      console.log(listElement.platform.name);
      let platform = document.createElement("li");
      platform.textContent = listElement.platform.name;
      platformList.appendChild(platform);
    }
  });
}
getGame("pubg");
// create button for evenlistner in order to attach gamefunction TO that button
// input validation
