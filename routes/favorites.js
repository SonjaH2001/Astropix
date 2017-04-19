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
    //Check if image is laready in the array
    for (var x = 0 ; x < req.session.favorites.length ; x++) {
        if (req.session.favorites[x].date ==req.body.date) {
            console.log('This is already a Favorite');
            return res.redirect('back'); //BAck to previous page
        }
    }
    //if not, add to array and redirect to favorites page
    req.session.favorites.push(req.body);
    res.redirect('/favorites');
});//end of callback

module.exports = router;