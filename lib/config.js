var convict = require('convict');
var conf = convict({
	provider: {
		doc: 'The provider to upload to',
		format: ['s3'],
		default: 's3',
		env: 'METALSMITH_USE'
	},
	bucket: {
		doc: 'The s3 bucket to push files to',
		format: String,
		env: 'METALSMITH_BUCKET'
	},
	awsKey: {
		doc: 'The AWS key to use for s3',
		format: String,
		env: 'AWS_ACCESS_KEY_ID'
	},
	awsSecret: {
		doc: 'The AWS secret key to use for s3',
		format: String,
		env: 'AWS_ACCESS_KEY_ID'
	}
});

module.exports = function loadConf(confObj) {
	// Load config object into convict
	conf.load(confObj);
	// Perform validation
	conf.validate({strict: true});
	return conf;
};
