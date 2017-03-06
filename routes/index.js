var express = require('express');
var router = express.Router();
var apod = require('../helpers/apod');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Astropix'});
});
/*get picture of the day, send error message if unavailable*/
router.get('/fetch_picture', function (req, res, next) {
    if (req.query.today) {
        apod(function (data, error) {
            if (error) {
                return res.render('apod_error', {error: error.message});
            }
            return res.render('picture', {apod: data});
        }, true);

    }
    /*get random picture or return error message*/
    else if (req.query.random) {
        apod(function (data, error) {
            if (error) {
                return res.render('apod_error', {error: error.message});
            }
            return res.render('picture', {apod: data});
        });

    } else {
        next();//this sends it to the next 'handler', either designated or 404 handler
    }

})

module.exports = router;