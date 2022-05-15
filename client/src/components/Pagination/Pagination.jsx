import { Pagination, PaginationItem } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { getPosts } from '../../redux/post/postActions';
import { useEffect } from 'react';
import useStyles from './styles';

const Paginate = ({page}) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { numberofPage } = useSelector(state => state.posts);

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  },[page])
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberofPage}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )
        
      }
    />
  )
}

export default Paginate