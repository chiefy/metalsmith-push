var Promise = require('bluebird');

module.exports = Provider;
function Provider(config) {
	this.config = config;
	this.type = config.get('provider');
}
Provider.prototype.push = function push() {
	return Promise.reject('Nothing to do with push');
};
