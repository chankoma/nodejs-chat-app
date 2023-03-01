const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;


app.get("/", (req, res) => {
	res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
	res.send("hello")
});

io.on("connection", (socket) => {
	console.log("connected user");

	socket.on("chat message", (msg) => {
		//console.log("message:" + msg);
		io.emit("chat message", msg);
	})
});


server.listen(process.env.PORT || PORT, () => {
	console.log("listening on 3000");
});
