
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index.html');
};

exports.partials = function(req ,res){
    res.render('partials/' + req.params.name);
};

