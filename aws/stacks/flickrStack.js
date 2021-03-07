const cdk = require('@aws-cdk/core')
const lambda = require('@aws-cdk/aws-lambda')
const { WebpackFunction } = require('aws-cdk-webpack-lambda-function')
const apiGateway = require('@aws-cdk/aws-apigateway')

class FlickrStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props)

    // create 1 lambda
    const getFlickrPosts = new WebpackFunction(this, 'getFlickrPosts', {
      runtime: lambda.Runtime.NODEJS_12_X,
      entry: 'lambda/Flickr/handler/getFlickrPostsHandler.js',
      config: 'webpack.config.js',
      functionName: 'getFlickrPosts'
    })

    // API GATEWAY section
    const api = new apiGateway.RestApi(this, 'flickr-api', {
      // allow cors
      defaultCorsPreflightOptions: {
        allowOrigins: apiGateway.Cors.ALL_ORIGINS,
        allowMethods: apiGateway.Cors.ALL_METHODS
      }
    })

    // creates the route /posts
    const flickrApi = api.root.addResource('posts')

    // method getPosts
    const getFlickrPostsIntegration = new apiGateway.LambdaIntegration(getFlickrPosts)
    flickrApi.addMethod('GET', getFlickrPostsIntegration)
  }
}

module.exports = {
  FlickrStack
}