var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Hacker Model
 * ==========
 */

var Hacker = new keystone.List('Hacker');

Hacker.add({
	name: { type: Types.Name, required: true, index: true },
	username : { type: Types.Text, required: true, index: true, initial: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
Hacker.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});


/**
 * Registration
 */

Hacker.defaultColumns = 'name, email, isAdmin';
Hacker.register();
