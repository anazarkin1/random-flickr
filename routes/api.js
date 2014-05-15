/*
 * Serve JSON to our AngularJS client
 */
var https = require('https');

//My App's API key
var api_key="b409e8cf022a5d0c44f549e50f0ca9ee";
//Format for getting information
var format="json";

// Bad-status json sent via api when an error occurred
var badStatusJson = {
                    "id":"",
                    "title":"",
                    "owner":"",
                    "url":"",
                    "url_l":"",
                    "stat": "bad"
          };

//Get a random number
var getRandomNumber=function (minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

//Gives away a json-ed information about a random photo
//that has a keyword in its text
exports.getRandomPickInfo = function(req, res) {
    var per_page="";
    var text = req.params.keyword;

    //Building up the url call to flickr api
    var photo_search_url =
    "https://api.flickr.com/services/rest/?method=flickr.photos.search"+
    "&api_key="+api_key+
    "&format="+format+
    "&per_page="+ per_page+
    "&text=" + text+
    "&nojsoncallback=1"+
    "&license=1"+
    "&extras=url_l, url_m, owner_name";

    //Fetching JSON-ed information from Flickr API with a list of photos
   https.get(photo_search_url, function(r) {
    var body="";

    r.on('data', function(chunk) {
        body += chunk;
    });

    r.on('end', function() {

       body=JSON.parse(body) ;

       //Flickr api response with photos count= 0 is considerate
       //as a bad response
       if (body.stat!="ok" || body.photos.total.toString()=='0'){
          console.log('json with bad status on photo_search_url');
          res.json(badStatusJson);
       }else{

       //Getting a random number
       var num = getRandomNumber(1, per_page);

       //getPicInfo runs the function that does the actual res.json
       // as a callback
        //Getting all the params that will  be sent to the view
        var pickedPhotoInfo = body.photos.photo[num];
         var id = pickedPhotoInfo.id;
         var title = pickedPhotoInfo.title._content;
         var farm_id = pickedPhotoInfo.farm;
         var owner = pickedPhotoInfo.owner_name;


         //Sending JSON-ed information about a picture
         var info = {
                  "id": ""+id,
                  "title": ""+title,
                  "owner":""+owner,
                  "url":pickedPhotoInfo.url_m,
                  "url_l":pickedPhotoInfo.url_l,
                  "stat": "ok"
         };
         res.json(info);
      }

  }).on('error', function(e) {
        console.log("ERROR: trying to receive json for a keyword "+keyword, e);

        //Sending 'bad' status, meaning that something went wrong
        res.json(badStatusJson);

  });

});
};

