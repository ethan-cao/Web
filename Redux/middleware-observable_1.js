import redux from "redux";
import axios from "axios";
import observable from "redux-observable";
import operator from "rxjs/operators/index.js";

const { ofType, createEpicMiddleware } = observable;
const { applyMiddleware, createStore } = redux;
const { map, mergeMap } = operator;



const initialState = {
	loading: false,
	users: [],
	error: "",
};

// Action type
const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

// Action creator, which returns an object
const fetchUsersRequest = () => {
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

// Use state$.value to always access to the latest state

const requestEpic = (action$, state$) => action$.pipe(
	ofType(FETCH_USERS_REQUESTED),
	map({type: "test"}),
	// mergeMap(async (action) => {
	// 	const users = await axios
	// 		.get("https://jsonplaceholder.typicode.com/users")
	// 		.then((response) => response.data.map((user) => user.id));
	// 	return fetchUsersSuccess(users);
	// }),
);



const epicMiddleware = createEpicMiddleware();
const store = createStore(reducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(requestEpic);
store.subscribe(() => console.log("state updated: ", store.getState()));

store.dispatch(fetchUsersRequest()); 
