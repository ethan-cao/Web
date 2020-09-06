const {Observable} = require('rxjs');


/**
 * Single value vs Multiple values
 */

// Promise emits single value, the state
const numberPromise = new Promise(resolve => {
    resolve(5);
    resolve(10); // this will never get called
});

// prints only 5
numberPromise.then(value => console.log("promise: " + value));

// unlike promise that can only settle once, Observables can emit multiple times
const numberObservable = new Observable(observer => {
    observer.next(5);
    observer.next(6);
    observer.next(7);
});

// print 1,2,3
numberObservable.subscribe(value => console.log("observable: " + value));




/**
 * Eager vs lazy
 */

 // instantiate a promise instance invokes the executor function immediately 
 // initialized Promise represents process that has started happening (HTTP request is sent)
 // and we are just waiting for resulting value
const secondPromise = new Promise(resolve => {
    let i = 0;
    setInterval(() => {resolve(++i)}, 3000); // invoked 
});

 // instantiate a promise instance does not invokes the function immediately 
 // initialized Observable represents process that might start happening 
 // it will start only when we actually subscribe
const secondObservable = new Observable(observer => {
    let i = 0;
    setInterval(() => {observer.next(++i)}, 3000); // not invoked
});

secondObservable.subscribe(value => console.log("observable: " + value)); // start invoking 



// subscribe returns a Subscription for given Observable. This Subscription has only one method unsubscribe 


/**
 * not cancellable vs cancellable
 */

 //  Observable can be canceled, but ES6 Promises cannot
const secondObservable1 = new Observable(observer => {
    let i = 0;
    const token = setInterval(() => {observer.next(++i);}, 3000);
    return () => clearInterval(token);
});

const subscription = secondObservable1.subscribe(value => console.log("observable1: " + value));
// use subscription.unsubscribe() to cancel 
setTimeout(subscription.unsubscribe.bind(subscription), 7000);



/**
 * Multicast vs Unicast/Multicast
 */

 // Multicast: executor function is invoked only once, regardless how many calls to then()
const watiOneSecondPromise = new Promise(resolve => {
    console.log("waitOneSecondPromise");
    resolve(1);
});
watiOneSecondPromise.then(() => console.log("Multicast"));   // executor function not invoked
watiOneSecondPromise.then(() => console.log("Multicast"));   // executor function not invoked

 // Unicast by default: subscribe function is invoked by each call to subscribe()
const waitOneSecondObservable = new Observable(observer => {
    console.log("waitOneSecondObservable");
    observer.next(1);
});
waitOneSecondObservable.subscribe(value => console.log(value));  // subscribe function invoked 
waitOneSecondObservable.subscribe(value => console.log(value));  // subscribe function invoked 

//  Multicast using share()
// const sharedWaitOneSecondObservable = waitOneSecondObservable.share();  // Not working
// sharedWaitOneSecondObservable.subscribe("Multicast");
// sharedWaitOneSecondObservable.subscribe("Multicast");


/**
 * Asynchronous vs Synchronous
 */

// promise callback function is asynchronous
// const promise = new Promise(resolve => resolve("Promise added in microtask queue"));
// promise.then(value => console.log(value));  // print later
// console.log("Added in marcotask queue");    // print first

// obvervable callback is synchronous
const observable = new Observable(observer => observer.next("Observable added in Macrotask queue"));
observable.subscribe(value => console.log(value));  // print first
console.log("Added in marcotask queue");            // print later 