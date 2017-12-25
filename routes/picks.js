var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Picks = require('../models/picks');
var Brackets = require('../models/brackets');

router.get('/', function(req, res, next) {
    Picks.find()
        .populate('user', 'firstName lastName')
        .exec(function(err, messages) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                })
            }
            res.status(200).json({
                message: 'Success',
                obj: messages
            })
        });
});

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            })
        }
        var picks = new Picks({
            sport: req.body.sport,
            year:  req.body.year,
            week:  req.body.week,
            picks:  req.body.picks,
            league:  req.body.league,
            user: user
        });
        picks.save(function(err, result) {
        	if (err) {
        		return res.status(500).json({
        			title: 'An error occurred',
        			error: err
        		})
        	}
            user.picks.push(result);
            user.save();
        	res.status(201).json({
        		message: 'Saved Picks',
        		obj: result
        	});
        });
    });
});

router.get('/bracket', function(req, res, next) {
    Brackets.find()
        .populate('user', 'firstName lastName')
        .exec(function(err, messages) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                })
            }
            res.status(200).json({
                message: 'Success',
                obj: messages
            })
        });
});

router.post('/bracket', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            })
        }
        var bracketPicks = new Brackets({
            sport: req.body.sport,
            year:  req.body.year,
            picks:  req.body.picks,
            scores:  req.body.scores,
            league:  req.body.league,
            user: user
        });
        bracketPicks.save(function(err, result) {
        	if (err) {
        		return res.status(500).json({
        			title: 'An error occurred',
        			error: err
        		})
        	}
            user.bracketPicks.push(result);
            user.save();
        	res.status(201).json({
        		message: 'Saved Bracket Picks',
        		obj: result
        	});
        });
    });
});

module.exports = router;
