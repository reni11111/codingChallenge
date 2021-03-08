import { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert/Alert'

import Title from './Components/Title'
import Search from './Components/Search'
import ImageList from './Components/ImageList'
import { getAllPosts } from './services/Flickr'
import emptyGif from './assets/img/empty.gif'

function App() {
  const [searchValue, setSearchValue] = useState('')
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isResponseEmpty, setIsResponseEmpty] = useState(false)

  async function getPosts(){
    try {
      setIsLoading(true)
      const allPosts = await getAllPosts(searchValue)
      setPosts(allPosts)
      setIsResponseEmpty(allPosts.length===0)
      setIsLoading(false)
    } catch (err){
      setIsError(true)
      setIsLoading(false)
      setPosts([])
    }
  }

  useEffect(()=>{
    getPosts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Title />

      <Search
        placeholder="Search for photos..."
        value={searchValue}
        setValue={setSearchValue}
        onSearchClick={getPosts}
        isLoading={isLoading}
      />

      <ImageList
        posts={posts}
      />

      {isError &&       
        <Alert variant="filled" severity="error">
          Something went wrong!
        </Alert>
      }

      {isResponseEmpty &&
        <>
          <img src={emptyGif} alt="results empty"/><br />
          <Alert variant="filled" severity="info">
            No photos found, please try another keyword!
          </Alert>
        </>
      }
    </Grid>
  )
}

export default App
