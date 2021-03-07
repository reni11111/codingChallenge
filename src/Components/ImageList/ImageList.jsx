import { makeStyles, useTheme } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'

import useMediaQuery from '@material-ui/core/useMediaQuery'


const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    marginTop: 48,
    maxWidth: '100%'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}))


export default function ImageList(props) {
  const classes = useStyles()
  const theme = useTheme()
  const mobileWidth = useMediaQuery(theme.breakpoints.down('xs'))
  const tabletWidth = useMediaQuery(theme.breakpoints.down('sm'))

  const { posts } = props
  
  return (
    <div className={classes.root}>
      <GridList 
        cellHeight={300}
        // cellHeight={'auto'}
        cols={tabletWidth || mobileWidth ? (mobileWidth ? 1 : 2) : 3}
        className={classes.gridList}
      >
        {posts.map((post) => (
          <GridListTile 
            key={post.imageUrl}
          >
            <img src={post.imageUrl} alt={post.title} />
            <GridListTileBar
              title={post.title}
              subtitle={<span>by: {post.author}</span>}
              actionIcon={
                <IconButton 
                  aria-label={`info about ${post.title}`} 
                  className={classes.icon}
                  onClick={()=>window.open(post.flickrUrl)}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}
