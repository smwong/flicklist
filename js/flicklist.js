

$(document).ready(function() {
  discoverMovies(render);
});



var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "5abf41ce2e5a27bb26d306d456451285" // TODO 0 add your api key
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
  $.ajax({
    url: api.root + "/discover/movie",
    data: {
      api_key: api.token
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
    }
  });
}


/**
 * Makes an AJAX request to the /search endpoint of the API, using the
 * query string that was passed in
 *
 * if successful, updates model.browseItems appropriately and then invokes
 * the callback function that was passed in
 */
function searchMovies(query, callback) {


  $.ajax({
    url: api.root + "/search/movie",
    data: {
      api_key: api.token,
      query: query
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
    }
  });
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {

  // clear everything

  $("#theWatchlist ul").empty();
  $("#browsingSection ul").empty();

  // insert watchlist items

  model.watchlistItems.forEach(function(movie) {
    var title = $("<p></p>").text(movie.original_title);
    var itemWatch = $("<li></li>")
      .append(title)
      .attr("class", "item-watchlist");

      // TODO 3
      // give itemView a class attribute of "item-watchlist"

    $("#theWatchlist ul").append(itemWatch);
  });

  // insert browse items

  model.browseItems.forEach(function(movie) {
    var title = $("<h4></h4>").text(movie.original_title);
    var button = $("<button></button>")
      .text("Add to Watchlist")
      .click(function() {
        model.watchlistItems.push(movie);
        render();
      })
      .prop("disabled", model.watchlistItems.indexOf(movie) !== -1);

      // TODO 2
      // the button should be disabled if this movie is already in
      // the user's watchlist
      // see jQuery .prop() and Array.indexOf()


    // TODO 1
    // create a paragraph containing the movie object's .overview value
    // then append the paragraph in between the title and the button

    var overview = $("<p></p>").text(movie.overview);


    // append everything to itemView, along with an <hr/>

    var itemWatch = $("<li></li>")
      .append($("<hr/>"))
      .append(title)
      .append(overview)
      .append(button);

    // append the itemView to the list

    $("#browsingSection ul").append(itemWatch);
  });

}
