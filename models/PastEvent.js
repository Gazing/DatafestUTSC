var keystone = require('keystone');
var Types = keystone.Field.Types;

var PastEvent = new keystone.List('PastEvent', {
	autokey: { path: 'slug', from: 'title', unique: true },
	map: { name: 'title' },
	defaultSort: '-createdAt'
});

PastEvent.add({
	title: { type: String, required: true, initial: true, index: true },
	body: { type: Types.Html, required: true, initial: true},
	firstPlaceImage: { type: Types.CloudinaryImage, required: true, initial: true},
	firstPlaceName: { type: String, required: true, initial: true},
	secondPlaceImage: { type: Types.CloudinaryImage, required: true, initial: true},
	secondPlaceName: { type: String, required: true, initial: true},
	thirdPlaceImage: { type: Types.CloudinaryImage, required: true, initial: true},
	thirdPlaceName: { type: String, required: true, initial: true},
	galleryLink: { type: Types.Url, required: false, initial: true},
	sponsors: { type: Types.CloudinaryImages, required: false, initial: true},
	createdAt: { type: Date, default: Date.now }
});

PastEvent.defaultColumns = 'title, body';
PastEvent.register();
