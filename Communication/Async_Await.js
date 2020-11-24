// Async/await is just syntax sugar for Promise, making asynchronous code look and behave like synchronous code
const f1 = async () => { }; // async fx returns promise, fulfilled with the returned value
const f2 = () => { };       // non-async fx returns non-promise returned value 


// async can work directly with then()

// await can only be used inside async function
// await pause async function execution until the returned promise is resolved
// it returns the resolved value of the promise, or the value itself if it's not a Promise.
// await does not block async function's caller

const f = async () => {
    try {
        //  its skips to the catch block if it receives an error 
        const response = await fetch('https://api.github.com/users/octocat')
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.error(error)
    }
};