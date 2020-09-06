// Runtime: Browser 
const socket = new WebSocket("ws://localhost:8080");

socket.onerror = error => console.log("Error:", error);
socket.onmessage = event => console.log("received: ", event.data);
socket.onclose = event => console.log("closed", event);


socket.onopen = event => {
    console.log("opened", event)
    socket.send("test1");
};

socket.close();