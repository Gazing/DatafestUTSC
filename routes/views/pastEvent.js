var keystone = require('keystone'),
	PastEvent = keystone.list('PastEvent'),
	Snippet = keystone.list('Snippet'),
	Registration = keystone.list('Registration');

var helper = require('../../helpers');

exports = module.exports = {
	pastEventsPage: function (req, res) {

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



	},
	pastEventAPI: function (req, res) {
		let eventName = req.params.name.replace("-", " ");
		
		PastEvent.model.findOne({title: eventName})
			.exec()
			.then(function (pastEvent) {
				let intro = {};
				intro.header = pastEvent.header;
				intro.body = pastEvent.body;
				
				let awards = {
					prize1: {},
					prize2: {},
					prize3: {}
				};
				
				awards.prize1.teamName = pastEvent.prize1TeamName;
				awards.prize1.team = pastEvent.prize1Members;
				awards.prize2.teamName = pastEvent.prize2TeamName;
				awards.prize2.team = pastEvent.prize2Members;
				awards.prize3.teamName = pastEvent.prize3TeamName;
				awards.prize3.team = pastEvent.prize3Members;
				
				let sponsors = pastEvent.sponsors;
				
				let data = {};
				data.intro = intro;
				data.awards = awards;
				data.galleryLink = pastEvent.galleryLink;
				data.sponsors = sponsors;
				
				res.json(data);
			})
		
	}
};
