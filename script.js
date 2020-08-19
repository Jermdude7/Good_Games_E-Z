let gameInfo = null;
// let gameName = "skyrim";
$("#search-bar").on("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault;
    let gameName = $("#search-bar").val();
    $("#shopping").empty();
    $("#platforms").empty();
    $("#twitch-link").empty();
    getGame(gameName);
    getGameID(gameName);
    searchTwitch(gameName);
  }
});

function getGame(gameName) {
  let queryURL = "https://api.rawg.io/api/games?search=";
  let titleHeader = document.getElementById("title");
  let rating = document.getElementById("rating");
  let background = document.getElementById("backgroundImg");
  let platformList = document.getElementById("platforms");
  let released = document.getElementById("release");
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
    let bannerURL = "http://www.cheapshark.com" + bannerPath;
    let $banner = $("<img>").attr("src", bannerURL);

    let $card = $("<div>").addClass("card"); // creates card
    let $cardImg = $("<div>").addClass("card-image"); // creates div for card image
    let $figure = $("<figure>").addClass("image is-3by1"); // img tag gets inserted in here
    let $cardContent = $("<div>").addClass("card-content"); // div that will hold media &
    let $media = $("<div>").addClass("media");
    let $mediaContent = $("<div>").addClass("media-content");
    let $content = $("<div>").addClass("content");

    $($content).append($link);
    $($mediaContent).append($retailer, $price);
    $($media).append($mediaContent);
    $($cardContent).append($media, $content);
    $($figure).append($banner);
    $($cardImg).append($figure);
    $($card).append($cardImg, $cardContent);
    $("#shopping").append($card);
    console.log(storeName);
    console.log(bannerURL);
  });
}

function searchTwitch(gameName) {
  $link = $("<a>")
    .attr("href", "http://twitch.tv/search?term=" + gameName)
    .text("See Who's Streaming This Game!");
  $("#twitch-link").append($link);
}
