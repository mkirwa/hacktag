var keystone = require('keystone');
var Hacker = keystone.list('Hacker');

exports = module.exports = function(req, res) {

	// if (req.user && req.user.isAdmin) {
	// 	return res.redirect(req.cookies.target || '/keystone');
	// } else if(req.user) {
	// 	return res.redirect(req.cookies.target || '/users/hacker');
	// }

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'login';

	view.on('post', { action: 'hacker.login' }, function(next) {
		var formData = req.body || formData;

		if (!formData.email || !formData.password) {
			console.log(formData)
			req.flash('error', 'Please enter your email/username and password.');
			return next();
		}

		var onSuccess = function() {
			if (req.body.target && !/join|signin/.test(req.body.target)) {
				console.log('[signin] - Set target as [' + req.body.target + '].');
				res.redirect(req.body.target);
			} else {
				console.log('logged in');
				res.redirect('/')
			}
		}

		var onFail = function() {
			console.log(formData);
			req.flash('error', 'Your username or password were incorrect, please try again.');
			return next();
		}

		keystone.session.signin({ email: formData.email, password: formData.password }, req, res, onSuccess, onFail);
	});

	view.render('users/login');
}
