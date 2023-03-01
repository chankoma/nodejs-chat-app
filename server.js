const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
	if (req.body.PASS === process.env.login_pass) {
		res.render("index", {data : req.body.ID});
	}else{
		res.send("miss!");
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
