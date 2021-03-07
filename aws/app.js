const cdk = require('@aws-cdk/core')
const { FlickrStack } =  require('./stacks/flickrStack')

const app = new cdk.App()

const flickrStack = new FlickrStack(app, 'FlickrStack',)