var keystone = require('keystone');
var Types = keystone.Field.Types;

var Teammate = new keystone.List('Teammate');

Teammate.add({
	name: { type: Types.Name, required: true, initial: true, index: true },
	year: { type: String, required: true, initial: true },
	program: { type: String, required: true, initial: true },
	campus: { type: String, required: true, initial: true },
	submittedAt: { type: Date, default: Date.now }
});

Teammate.defaultColumns = 'name, year, program, campus';
Teammate.register();
