var test = require('tape');
var config = require('../lib/config');

test('configuration', function (t) {
	var conf;
	var s3Conf = {
		bucket: 'mybucket',
		awsKey: 'lksjfdlakjsdflkjasdflkjasdlf',
		awsSecret: 'asdfasdfasdfasdfasdfasdfadsf'
	};
	var validConf = {
		provider: 's3',
		s3: s3Conf
	};
	var invalidConf = {
		provider: 'none'
	};

	function shouldThrow() {
		config(invalidConf);
	}
	function emptyShouldThrow() {
		config({});
	}
	function shouldNotThrow() {
		conf = config(validConf);
	}

	t.throws(shouldThrow);
	t.throws(emptyShouldThrow);
	t.doesNotThrow(shouldNotThrow);
	t.equal(conf.get('provider'), 's3');
	t.equal(conf.get('s3').bucket, s3Conf.bucket);

	t.end();
});
