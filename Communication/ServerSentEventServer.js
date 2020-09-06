const express = new require("express");

const app = new express();
app.use(express.static('public'))

app.get("/", (req, res) => {
    res.send("Access");
});

app.get("/countdown", (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Connection": "keep-alive",
        "Cache-control": "no-cache",
        "Content-Security-Policy": "script-src 'self' https://apis.google.com",
    });
    countdown(res, 10);
});

const countdown = (res, count) => {
    res.write("data: " + count + "\n\n");

    // keep HTTP response open until it has no more events to send
    if (count) {
        setTimeout( _ => countdown(res, count-1), 1000);
    } else {
        res.end();
    }
};

const port = "3000";
app.listen(port, _ => console.log("Server listening at port " + port));