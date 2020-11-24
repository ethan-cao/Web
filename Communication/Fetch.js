const fetch = require("node-fetch")
const Request = fetch.Request;



const url = 'https://randomuser.me/api/?results=10';

/**
 * fetch() returns a Promise object
 * Fetch use GET by default
 */
fetch(url)
.then(res => {
   // res is an Response object
   // resolves to JSON JSON promise 
    return res.json();
})  
.then(data => {
    const users = data.results; 
})
.catch(error => {
    console.log('Fetch Error :', err);
});  

/**
 * request with POST
 */
 const data = {name: "Sara"};
 const fetchData = {
     method: "POST",
     body: data,
     headers: {}
 };

fetch(url, fetchData)
.then(res => console.log(res));

 // alternatively 
var request = new Request(url, {
    method: 'POST', 
    body: data, 
    headers: {}
});
fetch(request)
.then(res => console.log(res));