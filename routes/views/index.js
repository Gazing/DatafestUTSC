var keystone = require('keystone'),
	PastEvent = keystone.list('PastEvent'),
	Snippet = keystone.list('Snippet'),
	Sponsor = keystone.list('Sponsor');
	Schedule = keystone.list('Schedule');
	
var helper = require('../../helpers');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	// Render the view
	var data = {};
	
	PastEvent.model.find()
		.limit(10)
		.exec()
		.then(function(pastEvents) {
			data.pastEvents = [];
			pastEvents.forEach(function (event) {
				var pe = {};
				pe.title = event.title;
				
				data.pastEvents.push(pe);
			});
			return Snippet.model.find().exec();
		}).then(function (snippets) {
			data.snippets = {};
			snippets.forEach(function (snippet) {
				data.snippets[snippet.name] = snippet.content;
			});
			
			return Schedule.model.find().exec();
		}).then(function (schedules) {
			data.schedule = schedules;
			return Sponsor.model.find().exec();
		}).then(function (sponsors) {
			sponsorImages = [];
			sponsors.forEach(function (sponsor) {
				sponsorImages.push(sponsor.image);
			});
			
			data.sponsors = sponsorImages;

			view.render('index', data);
		});
	
	
};
