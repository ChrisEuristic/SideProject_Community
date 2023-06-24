"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var cors_1 = require("cors");
var body_parser_1 = require("body-parser");
var feedbuffer_1 = require("./feedbuffer");
var api_1 = require("./api/api");
var app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    // origin: ["http://1.254.141.230:3000", "https://whoamiservice.vercel.app"]
    origin: "*",
}));
app.use(body_parser_1.default.json());
app.get("/", function (req, res) {
    res.status(200).send("Hello World");
});
app.use('/api', api_1.default);
// const httpsServer = https.createServer({
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem'),
// }, app);
var httpServer = http_1.default.createServer(app);
// const server = httpsServer.listen(8086, () => {
//   console.log("Server is running on port 8086");
//   console.log("1. 해당 서버는 피드, 채팅 서버로 다룬다.");
// });
var server = httpServer.listen(80, function () {
    console.log("Server is running on port 80");
    console.log("1. This server is Feed & Chat server.");
});
var serverIO = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
serverIO.on("connection", function (socket) {
    // 클라이언트 접속시
    console.log("Connected Client : ", socket.id);
    // 모든 이용자는 접속시 피드를 로딩할 메인 채널로 강제 접속.
    // 메인 채널은 나갈 수 없음.
    socket.join("main");
    // 메인 채널에 접속한 사용자에게 피드 버퍼 전송.
    serverIO.to("main").emit("loading-feeds", JSON.stringify(feedbuffer_1.feedBuffer));
    // 새 피드 작성 요청이 들어옴.
    socket.on("new-feed", function (newFeed) {
        var feed = JSON.parse(newFeed);
        feedbuffer_1.feedBuffer.push(new feedbuffer_1.Feed(feed.userImage, feed.userName, feed.feedContent, feed.regidate, feed.hashTag));
        // 메인 채널에 접속한 사용자에게 업뎃된 피드 버퍼 전송.
        serverIO.to("main").emit("loading-feeds", JSON.stringify(feedbuffer_1.feedBuffer));
    });
});
