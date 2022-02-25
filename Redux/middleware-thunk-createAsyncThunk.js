import axios from "axios";

import toolkit from '@reduxjs/toolkit';
const { createSlice, createAsyncThunk, configureStore } = toolkit;


const initialState = {
	isLoading: false,
	users: [],
	error: "",
};

// createAsyncThunk() generates thunk that automatically dispatches "pending/fulfilled/rejected" actions
const fetchUsers = createAsyncThunk(
	'users/fetchUsers',
	async function payloadCreator() {
		const response = await axios.get('https://jsonplaceholder.typicode.com/users')
		return response.data
	}
)

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state, action) => {
				// action: users/fetchUsers/pending
				state.isLoading = true
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				// action: users/fetchUsers/fulfilled
				state.isLoading = false

				const newUsers = {}

				action.payload.forEach(todo => {
					newUsers[todo.id] = todo
				})

				state.users = newUsers
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				// action: users/fetchUsers/rejected
				state.isLoading = false
			})
	}
})


// configureStore() includes redux-thunk by default
const store = configureStore({
	reducer: {
		users: usersSlice.reducer
	},
})

store.subscribe(() => console.log("state updated: ", JSON.stringify(store.getState())));

store.dispatch(fetchUsers());

