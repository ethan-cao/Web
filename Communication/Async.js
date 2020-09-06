// Callback version
function addString1(previous, current, callback) {
	setTimeout(() => callback(previous + " " + current), 1000);
}

function addAll1() {
	addString1("", "A", (result) => {
		addString1(result, "B", (result) => {
			addString1(result, "C", (result) => {
				console.log(result); // Prints out " A B C"
			});
		});
	});
}

// addAll1();

//---------------------------------------------------------------------
// Promise version
const addString2 = (previous, current) =>
	new Promise((resolve) => {
		setTimeout(resolve(previous + " " + current), 1000)
	});

const addAll2 = () =>
	addString2("", "A")
		.then((result) => {
			return addString2(result, "B");
		})
		.then((result) => {
			return addString2(result, "C");
		})
		.then((result) => {
			console.log(result); // A B C
		});
// addAll2();


//---------------------------------------------------------------------
/*
 Await version

Async/await is just syntax sugar for Promise, makeing asynchronous code look and behave like synchronous code
Async functions always return a promise
 */

const addString3 = (previous, current) =>
	new Promise((resolve) => {
		setTimeout(() => resolve(previous + " " + current), 3000);
	});

async function addAll3() {
	let result = "";

	// await syntax : await expression; only valid inside async function
	// it returns the fulfilled value of the promise, or the value itself if it's not a Promise.
	// await block async function execution to pause until a Promise is settled
	// await does not block async function's caller

	result = await addString3(result, "A"); // wait until addString() returns a promise
	result = await addString3(result, "B"); // wait until addString() returns a promise
	result = await addString3(result, "C"); // wait until addString() returns a promise

	// without await, everything executed synchronously, result is a resolved promise

	console.log("all reoslved : ", result);
	return result;
}

let p = addAll3();
// p is a pending promise right after calling addAll(),
// after 9s, it becomes resolved promise with value: A B C
// nothing is blocking in this context




//---------------------------------------------------------------------
// Observable version
