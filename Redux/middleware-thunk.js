import redux from "redux";
import axios from "axios";

import reduxThunk from "redux-thunk";
const thunk = reduxThunk.default;


// compare this example with middleware-observable_1.js

const initialState = {
	loading: false,
	users: [],
	error: "",
};

// Action type
// typical data fetching async logic includes 3 actions: pending, fulfilled, rejected
const FETCH_USERS_PENDING = "users/fetchUsers/pending";
const FETCH_USERS_FULFILLED = "users/fetchUsers/fulfilled";
const FETCH_USERS_REJECTED = "users/fetchUsers/rejected";

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USERS_PENDING:
			return {
				...state,
				loading: true,
			};
		case FETCH_USERS_FULFILLED:
			const newUsers = {}

			action.payload.forEach(todo => {
				newUsers[todo.id] = todo
			})
			return {
				loading: false,
				users: newUsers,
				error: "",
			};
		case FETCH_USERS_REJECTED:
			return {
				loading: false,
				users: [],
				error: action.payload,
			};
	}
};

const store = redux.createStore(reducer, redux.applyMiddleware(thunk));
store.subscribe(() => console.log("state updated: ", JSON.stringify(store.getState())));




// action creator, returning an object
const fetchUsersRequested = () => {
	return {
		type: FETCH_USERS_PENDING,
	};
};

const fetchUsersSuccess = (users) => {
	return {
		type: FETCH_USERS_FULFILLED,
		payload: users,
	};
};

const fetchUsersFailure = (error) => {
	return {
		type: FETCH_USERS_REJECTED,
		payload: error,
	};
};

// thunk action creator, returning thunk
const fetchUserById = (userId) => {
	return async function thunk(dispatch, getState) {
		const stateBefore = getState()

		dispatch(fetchUsersRequested());

		try {
			const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
			const users = response.data

			dispatch(fetchUsersSuccess(users));
		} catch (error) {
			dispatch(fetchUsersFailure(error.message));
		}

		const stateAfter = getState()
	};
};

store.dispatch(fetchUserById(1));

