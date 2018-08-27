var keystone = require('keystone');
var Types = keystone.Field.Types;

var Schedule = new keystone.List('Schedule');

Schedule.add({
	name: { type: String, required: true, initial: true, index: true },
	location: { type: String, required: true, initial: true },
	start: { type: Types.Datetime, required: true, initial: true },
	end: { type: Types.Datetime, required: true, initial: true },
});

Schedule.defaultColumns = 'name, location, start, end';
Schedule.register();
