import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { createPost, updatePost } from "../../redux/post/postActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import FileBase from "react-file-base64";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
	const classes = useStyles();
	const user = JSON.parse(localStorage.getItem("profile"));
	const post = useSelector((state) =>
		currentId ? state.posts.find((p) => p._id === currentId) : null
	);
	const [postData, setPostData] = useState({
		title: "",
		message: "",
		selectedFile: "",
		tags: "",
	});
	const dispatch = useDispatch();
	useEffect(() => {
		if (post) {
			setPostData(post);
		}
	}, [post]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (currentId === 0) {
			dispatch(
				updatePost(currentId, { ...postData, name: user?.result?.name })
			);
		} else {
			dispatch(createPost({ ...postData, name: user?.result?.name }));
		}
		clear();
	};
	const clear = () => {
		setCurrentId(0);
		setPostData({
			title: "",
			message: "",
			selectedFile: "",
			tags: "",
		});
	};
	if (!user?.result?.name) {
		return (<Paper className={classes.paper}>
			<Typography variant="h6" align="center">
				{" "}
				Please Sign in to create your own memories and to like others
			</Typography>
		</Paper>)
	}
	return (
		<Paper className={classes.paper} elevation={6}>
			<form
				noValidate
				autoComplete="off"
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}>
				<Typography variant="h6">
					{currentId ? "Editing" : "Creating"} a memory
				</Typography>

				<TextField
					label="Title"
					name="title"
					variant="outlined"
					value={postData.title}
					onChange={(e) => setPostData({ ...postData, title: e.target.value })}
					fullWidth
				/>
				<TextField
					label="Message"
					name="message"
					variant="outlined"
					value={postData.message}
					onChange={(e) =>
						setPostData({ ...postData, message: e.target.value })
					}
					fullWidth
				/>
				<TextField
					label="Tags"
					name="creator"
					variant="outlined"
					value={postData.tags}
					onChange={(e) =>
						setPostData({ ...postData, tags: e.target.value.split(",") })
					}
					fullWidth
				/>
				<div className={classes.fileInput}>
					<FileBase
						type="file"
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
				</div>
				<Button
					variant="contained"
					color="primary"
					fullWidth
					type="submit"
					size="large"
					className={classes.buttonSubmit}>
					Submit
				</Button>
				<Button
					variant="contained"
					color="secondary"
					fullWidth
					size="small"
					onClick={clear}>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
