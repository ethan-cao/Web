// visit http://localhost:3000/  in browser, then execute the script
const source = new EventSource('/countdown')

source.onmessage = event => console.log("received: ", event.data);
source.onopen = event => console.log("opened");
source.onerror = event => console.log("error");

source.close();