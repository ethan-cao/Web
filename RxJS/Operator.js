const { of, from, fromEvent, timer, combineLatest } = require('rxjs');
const { filter } = require('rxjs/operators');


const source0 = of({ name: 'Brian' }, [1, 2, 3], () => "Hello"); // //emits any number of provided values in sequence
const source1 = from(new Promise(resolve => resolve('Hello World!'))); // Turn an array, promise, or iterable into an observable.
const source = fromEvent(document, 'click'); // Turn event into observable sequence


const newObservable = of(1, 2, 3, 4, 5)
	// pipe() makes observable data consumable for operator 
	// it transform the source observable to a new observable
	.pipe(
		// each operator is pure fx that return a observable
		debounceTime(200), // wait for a 200ms pause
		filter(value => value >= 2)
	);

newObservable.subscribe(value => console.log(value));  // log: 2, 3, 4, 5



const timerOne$ = timer(1000, 4000); // emits the first value at 1s, then once every 4s, timer() emits sequential value like 0,1,2,3...
const timerTwo$ = timer(2000, 4000);
const timerThree$ = timer(3000, 4000);

// when one timer emits, emit the latest values from each timer as an array
combineLatest(timerOne$, timerTwo$, timerThree$).subscribe(
	([timerValOne, timerValTwo, timerValThree]) => {
		/*
		  Example:
		timerThree first tick: 'Timer One Latest: 0, Timer Two Latest: 0, Timer Three Latest: 0
		timerOne second tick: 'Timer One Latest: 1, Timer Two Latest: 0, Timer Three Latest: 0
		timerTwo second tick: 'Timer One Latest: 1, Timer Two Latest: 1, Timer Three Latest: 0
	  */
		console.log(
			`Timer One Latest: ${timerValOne},
     		 Timer Two Latest: ${timerValTwo},
     		 Timer Three Latest: ${timerValThree}`
		);
	}
);


// provide effective ways to gracefully handle errors and perform retries
throwError('This is an error!')
  	.pipe(catchError(val => of(`I caught: ${val}`)))
  	.subscribe(val => console.log(val));   //I caught: This is an error!

