let gameName = "skyrim"
// Here we are building the URL we need to query the database
var queryURL = "https://www.cheapshark.com/api/1.0/games?title="+gameName+"&limit=10"
// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {
    console.log(response)
    let gameID = response[0].gameID // then plug this into a different call for pricing results
    getPrices(gameID)
  });

  function getPrices (gameID){
    queryURL = "https://www.cheapshark.com/api/1.0/games?id="+gameID
    $.ajax({
      url: queryURL,
      method: "GET"
  }).then(function(response) {
    console.log(response)
    allPrices = response.deals
    for (let i = 0; i < 5; i++) {
      let deals = allPrices[i];
      console.log(deals)
      let dealID = deals.dealID
      console.log("LINK TO PAGE -> https://www.cheapshark.com/redirect?dealID="+dealID)
      price = deals.price
      console.log("PRICE ->"+price)
    }
  })
}