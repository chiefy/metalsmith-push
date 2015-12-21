# metalsmith-push
push / publish your metalsmith-generated files somewhere else

## Installation
```bash
$ npm install --save metalsmith-push
```

## Providers
Supported providers:
  * s3

## Config

### s3
```
s3 : {
  bucket: 'bucket-name',
  awsKey: 'AWS access key', // or use AWS_ACCESS_KEY_ID env var
  awsSecret: 'AWS secret token' // or use AWS_SECRET_ACCESS_KEY env var
}
```


## Example
```
var Metalsmith = require('metalsmith');
var metalsmithPush = require('metalsmith-push');

var s3conf = {
	bucket: 'my-bucket',
	awsKey: 'DFJO90WFEFWEF(WE)(ELJKKJEEEJENNNAMLP',
	awsSecret: 'ZDFW$lFDD(WlP{WDDELJFMZLLOPWDDDWDF'
};

Metalsmith(__dirname)
	.use(metalsmithPush({
		provider: 's3',
		s3: s3conf
	}))
	.build(function cb(err) {
		if(err) {
			console.err(err);
		}
	});

```

## Tests
```bash
$ npm test
```
