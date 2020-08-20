let gameInfo = null;

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
  let viewerIframe = document.getElementById("viewer");
  $.ajax({
    url: queryURL + gameName,
    method: "GET",
  }).then(function (res) {
    response = res.results[0];
    gameInfo = {
      videoId: response.clip.video,
      title: response.name,
      rating: response.metacritic,
      image: response.background_image,
      platform: response.platforms,
      released: response.released,
    };
    rating.textContent = response.metacritic;
    titleHeader.textContent = response.name;
    background.setAttribute("src", response.background_image);
    viewerIframe.setAttribute(
      "src",
      "https://www.youtube.com/embed/" + gameInfo.videoId
    );
    //   platformList.textContent =
    released.textContent = response.released;
    console.log(response);
    for (let listElement of response.platforms) {
      console.log(listElement.platform.name);
      let platform = document.createElement("li");
      platform.textContent = listElement.platform.name;
      platformList.appendChild(platform);
    }
  });
}

function getGameID(gameName) {
  var queryURL =
    "https://www.cheapshark.com/api/1.0/games?title=" + gameName + "&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    let gameID = response[0].gameID;
    getPrices(gameID);
  });
}

function getPrices(gameID) {
  queryURL = "https://www.cheapshark.com/api/1.0/games?id=" + gameID;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    allPrices = response.deals;
    for (let i = 0; i < 5; i++) {
      let deals = allPrices[i];

      let dealID = deals.dealID;
      let dealURL = "https://www.cheapshark.com/redirect?dealID=" + dealID
      let $link = $("<a>").addClass("button is-success is-light is-small").attr({
        href: dealURL,
        target: "_blank",
      }).text("Buy Now!") // link to retailer

      let price = deals.price;
      let $price = $("<p>").addClass("title is-4").text(price); // price
      let storeID = deals.storeID;
      getStoreName(storeID, $price, $link);
    }
  });
}

function getStoreName(storeID, $price, $link) {
  storeQueryURL = "https://www.cheapshark.com/api/1.0/stores";
  $.ajax({
    url: storeQueryURL,
    method: "GET",
  }).then(function (response) {
    // console.log(response)
    let storeName = response[storeID - 1].storeName;
    let $retailer = $("<p>").addClass("subtitle is-6").text(storeName);

    let bannerPath = response[storeID - 1].images.banner;
    let bannerURL = "http://www.cheapshark.com" + bannerPath;
    let $banner = $("<img>").attr("src", bannerURL);

    let $card = $("<div>").addClass("card"); // creates card
    let $cardImg = $("<div>").addClass("card-image"); // creates div for card image
    let $figure = $("<figure>").addClass("image is-3by1"); // img tag gets inserted in here
    let $cardContent = $("<div>").addClass("card-content"); // div that will hold media &
    let $media = $("<div>").addClass("media");
    let $mediaContent = $("<div>").addClass("media-content");

    $($mediaContent).append($retailer, $price, $link)
    $($media).append($mediaContent)
    $($cardContent).append($media)
    $($figure).append($banner)
    $($cardImg).append($figure)
    $($card).append($cardImg, $cardContent)
    $("#shopping").append($card)
    console.log(storeName);
    console.log(bannerURL);
  });
}

function searchTwitch(gameName) {
  $icon = $("<i>").addClass("fab fa-twitch");
  $link = $("<a>").addClass("button is-dark")
    .attr({href: "http://twitch.tv/search?term=" + gameName, id: "twitch-btn"})
    .text("See Who's Streaming This Game!");
  $($link).append($icon);
  $("#twitch-link").append($link);
}
