import redux from "redux";
import observable from "redux-observable";
import operator from "rxjs/operators/index.js";
import rxjs from "rxjs";

const { ofType, createEpicMiddleware } = observable;
const { applyMiddleware, createStore } = redux;
const { mapTo, filter } = operator;

const initialState = {
    data: [],
    evenCount: 0,  // count for even number
};

const NUMBER_ADDED = "NUMBER_ADDED";
const EVEN_NUMBER_ADD = "EVEN_NUMBER_ADDED";

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case NUMBER_ADDED:
            return {
                ...state,
                data: [...state.data, action.payload],
            };
        case EVEN_NUMBER_ADD:
            return {
                ...state,
                evenCount: state.evenCount + 1
            }
        default:
            return state;
    }
};

const countEpic = (action$, state) => action$.pipe(
    ofType(NUMBER_ADDED),
    filter(action => action.payload % 2 === 0),
    mapTo({ type: EVEN_NUMBER_ADD })
);


const epicMiddleware = createEpicMiddleware();
const store = createStore(reducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(countEpic);
store.subscribe(() => console.log("state updated: ", store.getState()));



setInterval(() => {
    store.dispatch({ type: NUMBER_ADDED, payload: Math.floor(Math.random() * 101) });
}, 2000);
