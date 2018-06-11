var keystone = require('keystone'),
	PastEvent = keystone.list('PastEvent'),
	Snippet = keystone.list('Snippet'),
	Registration = keystone.list('Registration');

var helper = require('../../helpers');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'pastevents';

	// Render the view
	var data = {};

	PastEvent.model.find()
		.limit(10)
		.exec()
		.then(function(pastEvents) {
			data.pastEvents = pastEvents;
			return Snippet.model.find().exec();
		}).then(function (snippets) {

		snippets.forEach(function (snippet) {
			data[snippet.name] = snippet.content;
		});

		view.render('pastEvent', data);

	});

	

};
