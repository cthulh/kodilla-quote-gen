(function(){
  // App setup
  var params = {
    urls: {
      tweetLink: "https://twitter.com/intent/tweet?text=",
      quoteUrl: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1"
    }
  }
  // Get quote with a promise
  function getQuote() {
    fetch(params.urls.quoteUrl, { cache: "no-store" })
        .then(function(resp) {
            return resp.json();
        })
        .then(createTweet);
  }
  // Create tweet
  function createTweet(input) {
    var data = input[0];
    var dataElement = document.createElement('div');
    dataElement.innerHTML = data.content;
    var quoteText = dataElement.innerText.trim();
    var quoteAuthor = data.title;

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }

    var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
    if (tweetText.length > 140) {
      getQuote();
    } else {
      var tweet = params.urls.tweetLink + encodeURIComponent(tweetText);
      document.querySelector('.quote').innerText = quoteText;
      document.querySelector('.author').innerText = "Author: " + quoteAuthor;
      document.querySelector('.tweet').setAttribute('href', tweet);
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    getQuote();
    document.querySelector('.trigger').addEventListener('click', function() {
        getQuote();
    });
  });


}());
