import redux from "redux";
const { createStore, bindActionCreators } = redux; 

const initialState = {
    todos: ["todo1"]
};

const reducer = (state = initialState, action) => {
    if (action.type === "ADDED") {
        return {
            todos: [...state.todos, action.payload]
        }
    }

    // immutability rule: if we change it, we replace it.
    return { ...initialState };
};



const store = createStore(reducer);
// createStore(reducer, preloadedState, enhancer)
// createStore(reducer, enhancer)


// callback will be called when an action has been dispatched
// just to notify an action was dispatched
// store.subscribe() returns a function that you can call to cancel the subscription.
store.subscribe(() => {
    console.log("state updated ", store.getState());  // updated state
});

// use past tense for type, since it reflected the changed data to be updated in UI
const todoAction = { type: "ADDED", payload: "todo2" };
store.dispatch(todoAction);

// action creator
const addTodoItem = payload => ({ type: "ADDED", payload });
store.dispatch(addTodoItem("todo3"))

// bindActionCreators: takes an action creator / action creators, binds them all to the dispatch
const boundAddTodoItem = bindActionCreators(addTodoItem, store.dispatch);
boundAddTodoItem("todo4");

console.log("new state: ", store.getState());