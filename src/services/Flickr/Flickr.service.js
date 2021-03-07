import axios from 'axios'
import { extractAuthor } from './../../utils'

export const getAllPosts = async () =>{
  const allPostsResponse = await axios.get('https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1')
  console.log(allPostsResponse.data)
 
  const allPosts = allPostsResponse.data.items.map(imgItem=>{
    let { author, media, title, published, link } = imgItem
    return {
      author: extractAuthor(author),
      imageUrl: media.m,
      title: title,
      date: published,
      flickrUrl: link
    }
  })
  return allPosts
}