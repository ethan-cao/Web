/*
Promise is an object which represents the future status (completion or failure) of an asynchronous operation
           a wrapper of future value
A promise object has a value and status, which could be:
    pending: initial state, neither fulfilled nor rejected. 
    fulfilled: when resolve() is first invoked, means the operation completed.
    rejected:  when reject() is first invoked,  means the operation failed.

A promise can only be settled once (fulfilled or rejected), subsequent invocation to resolve()/reject()
does not change the promise (immutability).  

promise help to avoid nested callbacks 
*/



/*  Promise constructor takes 1 parameter, an executor function 

    Executor works asynchronously, it takes 2 parameters fulfill() and reject()
    the first fulfill/reject to be invoked determines the status of the promise
    executor is invoked only once

    fulfil and reject() handle the success and failure case

    executor is invoked eagerly. meaning a promise starts working once the promise constructor is invoked 
    wrap executor in functions if needed to be invoked later 
    
    If an error is thrown in the executor function, the promise is rejected. 
    The return value of the executor is ignored  
*/
const promise = new Promise((fulfill, reject) => {
  if (Math.random() * 100 < 90) {
    fulfill("90%");
  }

  reject("10%");
  // even if resolve() is called, reject() is still get called
  // but since the promise is already settled, subsequent reject call does not change the promise status
});



/*
Promise does not expose its status, 
  use promise.then(resolve(promiseValue), reject(rejectionReason)) to access/consume the internal status
  use promise.catch(error => {}) to access error, once error occurs, then() wil be skipped
  use promise.finally(()=>{}) to handle operation in common, regardless success or failure

then() runs after a promise has been resolved(fulfilled or rejected) 
fulfill()/reject() are callback function for success/failure cases, invoked asynchronously

then() returns a new Promise represents the completion of either fulfill() or reject()
if fulfill/reject 
  returns a value(v1), promise returned by promise.then() is resolved with the same value (as v1)
  returns an already fulfilled promise, the promise returned by then gets fulfilled with that promise's value as its value.
  returns an already rejected promise, the promise returned by then gets rejected with that promise's value as its value.
  returns another pending promise object, the resolution/rejection of the promise returned by then will be subsequent to the resolution/rejection of the promise returned by the handler. Also, the resolved value of the promise returned by then will be the same as the resolved value of the promise returned by the handler.
  return nothing, the promise returned by then gets resolved with an undefined value.
  throws an error, promise returned by promise.then() is rejected with the exception as reason
  is not a function, promise(p2) returned by promise.then() has the same state and value (as p2)
*/
  
promise.then(
  fulfilledValue => console.log(fulfilledValue),
  rejectedValue => console.log(rejectedValue)  //  Error object is good option for rejectionReason
);







// wrap promise constructor in functions if need to be invoked later
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

// promise.then() can be called more than once and chain to aggregate callbacks.
  delay(2000) // return a promise
  .then(() => {
    console.log("Resolved after 2 seconds");
    return delay(1500);  // return a promise
  })
  .then(() => {
    console.log("Resolved after 1.5 seconds");
    return delay(3000);   // return a promise
  })
  .then(() => {
    console.log("Resolved after 3 seconds");
    throw new Error();
  })
  .catch(() => {
    // catch(reject) catches error thrown from both previous then(resolve, reject) and the resolve (param in then) 
    // good practice: ending all promise chains with a .catch()
    console.log("Caught an error.");
  })
  .finally(
    // avoid duplicating code in both the promise's then() and catch() handlers.
    console.log("finally")
  );



//  Do not call Promise.resolve on a thenable that resolves to itself. 

// Promise.resolve() returns a resolved promise.
// Promise.reject() returns a rejected promise.
// Promise.race() takes an array (or any iterable) and returns a promise that resolves with the value of the first resolved promise in the iterable, or rejects with the reason of the first promise that rejects.
// Promise.all() takes an array (or any iterable) and returns a promise that resolves when all of the promises in the iterable argument have resolved, or rejects with the reason of the first passed promise that rejects.