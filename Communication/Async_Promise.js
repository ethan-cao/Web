/*
Promise is an object which represents the eventual completion (or failure) of an asynchronous operation
A promise object has a value and status, which could be:
    pending: initial state, neither fulfilled nor rejected. 
    fulfilled: when resolve() is first invoked, means the operation completed.
    rejected:  when reject() is first invoked,  means the operation failed.

A promise can only be settled once (fulfilled or rejected), subsequent invocation to resolve()/reject()
does not change the promise (immutability).  

promise help to avoid nested callbacks 
*/



/*  Promise construtor takes 1 parameter, an executor function 

    Executor works asynchronously, and takes 2 parameters resolve() and reject()
    the first resolve/reject to be invoked determines the status of the promise
    executor is invoked only once

    executor is invoked eagerly. meaning a promise starts working once the promise constructor is invoked 
    wrap executor in functions if needed to be invoked later 
    
    If an error is thrown in the executor function, the promise is rejected. 
    The return value of the executor is ignored  
*/
const promise = new Promise((resolve, reject) => {
  if (Math.random() * 100 < 90) {
    resolve("90%");
  }

  reject("10%");
  // even if resolve() is called, reject() is still get called
  // but since the promise is already settled, subsequent reject call does nothing
});



/*
promise does not expose its state, use promise.then(resolve(promiseValue), reject(rejectionReason)) to assess
resolve/reject are callback functions for the success/failure cases 
resolve/reject are called asynchronously, and are both optional, they can be called only once
then() returns a Promise for the completion of which ever callback is executed.

if resolve/reject 
  returns a value(v1), promise returned by promise.then() is resolved with the same value (as v1)
  returns an already fulfilled promise, the promise returned by then gets fulfilled with that promise's value as its value.
  returns an already rejected promise, the promise returned by then gets rejected with that promise's value as its value.
  returns another pending promise object, the resolution/rejection of the promise returned by then will be subsequent to the resolution/rejection of the promise returned by the handler. Also, the resolved value of the promise returned by then will be the same as the resolved value of the promise returned by the handler.
  return nothing, the promise returned by then gets resolved with an undefined value.
  throws an error, promise returned by promise.then() is rejected with the exception as reason
  is not a function, promise(p2) returned by promise.then() has the same state and value (as p2)
*/
  
promise.then(
  resolvedValue => console.log(resolvedValue),
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
  });



//  Do not call Promise.resolve on a thenable that resolves to itself. 

// Promise.resolve() returns a resolved promise.
// Promise.reject() returns a rejected promise.
// Promise.race() takes an array (or any iterable) and returns a promise that resolves with the value of the first resolved promise in the iterable, or rejects with the reason of the first promise that rejects.
// Promise.all() takes an array (or any iterable) and returns a promise that resolves when all of the promises in the iterable argument have resolved, or rejects with the reason of the first passed promise that rejects.