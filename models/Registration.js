var keystone = require('keystone');
var Types = keystone.Field.Types;

var Registration = new keystone.List('Registration');

Registration.add({
	teamName: { type: String, required: true, initial: true, index: true },
	email: { type: Types.Email, required: true, initial: true, index: true },
	teamMembers: { type: Types.Relationship, ref: "Teammate", required: true, initial: true, many: true },
	submittedAt: { type: Date, default: Date.now }
});

Registration.defaultColumns = 'teamName, email';
Registration.register();
