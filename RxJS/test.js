const { of, Observable } = require('rxjs');
const { filter } = require('rxjs/operators');

const observable = of(1,2,3,4,5);

observable.pipe(
	filter(x => x%2===0)
).subscribe(observer => observer.next(1));
