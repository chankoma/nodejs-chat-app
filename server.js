const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
	res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
	res.send(req.body)
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
