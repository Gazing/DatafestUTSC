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
	body: { type: Types.Html, required: true, initial: true},
	prize1Image: { type: Types.CloudinaryImage, initial: true},
	prize1TeamName: { type: String, initial: true},
	prize1Members: { type: Types.TextArray, initial: true},
	prize2Image: { type: Types.CloudinaryImage, initial: true},
	prize2TeamName: { type: String, initial: true},
	prize2Members: { type: Types.TextArray, initial: true},
	prize3Image: { type: Types.CloudinaryImage, initial: true},
	prize3TeamName: { type: String, initial: true},
	prize3Members: { type: Types.TextArray, initial: true},
	galleryLink: { type: Types.Url, required: false, initial: true},
	
	sponsors: { type: Types.CloudinaryImages, required: false, initial: true},
	createdAt: { type: Date, default: Date.now }
});

PastEvent.defaultColumns = 'title, createdAt';
PastEvent.register();
