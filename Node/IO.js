var fs = require("fs");
var buffer = fs.readFileSync("/Users/guane/Work/study/node/test.txt");

console.log(1);
console.log(process);
console.log(2);



var o  =require('url').parse('/test?q=1', true);