const { Subject, interval } = require('rxjs');
const { multicast, refCount } = require('rxjs/operators');

// A multi-casted Observable uses a Subject under the hood to make multiple Observers see the same Observable execution.

// The 1st emission is not sent immediately, but only after the first period has passed
const source = interval(2000);
const subject = new Subject();

// use refCount() to avoid explicit calls to connect() 
// we got an Observable that keeps track of how many subscribers it has. 
// When the number of subscribers increases from 0 to 1, it will call connect() for us, which starts the shared execution. 
// Only when the number of subscribers decreases from 1 to 0 will it be fully unsubscribed, stopping further execution.
const refCounted = source.pipe(
    multicast(subject),
    refCount()
);

const startTimeStamp = Date.now();

// once there is 1 subscriber, execution started
const subscription1 = refCounted.subscribe(
    (value) => console.log("Observer A: ", value, ", time: ", Date.now() - startTimeStamp),
);

let subscription2;

setTimeout(() => {
    subscription2 = refCounted.subscribe(
        (value) => console.log("Observer B: ", value, ", time: ", Date.now() - startTimeStamp),
    );
}, 2100);



setTimeout(() => {
    subscription1.unsubscribe();
}, 6100);


// once there is no subscriber, execution stops
setTimeout(() => {
    subscription2.unsubscribe();
}, 8100);
