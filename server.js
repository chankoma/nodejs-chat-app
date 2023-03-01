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

app.get("/login/:userID", (req, res) => {
	if (req.body.PASS === process.env.login_pass) {
		res.sendFile(__dirname + "/index.html");
	}else{
		res.send("passgatigau");
	};
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
