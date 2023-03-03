const express = require("express");
const bodyParser = require("body-parser");
//const ejs = require("ejs");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;

const target = [
	process.env.login_pass_1, 
	process.env.login_pass_2
	];
const message = ["apple", "orange"];

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
	for (let i = 0; i < target.length; i++) {
		if (req.body.PASS === target[i]) {
			res.render("index", {data : req.body.ID, fields : i, mess : message[i]});
		};
		res.send("miss!");
	};
});

io.on("connection", (socket) => {
	console.log("connected user");
	for (let i = 0; i < message.length; i++) {
		socket.on(message[i], (msg) => {
			console.log(msg);
			io.emit(message[i], msg);
		});
	};
});


server.listen(process.env.PORT || PORT, () => {
	console.log("listening on 3000");
});
