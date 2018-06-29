var keystone = require('keystone'),
	PastEvent = keystone.list('PastEvent'),
	Snippet = keystone.list('Snippet'),
	Registration = keystone.list('Registration'),
	Teammate = keystone.list('Teammate');

var helper = require('../../helpers');

exports = module.exports = {
	registrationPage: function (req, res) {

		var view = new keystone.View(req, res);
		var locals = res.locals;

		// locals.section is used to set the currently selected
		// item in the header navigation.
		locals.section = 'registration';

		// Render the view
		var data = {};

		locals.formData = req.body || {};

		PastEvent.model.find()
			.limit(10)
			.exec()
			.then(function (pastEvents) {
				data.pastEvents = pastEvents;
				return Snippet.model.find().exec();
			}).then(function (snippets) {

			snippets.forEach(function (snippet) {
				data[snippet.name] = snippet.content;
			});

			view.render('register', data);

		});


		view.on("post", function (next) {
			console.log(req);
			var newRegistration = new Registration.model({
				teamName: locals.formData.teamName,
				teamMember1: locals.formData.teamMember1,
				teamMember2: locals.formData.teamMember2,
				teamMember3: locals.formData.teamMember3
			});

			newRegistration.save(function (err, result) {
				if (err) console.log(err.errors);
				next();
			})
		})


	},
	registrationSubmit: function (req, res) {
		
		let data = req.body;
		
		console.log(data);
		
		let tm1 = new Teammate.model(data.tm1);

		let tm2 = new Teammate.model(data.tm2);

		let tm3 = new Teammate.model(data.tm3);
		
		let newRegistration = new Registration.model({
			teamName: data.teamName,
			email: data.email,
			teamMember1: tm1._id,
			teamMember2: tm2._id,
			teamMember3: tm3._id
		});
		
		console.log(newRegistration);

		tm1.save(function (err, result) {
			if (err) return res.status(400).json({status: 400, error: err.errors});
			tm2.save(function (err, result) {
				if (err) return res.status(400).json({status: 400, error: err.errors});
				tm3.save(function (err, result) {
					if (err) return res.status(400).json({status: 400, error: err.errors});
					newRegistration.save(function (err, result) {
						if (err) return res.status(400).json({status: 400, error: err.errors});
						res.json({});
					})
				})
			})
		});
		
	}
};
