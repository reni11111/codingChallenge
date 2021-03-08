import { makeStyles, useTheme } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import colors from './../../assets/Colors'

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    marginTop: 64,
    maxWidth: '100%',
    [theme.breakpoints.down('lg')]: {
      marginTop: 48,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 32,
    },
  },
  icon: {
    color: colors.lightGray,
  },
  imageTitle: {
    fontSize: 24,
    lineHeight: 'normal',
    fontWeight: 'bold',
    [theme.breakpoints.down('lg')]: {
      fontSize: 22,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
  imageSubtitle: {
    fontSize: 16,
    lineHeight: 'normal',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  }
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
        
        cols={tabletWidth || mobileWidth ? (mobileWidth ? 1 : 2) : 3}
        className={classes.gridList}
      >
        {posts.map((post) => (
          <GridListTile 
            key={post.imageUrl}
          >
            <img src={post.imageUrl} alt={post.title} />
            <GridListTileBar
              classes={{
                title: classes.imageTitle,
                subtitle: classes.imageSubtitle
              }}
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
