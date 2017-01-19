var express = require('express');
//var util = require('util');
//var session = require('express-session');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
    req.session.flash = [];
});

router.get('/dudule', function(req, res, next) {
    res.render('dudule');
});

router.post('/login', function(req, res, next) {
    // you might like to do a database look-up or something more scalable here

    if (req.body.username && req.body.username === 'user' && req.body.password && req.body.password === 'pass') {
        console.log("AUTH OK");
        req.session.authenticated = true;
        console.log('auth session: ', req.session);
        res.redirect('/controle');
    } else {
        console.log("AUTH KO");
        req.flash('danger', 'Utilisateur et/ou mot de passe incorrect(s)');
        res.redirect('/');
    }

});

router.get('/logout', function (req, res, next) {
		delete req.session.authenticated;
        req.flash('info', 'Vous êtes déconnecté.');
		res.redirect('/');
	});

router.get('/controle', function(req, res, next) {
    var dashBoard = {
        getters: [
            'voyant6',
            'voyant5',
            'voyant4',
            'voyant3',
            'voyant2',
            'voyant1',
            'voyant0'
        ],
        setters: [
            'BP32',
            'BP16',
            'BP8',
            'BP4',
            'BP2',
            'BP1'
        ]
    }
    res.render('controle', {
        title: 'Express',
        dashBoard: dashBoard,
        user: req.session
    });
});

module.exports = router;
