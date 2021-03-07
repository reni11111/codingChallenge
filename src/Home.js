import { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import Search from './Components/Search'
import ImageList from './Components/ImageList'
import { getAllPosts } from './services/Flickr'
import { colors } from './assets/Colors'

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 48
  },
  title: {
    color: colors.yellow,
    fontSize: 36,
    fontWeight: 'bold'
  }
}))

function App() {
  const classes = useStyles()
  const [searchValue, setSearchValue] = useState('')
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function getPosts(){
    setIsLoading(true)
    const allPosts = await getAllPosts(searchValue)
    setPosts(allPosts)
    setIsLoading(false)
  }

  useEffect(()=>{
    getPosts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.container}>
      <div className={classes.title}>Watch Everything</div>

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
    </Grid>
  )
}

export default App
