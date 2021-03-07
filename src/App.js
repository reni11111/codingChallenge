import { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import './App.css'
import Search from './Components/Search'
import ImageList from './Components/ImageList'
import { getAllPosts } from './services/Flickr'

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 48
  },
  title: {
    color: '#F1C24A',
    fontSize: 36,
    fontWeight: 'bold'
  }
}))

function App() {
  const classes = useStyles()
  const [searchValue, setSearchValue] = useState('')
  const [posts, setPosts] = useState([])

  async function getPosts(){
    const allPosts = await getAllPosts()
    setPosts(allPosts)
  }

  useEffect(()=>{
    getPosts()
  }, [])

  return (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.container}>
      <div className={classes.title}>Find your favorite food</div>
      <Search
        placeholder="Search for photos..."
        value={searchValue}
        setValue={setSearchValue}
        onSearchClick={()=>getPosts()}
      />
      <ImageList
        posts={posts}
      />
    </Grid>
  )
}

export default App
