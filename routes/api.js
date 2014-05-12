/*
 * Serve JSON to our AngularJS client
 */
  var https = require('https');
var bad_status_json = {
            "photos":[
                {
                    "id":"",
                    "title":"",
                    "owner":"",
                    "url":"",
                    "status": "bad"
                }
            ]
          };

var get_random_number=function (minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

var getImageInfo = function(){

};

exports.getRandomPickInfo = function(req, res) {
    var api_key="b409e8cf022a5d0c44f549e50f0ca9ee";
    var format="json";
    var per_page="100";
    var text = req.params.keyword;
    var search_url =
    "https://api.flickr.com/services/rest/?method=flickr.photos.search"+
    "&api_key="+api_key+
    "&format="+format+
    "&per_page="+ per_page+
    "&text=" + text+
    "&nojsoncallback=1";

    //Fetching JSON-ed information from Flickr API with a list of photos
   https.get(search_url, function(r) {
    var body="";

    r.on('data', function(chunk) {
        body += chunk;
    });

    r.on('end', function() {

        if (body===""){
          res.json(bad_status_json);
        }
       body=JSON.parse(body) ;

       var num = get_random_number(1, per_page);
       var picked_photo = body.photos.photo[num];

       //Sending JSON-ed information about a picture
       res.json({
        "photos":[
            {
                "id": picked_photo.id,
                "title": picked_photo.title,
                "owner": picked_photo.owner,
                "url":"flickr.com/photos/"+picked_photo.owner+"/"+
                picked_photo.id,
                "status": "good"
            }
        ]
       });
    });
}).on('error', function(e) {
      console.log("ERROR: trying to receive json for a keyword "+keyword, e);

      //Sending 'bad' status, meaning that something went wrong
      res.json(bad_status_json);

});

};