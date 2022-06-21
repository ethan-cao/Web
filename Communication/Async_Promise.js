/*
A promise is an object, representing the future status (completion/failure) of an asynchronous operation

A promise object has a value, and a status which could be:
    pending: initial state, neither resolved nor rejected. 
    resolved: when resolve() is first invoked, means the operation completed.
    rejected:  when reject() is first invoked,  means the operation failed.

A promise can only be settled once (resolved or rejected), 
subsequent invocation to resolve()/reject() does not change the promise (immutability)

promise help to avoid nested callbacks 
*/



/*  Promise constructor takes 1 parameter, an executor function 

    Executor works asynchronously, it takes 2 parameters resolve() and reject()
    the first time, resolve/reject is invoked, the invocation determines the status of the promise
    executor is invoked only once

    resolve and reject() handle the success and failure case, respectively

    executor is invoked eagerly. meaning a promise starts working once the promise constructor is invoked 
    wrap executor in functions if needed to be invoked later 
    
    If an error is thrown in the executor function, the promise is rejected. 
    and the return value of the executor is ignored  
*/
const promise = new Promise((resolve, reject) => {
  if (Math.random() * 100 < 90) {
    resolve("90%");
  }

  reject("10%");
  // even if resolve() is called, reject() is still get called
  // but since the promise is already settled, subsequent reject call does not change the promise status
});

// wrap promise constructor in functions if need to be invoked later
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));



/*
Promise does not expose its status, 
  use promise.then(resolve(promiseValue), reject(rejectionReason)) to access the status
  use promise.catch( () => {}) handles rejected cases only, and returns a Promise, just like then(_, onRejected)
              catch(onRejected) internally calls then(_, onRejected)
  use promise.finally( () => {} ) to handle operation in common, regardless success or failure



then() runs after a promise has been resolved(resolved or rejected) 
resolve()/reject() are callback function for success/failure cases, invoked asynchronously

then() returns a new Promise represents the completion of either resolve() or reject()
if resolve/reject 
  returns settled promise with value v1, promise returned by promise.then() is settled as the same status with value v1
  returns pending promise, promise returned by promise.then() is pending as well, and gets settled after resolve/reject with the same status and value
  return nothing, the promise returned by then gets resolved with an undefined value.
  throws an error, promise returned by promise.then() is rejected with the exception as reason
  is not a function, promise(p2) returned by promise.then() has the same state and value (as p2)
*/
  
promise.then(
  resolvedValue => console.log(resolvedValue),
  rejectedValue => console.log(rejectedValue)
);




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
    () => console.log("finally")
  );



//  Do not call Promise.resolve on a thenable that resolves to itself. 

// Promise.resolve() returns a resolved promise.
// Promise.reject() returns a rejected promise.
// Promise.race() takes an array (or any iterable) and returns a promise that resolves with the value of the first resolved promise in the iterable, or rejects with the reason of the first promise that rejects.
// Promise.all() takes an array (or any iterable) and returns a promise that resolves when all of the promises in the iterable argument have resolved, or rejects with the reason of the first passed promise that rejects.