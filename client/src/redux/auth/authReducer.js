import * as constants from "./authConstants";

const AuthReducer = (state = { authData: null }, action) => {
	switch (action.type) {
		case constants.AUTH:
			localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
			return { ...state, authData: action?.data };
		case constants.LOGOUT:
			localStorage.clear();
			return { ...state, authData: null };
		default:
			return state;
	}
};
export default AuthReducer;
