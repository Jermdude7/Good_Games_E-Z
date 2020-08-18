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
      console.log(deals);
      let dealID = deals.dealID;
      console.log(
        "LINK TO PAGE -> https://www.cheapshark.com/redirect?dealID=" + dealID
      );
      price = deals.price;
      console.log("PRICE ->" + price);
      let storeID = deals.storeID;
      getStoreName(storeID);
    }
  });
}

function getStoreName(storeID) {
  queryURL = "https://www.cheapshark.com/api/1.0/stores";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // console.log(response)
    let storeName = response[storeID - 1].storeName;
    let bannerPath = response[storeID - 1].images.banner;
    let bannerURL = "http://www.cheapshark.com" + bannerPath;
    console.log(storeName);
    console.log(bannerURL);
  });
}
