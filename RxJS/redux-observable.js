const { ajax } = require("rxjs/ajax");
const { pipe } = require("rxjs");

const USER_FETCHED = "user_fetched";
const USER_FETCHED_FULFILLED = "user_fetched_fulfilled";

const fetchUser = userName => ({ type: USER_FETCHED, payload: userName });
const fetchUserFulfilled = userName => ({ type: USER_FETCHED_FULFILLED, payload: userName });

const fetchUserEpic = action$ => action$.pipe(
    ofType(USER_FETCHED),
    mergeMap(action => 
        // When AJAX call comes back, map the response to a FETCH_USER_FULFILLED action.
        ajax.getJSON(`https://api.github.com/users/${action.payload}`)
            .pipe(
                map(response => fetchUserFulfilled(response))
            )
    ),
);

const reducer = (state = {}, action) => {
    switch (action.type) {
        case USER_FETCHED_FULFILLED:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};