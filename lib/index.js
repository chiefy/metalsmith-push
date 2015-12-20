var config;

function main(files, ms, done) {
	var provider = require('./providers/' + config.get('provider'))(config);
	provider
		.push(files)
		.then(function onSuccess(files) {
			files.forEach(function logFile(file) {
				console.log('Successfully uploaded "' + file + '"');
			});
			done();
		})
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
