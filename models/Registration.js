var keystone = require('keystone');
var Types = keystone.Field.Types;

var Registration = new keystone.List('Registration');

Registration.add({
	teamName: { type: String, required: true, initial: true, index: true },
	email: { type: Types.Email, required: true, initial: true, index: true },
	teamMember1: { type: Types.Relationship, ref: "Teammate", required: true, initial: true },
	teamMember2: { type: Types.Relationship, ref: "Teammate", required: true, initial: true },
	teamMember3: { type: Types.Relationship, ref: "Teammate", initial: true },
	submittedAt: { type: Date, default: Date.now }
});

Registration.defaultColumns = 'teamName, email, teamMember1, teamMember2, teamMember3';
Registration.register();
