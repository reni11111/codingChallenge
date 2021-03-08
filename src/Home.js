import { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert/Alert'

import Search from './Components/Search'
import ImageList from './Components/ImageList'
import { getAllPosts } from './services/Flickr'
import colors from './assets/Colors'

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: 48,
    marginBottom: 30,
    color: colors.yellow,
    fontSize: 64,
    fontWeight: 'bold',
    [theme.breakpoints.down('lg')]: {
      marginTop: 32,
      fontSize: 48,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 24,
      marginBottom: 24,
      fontSize: 32,
    },

  }
}))

function App() {
  const classes = useStyles()
  const [searchValue, setSearchValue] = useState('')
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  async function getPosts(){
    try {
      setIsLoading(true)
      const allPosts = await getAllPosts(searchValue)
      setPosts(allPosts)
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
      <div className={classes.title}>Image Engine</div>

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
    </Grid>
  )
}

export default App
