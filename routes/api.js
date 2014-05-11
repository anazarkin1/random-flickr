/*
 * Serve JSON to our AngularJS client
 */
  var https = require('https')

exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};

exports.randomPick = function(req, res) {
    var api_key="b409e8cf022a5d0c44f549e50f0ca9ee";
    var format="json";
    var per_page="1";
    var text = req.params.keyword;
    var search_url =
    "https://api.flickr.com/services/rest/?method=flickr.photos.search"+
    "&api_key="+api_key+
    "&format="+format+
    "&per_page="+ per_page+
    "&text=" + text;
   https.get(search_url, function(r) {
    var body = '';

    r.on('data', function(chunk) {
        body += chunk;
    });

    r.on('end', function() {
        var response = JSON.parse(body.jsonFlickrApi);
        console.log("Got response: ", response);
    });
}).on('error', function(e) {
      console.log("Got error: ", e);
});

};