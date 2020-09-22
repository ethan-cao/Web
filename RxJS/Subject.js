const { Subject, AsyncSubject, interval, from } = require('rxjs');

const observer1 = {
    next: (value) => console.log("observer 1 next: ", value),
    error: (error) => console.log(error),
    complete: () => console.log("completed"),
};

const observer2 = {
    next: (value) => console.log("observer 2 next: ", value),
};



// Subject as Observable
const subject = new Subject();

subject.next(0);  // not emitted

const subscription1 = subject.subscribe(observer1)
const subscription2 = subject.subscribe(observer2)

subject.next(1); // multicast to observer1 and observer2

subscription2.unsubscribe();

subject.next(2); // unicast to observer1 

console.log("----------------------------------------------------------");

// Subject as Observer 
const subject1 = new Subject();

// add observer to subject's internal observers list
subject1.subscribe(observer1);
subject1.subscribe(observer2);

const source = from([1, 2, 3]);  // Observable

// subject has next(), which calls subject's internal observer's next()
source.subscribe(subject1);  // multicast to observer1 and observer2

// this is how multicasted Observable internally,  using a Subject under the hood 


console.log("----------------------------------------------------------");
