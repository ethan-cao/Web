import { Observable } from 'rxjs';    // use require("rxjs"); in Node


const observable = new Observable(function subscribe(observer) {
// constructor take a subscribe() as parameter, which has a parameter observer
    try{
        // In an Observable Execution, multiple Next can be emitted
        observer.next("next value 1");
        observer.next("next value 2");
        observer.next("next value 3");
        // If either an Error or Complete notification is emitted, then nothing else can be delivered afterwards.
        observer.complete();
        observer.next("next value 4");  // not emitted
    } catch (error) {
        observer.error(error);
    }

    // without returning unsubscribe(), subscription.unsubscribe() just cancels exexcution
    // With returning unsubscribe(), it makes possible to to cancel execution and dispose resource
    return function unsubscribe() {
        console.log("unsubscribed");
    };
});
// At this point, observable is cold, or do not activate a producer, no Observable execution



// Observer is a set of callbacks(next, error, complete), a consumer of values emitted by an Observable
// observable.subscribe(observer) let Observer subscribes to Observable
// Observer is where you react(-ive programming) to Observable, each future values
// Subscribing to an Observable is like calling a function, providing callbacks where the data will be delivered to. (observer)
// Observable constructor param subscribe() represents an Observable execution, it starts execution when an Observer subscribes to the Observable
// each call to observable.subscribe(observer) creates a subscription, each subscription creates a new Observer execution 
const subscription = observable.subscribe(
    (value) => console.log('value received from observer.next() : ', value),   // next
    (error) => console.error('Observer got an error: ' + error),               // error
    () => console.log('Observer got a complete notification')                  // complete             
);



// use subscription.unsubscribe() to cancel the Observable execution or release resource
// unsubscribe() returned by Observable constructor will be invoked 
subscription.unsubscribe();

// multiple subscriptions can be created on the same observable





// 1 observable emits to 1 observer, unicast
// 1 observable emits to many observers, multicasting




/**
 *  Subject is a special type of Observable that allows values to be multicasted to many Observers. 
 *  It is the equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers
 *  While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable), Subjects are multicast.
 *  A Subject is like an Observable, but can multicast to many Observers. Subjects are like EventEmitters: they maintain a registry of many listeners.
 *  Every Subject is an Observable.
 *  Every Subject is an Observer. 
 *  To feed a new value to the Subject, just call next(theValue), and it will be multicasted to the Observers registered to listen to the Subject.
 */

