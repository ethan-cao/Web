const { Observable } = require("rxjs"); 

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

    // without returning unsubscribe(), subscription.unsubscribe() just cancels execution
    // With returning unsubscribe(), it makes possible to to cancel execution and dispose resource
    return function unsubscribe() {
        console.log("unsubscribed");
    };
});
// At this point, observable is cold, there is no Observable execution



// Observer is a set of callbacks(next, error, complete), a consumer of values emitted by an Observable
// Observer is where you react(ive programming) to  each future values in Observable
const observer = {
    next: (value) => console.log('value received from observer.next() : ', value),
    complete: () => console.log('Observer got a complete notification'),
    error: (error) => console.error('Observer got an error: ' + error)
}

// observable.subscribe(observer) lets Observer subscribes to Observable
// Subscribing to an Observable is like calling a function, providing callbacks (observer) where the data will be delivered to
// Observable constructor param subscribe() represents an Observable execution, it STARTS EXECUTION when an Observer subscribes to the Observable
// each call to observable.subscribe(observer) creates a subscription, each subscription creates a new Observer execution 
const subscription = observable.subscribe(observer);


// alternatively
// observable.subscribe((value) => console.log('value received from observer.next() : ', value));


// use subscription.unsubscribe() to cancel the Observable execution or release resource
// unsubscribe() returned by Observable constructor will be invoked 
subscription.unsubscribe();

// multiple subscriptions can be created on the same observable
