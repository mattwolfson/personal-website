var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
	sport: {type: String, required: true},
	year: {type: String, required: true},
	picks: {type: String, required: true},
	scores: {type: String, required: true},
	league: {type: String, required: false},
	user: {type: Schema.Types.ObjectId, ref: 'User'}
});

schema.post('remove', function(picks) {
	User.findById(picks.user, function(err, user) {
		user.picks.pull(picks)
		user.save();
	});
});

module.exports = mongoose.model('Brackets', schema);
