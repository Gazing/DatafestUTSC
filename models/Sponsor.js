var keystone = require('keystone');
var Types = keystone.Field.Types;

var Sponsor = new keystone.List('Sponsor');

Sponsor.add({
	name: { type: String, required: true, initial: true, index: true },
	image: { type: Types.CloudinaryImage, required: true, initial: true}
});

Sponsor.defaultColumns = 'name, image';
Sponsor.register();
