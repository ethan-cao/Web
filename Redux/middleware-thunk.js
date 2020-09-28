import redux from "redux";
import reduxThunk from "redux-thunk";
import axios from "axios";

const thunk = reduxThunk.default;

// redux-thunk allows action creator to return a function rather than an action object
// the returned function has params (dispatch, getState)

// compare this example with middleware-observable_1.js

const initialState = {
	loading: false,
	users: [],
	error: "",
};

// Action type
const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USERS_REQUESTED:
			return {
				...state,
				loading: true,
			};
		case FETCH_USERS_SUCCEEDED:
			return {
				loading: false,
				users: action.payload,
				error: "",
			};
		case FETCH_USERS_FAILED:
			return {
				loading: false,
				users: [],
				error: action.payload,
			};
	}
};



// Action creator, which returns an object
const fetchUsersRequested = () => {
	return {
		type: FETCH_USERS_REQUESTED,
	};
};

const fetchUsersSuccess = (users) => {
	return {
		type: FETCH_USERS_SUCCEEDED,
		payload: users,
	};
};

const fetchUsersFailure = (error) => {
	return {
		type: FETCH_USERS_FAILED,
		payload: error,
	};
};

// Action creator, which returns function, the returned function is called thunk
// since using redux-thunk, action creator can return function
const fetchUsers = () => {
	return (dispatch, getState) => {
		dispatch(fetchUsersRequested());
		axios
			.get("https://jsonplaceholder.typicode.com/users")
			.then((response) => {
				const users = response.data.map((user) => user.id);
				// delay the dispatch an action (async) for a certain amount of time
				dispatch(fetchUsersSuccess(users));
			})
			.catch((error) => {
				dispatch(fetchUsersFailure(error.message));
			});
	};
};




const store = redux.createStore(reducer, redux.applyMiddleware(thunk));
store.subscribe(() => console.log("state updated: ", store.getState()));

store.dispatch(fetchUsers());
