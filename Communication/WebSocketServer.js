// Runtime: NodeJS
// Run node WebSocketServer.js
const WebSocket = require("ws");

const webSocketServer = new WebSocket.Server({ port: 8080 })

webSocketServer.on("connection", webSocket => {
    console.log("Connection established.");

    webSocket.on("message", msg => {
        console.log("Received: ", msg)

        // echo 
        webSocket.send(msg); 
   });

});