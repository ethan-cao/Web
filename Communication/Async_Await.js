// Async/await is just syntax sugar for Promise, making asynchronous code look and behave like synchronous code
// a sync function always returns a promise. non-promise value is wrapped in a resolved promise automatically.
const f1 = async () => { 
    return 1;
};

const p1 = f1();


// async can work directly with then()

// await can only be used inside async function
// await pause async function execution until the returned promise is resolved
// it returns the resolved value of the promise, or the value itself if it's not a Promise.
// await does not block async function's caller

const f2 = async () => {
    try {
        const response = await fetch('https://api.github.com/users/octocat')
        const data = response.json()
        console.log(data)
    } catch (error) {
        console.error(error)
    }
};


async function f3() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 2000)
    });

    console.log("before");
    let result = await promise; // wait until the promise resolves (*)
    console.log("after");

    alert(result); // "done!"
}

f3();