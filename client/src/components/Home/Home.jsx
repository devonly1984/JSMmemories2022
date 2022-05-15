import { AppBar, Button, Container, Grid, Grow, Paper, TextField } from "@material-ui/core"
import { useHistory, useLocation } from 'react-router-dom';

import ChipInput from 'material-ui-chip-input'
import Form from "../Form/Form"
import Paginate from '../Pagination/Pagination';
import Posts from "../Posts/Posts"
import { getPostBySearch } from "../../redux/post/postActions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import useStyles from './styles';

const useQuery = () => {
	return new URLSearchParams(useLocation.search);
}
const Home = () => {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();
	const query = useQuery();
	const [currentId, setCurrentId] = useState(null);
	const [search,setSearch]=  useState('')
	const page = query.get('page') || 1;
	const searchQuery = query.get('searchQuery')
	const [tags,setTags] = useState([])
	
	const handleKeyPress = e => {
		if (e.keyCode === 13) {
			searchPost()
		}
	}
	const handleAdd = tag => {
		setTags([...tags,tag])
	}
	const handleDelete = tagtoDelete => {
		setTags([tags.filter(t=> t!==tagtoDelete)])
	}
	const searchPost = () => {
		if (search.trim() || tags) {
			
			dispatch(getPostBySearch({ search, tags: tags.join(',') }))
			history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
		} else {
			history.push('/');
		}
	}
  return (
    <Grow in>
				<Container maxWidth="xl">
					<Grid
						container
						justifyContent="space-between"
						spacing={3}
						alignItems="stretch"
						className={classes.gridContainer}
					>
						<Grid item xs={12} sm={6} md={9}>
							<Posts currentId={currentId} setCurrentId={setCurrentId} />
						</Grid>
				  <Grid item xs={12} sm={6} md={3}>
					  <AppBar className={classes.appBarSearch} position="static" color="inherit">
						  <TextField
							  name="search"
							  variant="outlined"
							  label="Search Memories"
							  value={search}
							  onKeyPress={handleKeyPress}
							  onChange={(e) => { setSearch(e.target.value)}}
							  fullWidth />
						  <ChipInput
							  style={{ margin: '10px 0' }}
							  value={tags}
							  onAdd={ handleAdd}
							  onDelete={handleDelete }
							  label="Search Tags"
							  variant="outlined"

						  />
						  <Button variant="contained" onClick={searchPost} className={classes.searchButon} color="primary"> Search</Button>
					  </AppBar>
					  <Form currentId={currentId} setCurrentId={setCurrentId} />
					  {!searchQuery && !tags.length && <Paper className={classes.pagination} elevation={6}>
						  <Paginate className={classes.pagination} page={page} />
						  </Paper>}
					  
						</Grid>
					</Grid>
				</Container>
			</Grow>
  )
}

export default Home