var keystone = require('keystone');
var Types = keystone.Field.Types;

var Snippet = new keystone.List('Snippet');

Snippet.add({
	name: { type: String, required: true, initial: true, index: true },
	content: { type: Types.Textarea, required: true, initial: true}
});

Snippet.defaultColumns = 'name, content';
Snippet.register();
