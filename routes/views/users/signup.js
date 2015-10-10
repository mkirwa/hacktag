var keystone = require('keystone');
var Hacker = keystone.list('Hacker');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'signup';

	view.on('post', { action: 'hacker.signup' }, function(next) {
		Hacker.model().getUpdateHandler(req).process(req.body, {
			fields: 'name, username, email, password',
			flashErrors: true
		}, function(err) {
			if(err) throw err;

			res.redirect('/');
		});
	});

	view.render('users/signup');
}
