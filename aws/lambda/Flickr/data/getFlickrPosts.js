const axios = require('axios')
const { extractAuthor } = require('./../../../utils/extractText')
const { errors } = require('../../../utils/errors')

// To consume this method use const {posts, error} = await getFlickrPosts(...)
// this function doesn't throw the error, it RETURNS it so you will have the power to 
// handle the error by yourself at the place you are using it

const getFlickrPosts = async (searchValue) => {
  try {
    const postsResponse = await axios.get('https://api.flickr.com/services/feeds/photos_public.gne?', {
      params: {
        format: 'json',
        nojsoncallback: 1,
        // adding this default tag ifs no search, because when no tags the flicker api was returning some 
        // disturbing photos...
        tags: searchValue || 'birds',
      }
    })
   
    const posts = postsResponse.data.items.map(imgItem=>{
      let { author, media, title, published, link } = imgItem
      return {
        author: extractAuthor(author),
        imageUrl: media.m,
        title: title,
        date: published,
        flickrUrl: link
      }
    })
    return {
      posts
    }
  } catch (error){
    console.log('Error getting posts')
    console.log(error)
    let errorMessage = errors.GeneralError.errorKey
    // based on the business logic => on here add more conditions for errors
    return {
      error: errorMessage
    }
  }
}

module.exports = {
  getFlickrPosts
}