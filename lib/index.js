var config;

function main(files, metalsmith, done) {
	var provider = require('./providers/' + config.get('provider'))(config);
	provider
		.push(files)
		.then(done)
		.catch(done);
}

module.exports = function plugin(options) {
	options = options || {};
	try {
		config = require('./config')(options);
	} catch (ex) {
		return function (files, ms, done) {
			done(new Error('metalsmith-push | ' + ex.message));
		};
	}
	return main;
};
