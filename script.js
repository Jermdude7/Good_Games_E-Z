let gameName = "skyrim";
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
      let $link = $("<a>").attr("href", dealURL).text("Buy Now!") // link to retailer
      
      let price = deals.price;
      let $price = $("<p>").addClass("title is-4").text(price) // price

      let storeID = deals.storeID;
      getStoreName(storeID, $price, $link);
    }
  });
}

function getStoreName(storeID, $price, $link) {
  queryURL = "https://www.cheapshark.com/api/1.0/stores";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // console.log(response)
    let storeName = response[storeID - 1].storeName;
    let $retailer = $("<p>").addClass("subtitle is-6").text(storeName)
    
    let bannerPath = response[storeID - 1].images.banner;
    let bannerURL = "http://www.cheapshark.com" + bannerPath;
    let $banner = $("<img>").attr("src", bannerURL)
    
    let $card = $("<div>").addClass("card"); // creates card
    let $cardImg = $("<div>").addClass("card-image"); // creates div for card image
    let $figure = $("<figure>").addClass("image is-3by1"); // img tag gets inserted in here
    let $cardContent = $("<div>").addClass("card-content")
    let $media = $("<div>").addClass("media")
    let $mediaContent = $("<div>").addClass("media-content")
    let $content = $("<div>").addClass("content")
    
    $($content).append($link)
    $($mediaContent).append($retailer, $price)
    $($media).append($mediaContent)
    $($cardContent).append($media, $content)
    $($figure).append($banner)
    $($cardImg).append($figure)
    $($card).append($cardImg, $cardContent)
    $("body").append($card)


    console.log(storeName);
    console.log(bannerURL);
  });
}
