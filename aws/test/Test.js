
const axios = require('axios')
const assert = require('chai').assert
const expect = require('chai').expect

describe('Posts', function () {

  it('Get Flickr Posts', async function () {
    
    const postsResponse = await getAllPosts()
    assert.strictEqual(postsResponse.status, 200)

    const posts = postsResponse.data
    assert.isArray(posts)

    posts.map(post=>
      // checking if the mapping is lambda is ok
      expect(post).to.have.all.keys('author', 'date', 'title', 'imageUrl', 'flickrUrl')
    )
  })

})

axios.defaults.baseURL = 'https://84672vk6th.execute-api.eu-central-1.amazonaws.com/prod'

const getAllPosts = async () =>{
  const postsResponse = await axios.get('/posts')

  return postsResponse
}