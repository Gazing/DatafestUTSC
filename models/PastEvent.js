var keystone = require('keystone');
var Types = keystone.Field.Types;

var PastEvent = new keystone.List('PastEvent', {
	autokey: { path: 'slug', from: 'title', unique: true },
	map: { name: 'title' },
	defaultSort: '-createdAt'
});

PastEvent.add({
	title: { type: String, required: true, initial: true, index: true },
	header: { type: String, required: true, initial: true },
	body: { type: Types.Html },
	prize1Image: { type: Types.CloudinaryImage },
	prize1TeamName: { type: String },
	prize1Members: { type: Types.TextArray },
	prize2Image: { type: Types.CloudinaryImage },
	prize2TeamName: { type: String },
	prize2Members: { type: Types.TextArray },
	prize3Image: { type: Types.CloudinaryImage },
	prize3TeamName: { type: String },
	prize3Members: { type: Types.TextArray },
	galleryLink: { type: Types.Url },
	
	sponsors: { type: Types.CloudinaryImages},
	createdAt: { type: Date, default: Date.now }
});

PastEvent.defaultColumns = 'title, createdAt';
PastEvent.register();
