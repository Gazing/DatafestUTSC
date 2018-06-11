var keystone = require('keystone');
var Types = keystone.Field.Types;

var Registration = new keystone.List('Registration');

Registration.add({
	teamName: { type: String, required: true, initial: true, index: true },
	teamMember1: { type: String, required: true, initial: true },
	teamMember2: { type: String, required: true, initial: true },
	teamMember3: { type: String, required: true, initial: true },
	submittedAt: { type: Date, default: Date.now }
});

Registration.defaultColumns = 'Team Name, Team Member #1, Team Member #2, Team Member #3';
Registration.register();
