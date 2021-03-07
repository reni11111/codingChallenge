import axios from 'axios'
axios.defaults.baseURL = 'https://84672vk6th.execute-api.eu-central-1.amazonaws.com/prod'

export const getAllPosts = async (searchValue) =>{
  let newSearchValue = searchValue==='' ? null: searchValue

  const postsResponse = await axios.get('/posts', {
    params: newSearchValue && {
      search: newSearchValue
    }
  })
 
  return postsResponse.data
}