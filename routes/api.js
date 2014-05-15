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
                    "stat": "bad"
          };

//Get a random number
var getRandomNumber=function (minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

//Get Information about an image
//It's required to build a proper url for an image
function getPicInfo(photo_id, callback){
    var photos_getInfo_url =
    "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo"+
    "&api_key="+api_key+
    "&format="+format+
    "&photo_id="+ photo_id+
    "&nojsoncallback=1";
        //Fetching JSON from Flickr API with information about this image
   https.get(photos_getInfo_url , function(r) {
    var body="";

    r.on('data', function(chunk) {
        body += chunk;
    });

    r.on('end', function() {
      //If no json received from Flickr API, send bad status json
      if (body===""){
        body=badStatusJson;
        console.log('ERROR: trying to get info about the photo, nothing received,'+
          'photo_id: '+ photo_id);
      }else{
      callback(body);
    }

  }).on('error', function(e) {
        console.log("ERROR: trying to receive json info on "+photo_id, e);

        //Sending 'bad' status, meaning that something went wrong
        callback(badStatusJson);
  });
  });

}


exports.getRandomPickInfo = function(req, res) {
    var per_page="100";
    var text = req.params.keyword;
    var photo_search_url =
    "https://api.flickr.com/services/rest/?method=flickr.photos.search"+
    "&api_key="+api_key+
    "&format="+format+
    "&per_page="+ per_page+
    "&text=" + text+
    "&nojsoncallback=1";

    //Fetching JSON-ed information from Flickr API with a list of photos
   https.get(photo_search_url, function(r) {
    var body="";

    r.on('data', function(chunk) {
        body += chunk;
    });

    r.on('end', function() {

        if (body===""){
          res.json(badStatusJson);
          console.log('Empty json on photo_search_url');
        }
       body=JSON.parse(body) ;

       var num = getRandomNumber(1, per_page);
       getPicInfo(body.photos.photo[num].id, function(pickedPhotoInfo ){
         //Checking if we got information about the image
        //  if (pickedPhotoInfo.stat != "ok"){
        //       res.json(badStatusJson);
        //       console.log('Empty json on photo_search_url');

        // }
        pickedPhotoInfo = JSON.parse(pickedPhotoInfo);

        //Getting all the params that will  be sent to the view
         var id = pickedPhotoInfo.photo.id;
         var title = pickedPhotoInfo.photo.title._content;
         var farm_id = pickedPhotoInfo.photo.farm;
         var owner = pickedPhotoInfo.photo.owner.realname;
         var server_id = pickedPhotoInfo.photo.server;
         var secret = pickedPhotoInfo.photo.secret;
         var original_format = pickedPhotoInfo.photo.originalformat;


         //Sending JSON-ed information about a picture
         var info = {
                  "id": ""+id,
                  "title": ""+title,
                  "owner":""+owner,
                  "url":"http://farm"+farm_id+".staticflickr.com/"+server_id+
                  "/"+id+"_"+secret+"."+original_format,
                  "stat": "ok"
         };
         // console.log(JSON.stringify(info));
         res.json(info);
      }
    );
  }).on('error', function(e) {
        console.log("ERROR: trying to receive json for a keyword "+keyword, e);

        //Sending 'bad' status, meaning that something went wrong
        res.json(badStatusJson);

  });

});
};

