const middy = require('@middy/core')
const jsonBodyParser = require('@middy/http-json-body-parser')
const httpPartialResponse = require('@middy/http-partial-response')
const validator = require('@middy/validator')

const { getFlickrPosts } = require('../data/getFlickrPosts')
const { ErrorWrapper } = require('../../../utils/errorWrapper')

const getFlickrPostsHandler = async (event, context, callback ) => {
  try {
    console.log(JSON.stringify(event))

    const { queryStringParameters } = event

    // in node 14 we could use queryStringParameters?.search but we are running node 12 in lambda
    const { posts, error } = await getFlickrPosts(queryStringParameters && queryStringParameters.search)
    
    if (error)
      throw new Error(error)

    const response = {
      statusCode: 200, 
      body: JSON.stringify(posts),
      headers: { 'Access-Control-Allow-Origin': '*' }
    }
    console.log(response)

    return response
   
  } catch (err){
    return ErrorWrapper(err)
  }
}

// doesn't do much in this case (query parameters always come as string...)
// if the user would be able to mutate something, then input validation is a must
const inputSchema = {
}

const handler = middy(getFlickrPostsHandler)
  .use(jsonBodyParser()) 
  // validates the input
  .use(validator({ inputSchema }))
  // graphql for RestApi... (you can send queryString paramter like this "?fields=id" and it will return only the id)
  .use(httpPartialResponse())

module.exports = { handler }