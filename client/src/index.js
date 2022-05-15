import './index.css';

import { applyMiddleware, combineReducers, compose, createStore } from "redux";

import App from "./App";
import  AuthReducer  from "./redux/auth/authReducer";
import { Provider } from "react-redux";
import React from "react";
import { postReducer } from "./redux/post/postReducer";
import { render } from "react-dom";
import thunk from "redux-thunk";

//import { composeWithDevTools } from "@redux-devtools/core";




const reducers = combineReducers({
	posts: postReducer,
	auth: AuthReducer
});
const store = createStore(reducers, compose(applyMiddleware(thunk)));
render(
	
	<Provider store={store}>
		<App />
		</Provider>
	,
	document.getElementById("root")
);
