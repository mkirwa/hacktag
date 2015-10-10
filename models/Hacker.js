var keystone = require('keystone');
var Types = keystone.Field.Types;
var keystoneRest = require('keystone-rest');

/**
 * Hacker Model
 * ==========
 */

var Hacker = new keystone.List('Hacker');

Hacker.add({
	name: { type: Types.Name, required: true, index: true },
	username : { type: Types.Text, required: true, index: true, initial: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	token: { type: String, restEditable: true }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true, default: false }
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

// Add user api endpoints
keystoneRest.addRoutes(Hacker, 'list show create update delete', {
	list: [function (req, res, next) { res.header('list middleware', 'executed'); next(); }],
	show: [function (req, res, next) { res.header('show middleware', 'executed'); next(); }],
	create: [function (req, res, next) {res.header('create middleware', 'executed'); next(); }],
	update: [function (req, res, next) { res.header('update middleware', 'executed'); next(); }],
	delete: [function (req, res, next) { res.header('delete middleware', 'executed'); next(); }],
	post: [function (req, res, next) { res.header('post middleware', 'executed'); next(); }]
}, 'posts');

// Add routes to app
keystoneRest.registerRoutes(keystone.app);
