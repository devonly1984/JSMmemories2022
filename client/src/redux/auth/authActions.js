import * as api from "../../api/index";
import * as constants from "./authConstants";

export const signIn = (formData, history) => async (dispatch) => {
	try {
		const { data } = await api.signIn(formData);

		dispatch({ type: constants.AUTH, data });
		history.push("/");
	} catch (error) {
		console.log(error);
	}
};
export const signUp = (formData, history) => async (dispatch) => {
	try {
		const { data } = await api.signUp(formData);
		dispatch({ type: constants.AUTH, data });
		history.push("/");
	} catch (error) {
		console.log(error);
	}
};
