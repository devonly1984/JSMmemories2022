import {
	Avatar,
	Button,
	Container,
	Grid,
	Paper,
	Typography,
} from "@material-ui/core";
import { signIn, signUp } from "../../redux/auth/authActions";

import { GoogleLogin } from "react-google-login";
import Icon from "./Icon";
import Input from "./Input";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import useStyles from "./styles";

const Auth = () => {
	const initialState = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	};
	const classes = useStyles();

	const history = useHistory();
	const [showPassword, setShowPassword] = useState(false);
	const [isSignup, setIsSignup] = useState(false);
	const dispatch = useDispatch();
	const [formData, setFormData] = useState(initialState);
	const handleSubmit = (e) => {
		e.preventDefault();

		if (isSignup) {
			dispatch(signUp(formData, history));
		} else {
			dispatch(signIn(formData, history));
		}
	};
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const switchMode = () => {
		setIsSignup((prev) => !prev);
		setShowPassword(false);
	};
	const googleSucess = async (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;
		try {
			dispatch({ type: "AUTH", data: { result, token } });
			history.push("/");
		} catch (error) {
			console.log(error);
		}
	};
	const googleFailure = (error) => {
		

		console.log("Google Sign In Fail   ed try again later");
	};
	const handleShowPassword = () => setShowPassword((prev) => !prev);
	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5">{isSignup ? "Sign up" : "Login "}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input
									autoFocus
									name="firstName"
									type="text"
									label="First Name"
									handleChange={handleChange}
									half
								/>
								<Input
									name="lastName"
									type="text"
									label="Last Name"
									handleChange={handleChange}
									half
								/>
							</>
						)}
						<Input
							name="email"
							label="Email Address"
							handleChange={handleChange}
							type="email"
						/>
						<Input
							name="password"
							label="Password"
							handleChange={handleChange}
							type={showPassword ? "text" : "password"}
							handleShowPassword={handleShowPassword}
						/>
						{isSignup && (
							<Input
								name="confirmPassword"
								label="Repeat Password"
								handleChange={handleChange}
								type="password"
								handleShowPassword={handleShowPassword}
							/>
						)}
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}>
						{" "}
						{isSignup ? "SignUp" : "Log in"}
					</Button>
					<GoogleLogin
						clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
						render={(renderProps) => (
							<Button
								className={classes.googleButton}
								color="primary"
								fullWidth
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								startIcon={<Icon />}
								variant="contained">
								Google Sign In
							</Button>
						)}
						onSuccess={googleSucess}
						onFailure={googleFailure}
						cookiePolicy="single_host_origin"
					/>

					<Grid container justifyContent="flex-end">
						<Grid item>
							<Button onClick={switchMode}>
								{isSignup
									? "Already have an account Sign in"
									: "Make an account Sign up"}{" "}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
