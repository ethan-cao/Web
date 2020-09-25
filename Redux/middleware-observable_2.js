import redux from "redux";  
import observable from "redux-observable";
import operator from "rxjs/operators/index.js";

const { ofType, createEpicMiddleware } = observable;
const { applyMiddleware, createStore } = redux;
const { map } = operator;

const reducer = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state + action.payload;
        default:
            return state;
    }
};


const countEpic = action$ => action$.pipe(
    ofType("INCREMENT_1"),
    map(action => ({type: "INCREMENT", payload: 1}))
);


const epicMiddleware = createEpicMiddleware();
const store = createStore(reducer, applyMiddleware(epicMiddleware)); 
epicMiddleware.run(countEpic); // add epic to the observable after calling `applyMiddleware()`
store.subscribe(() => console.log("state updated: ", store.getState()));

store.dispatch({ type: "INCREMENT_1" }); 
// both the original action and the mapped action are dispatched
