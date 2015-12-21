var AWS = require('aws-sdk');
var _ = require('lodash');
var Promise = require('bluebird');
var Provider = require('./baseProvider');
var mime = require('mime-tyes');

function S3Provider(config) {
	Provider.call(this, config);
	this.s3 = Promise.promisifyAll(
		new AWS.S3({
			accessKeyId: config.get('s3').awsKey,
			secretAccessKey: config.get('s3').awsSecret
		})
	);
	this.bucket = config.get('s3').bucket;
}

S3Provider.prototype.uploadFileAsync = function uploadFileAsync(key) {
	var file = this.files[key];
	var mimeType = mime.lookup(key);
	console.log('Uploading file "' + key + '" to s3 bucket "' + this.bucket + '"');
	return this.s3.putObjectAsync({
		Bucket: this.bucket,
		Key: key,
		Body: file.contents,
		ContentType: mimeType
	})
	.then(function onSuccess() {
		return key;
	});
};

S3Provider.prototype.uploadToS3 = function uploadToS3() {
	return Promise.all(_.keys(this.files).map(this.uploadFileAsync.bind(this)));
};

S3Provider.prototype.headBucket = function headBucket() {
	return this.s3.headBucketAsync({
		Bucket: this.bucket
	})
	.bind(this)
	.catch(function onError(err) {
		throw new Error('Could not head s3 bucket "' + this.bucket + '", ERROR: ' + err);
	});
};

S3Provider.prototype.push = function push(files) {
	this.files = files;
	return this
		.headBucket()
		.then(this.uploadToS3);
};

module.exports = function s3Factory(config) {
	return new S3Provider(config);
};
