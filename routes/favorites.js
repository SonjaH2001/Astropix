// add a route handler for FAvorites

var express = require('express');
var router = express.Router();

// GET favorites page
router.get('/', function (req, res, next) {
    res.render('favorites', {favorites : req.session.favorites});
});//end of GET callback

// POST add new favorite
router.post('/add', function(req, res, next){

    //If no favorites array, create one
    if (!req.session.favorites){
        req.session.favorites = []; //create empty array
    }
    //Check if image is already in the array
    for (var x = 0 ; x < req.session.favorites.length ; x++) {
        if (req.session.favorites[x].date ==req.body.date) {
            console.log('This is already a Favorite');
            return res.redirect('back'); //BAck to previous page
        }
    }
    //if not, add to array and redirect to favorites page
    req.session.favorites.push(req.body);
    res.redirect('/favorites');
});//end of ADD callback

//POST delete favorite
router.post('/remove', function(req, res, next){
    //get the date attribure from the post request
    var pictureDate = req.body.date
    //"filter" will loop through the existing array and look for object with date attribute
    //r.se..rfav = r.s.f.filter
    //look for examples of filter. try with a sinmple int array and then adapt for this.
    //return favorite
    req.session.favorites.pop(req.body);
    res.redirect('/favorites');
}); //end of DELETE callback
module.exports = router;