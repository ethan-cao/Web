import redux from "redux";
import reduxThunk from "redux-thunk";
import axios from "axios";
import reduxLogger from 'redux-logger'

const { createStore, applyMiddleware } = redux;
const thunk = reduxThunk.default;
const { logger } = reduxLogger;

// redux-thunk: define async action creator,
// it allows action creator to return a function rather than an action object
// the returned function has dispatch as param

const initialState = {
	loading: false,
	users: [],
	error: "",
};

// Action type
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

// Action creator
const fetchUsersRequest = () => {
	return {
		type: FETCH_USERS_REQUEST,
	};
};

const fetchUsersSuccess = (users) => {
	return {
		type: FETCH_USERS_SUCCESS,
		payload: users,
	};
};

const fetchUsersFailure = (error) => {
	return {
		type: FETCH_USERS_FAILURE,
		payload: error,
	};
};

// Action creator, that returns function
const fetchUsers = () => {
  // since using redux-thunk, action creator can return function with dispath as param
	return function (dispatch) {
		dispatch(fetchUsersRequest());
		axios
			.get("https://jsonplaceholder.typicode.com/users")
			.then((response) => {
				// response.data is the users
				const users = response.data.map((user) => user.id);
				dispatch(fetchUsersSuccess(users));
			})
			.catch((error) => {
				// error.message is the error message
				dispatch(fetchUsersFailure(error.message));
			});
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USERS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_USERS_SUCCESS:
			return {
				loading: false,
				users: action.payload,
				error: "",
			};
		case FETCH_USERS_FAILURE:
			return {
				loading: false,
				users: [],
				error: action.payload,
			};
	}
};

const store = createStore(reducer, applyMiddleware(logger, thunk));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());
