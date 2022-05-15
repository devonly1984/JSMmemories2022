import { CircularProgress, Divider, Paper, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';

import {getPost} from "../../../redux/post/postActions"
import moment from 'moment';
import { useEffect } from 'react';
import useStyles from './styles';

const PostDetails = () => {
    const classes = useStyles();
  const { post, posts, isLoading } = useSelector(state => state.posts)
    const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  
  useEffect(() => {

         dispatch(getPost(id));
  }, [id])
  if (!post) return null;
  if (isLoading) {
    return <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size="7em"/>
    </Paper>
  }
  return (
    <Paper style={{ padding: '20px', borderRadius: '15px', }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0 ' }} />
          <Typography variant="body1"><strong>RealTime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          
        </div>
        <div className={classes.imageSection}>
          <img src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} className={classes.media} alt={post.title}/>
        </div>
      </div>
      {/* Recommended Posts*/}
    </Paper>
      
  )
}

export default PostDetails