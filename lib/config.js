var convict = require('convict');
var confSchema = {
	provider: {
		doc: 'The provider to upload to',
		format: ['s3'],
		default: 's3',
		env: 'METALSMITH_USE'
	},
	s3: {
		bucket: {
			doc: 'The s3 bucket to push files to',
			format: String,
			default: null,
			env: 'METALSMITH_BUCKET'
		},
		awsKey: {
			doc: 'The AWS key to use for s3',
			format: String,
			default: null,
			env: 'AWS_ACCESS_KEY_ID'
		},
		awsSecret: {
			doc: 'The AWS secret key to use for s3',
			format: String,
			default: null,
			env: 'AWS_SECRET_ACCESS_KEY'
		}
	}
};

module.exports = function loadConf(confObj) {
	var conf = convict(confSchema);
	// Load config object into convict
	conf.load(confObj);
	// Perform validation
	conf.validate({
		strict: true
	});
	return conf;
};
