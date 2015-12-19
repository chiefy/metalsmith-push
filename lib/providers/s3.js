var AWS = require('aws-sdk');
var Promise = require('bluebird');
var Provider = require('./baseProvider');

function S3Provider(config) {
	Provider.call(this, config);
}

S3Provider.prototype.push = function push(files) {
	return new Promise(function (resolve, reject) {
		console.dir(files);
		resolve();
	});
};

module.exports = function s3Factory(config) {
	return new S3Provider(config);
};
