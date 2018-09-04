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
		
		Promise.all(data.teamMembers.map(function (tm) {
			return new Promise(function (resol, rej) {
				let teamMember = new Teammate.model(tm);
				teamMember.save(function (err) {
					if (err) return rej({status: 400, error: err.errors});
					resol(teamMember._id);
				});
			});
		

		})).then(function (teamList) {
			let newRegistration = new Registration.model({
				teamName: data.teamName,
				email: data.email,
				teamMembers: teamList
			});

			console.log(newRegistration);
			
			newRegistration.save(function (err) {
				if (err) return res.json({status: 400, error: err.errors});
				res.json({});
			})
			
			
		}).catch(function (err) {
			res.json(err);
		});
		

		
		
		
	}
};

function saveTeamMember (teamList, tm) {
	let teamMember = new Teammate.model(tm);
	
	teamList.push(teamMember);
}
