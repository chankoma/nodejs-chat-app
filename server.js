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

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
	for (let i = 0; i < target.length; i++) {
		if (req.body.PASS === target[i]) {
			res.render("index", {data : req.body.ID, fields : i});
		};
	};
});

io.on("connection", (socket) => {
	//console.log("connected user");
	For (let i = 0; i < target.length; i++) {
		socket.on("chat message" + i, (msg) => {
			io.emit("chat message" + i, msg);
		})
	};
});


server.listen(process.env.PORT || PORT, () => {
	console.log("listening on 3000");
});
