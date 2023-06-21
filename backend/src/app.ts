import express, { Request, Response } from "express";
import https from "https";
import fs from "fs";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from 'body-parser';
import { feedBuffer, Feed } from "./feedbuffer";

import api from './api/api'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://1.254.141.230:3000", "https://toy-project-community.vercel.app"]
}));
app.use(bodyParser.json());
app.use('/api', api);

const httpsServer = https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
}, app);

const server = httpsServer.listen(8086, () => {
  console.log("Server is running on port 8086");
  console.log("1. 해당 서버는 피드, 채팅 서버로 다룬다.");
});

const serverIO = new Server(server, {
  cors: {
    origin: "*",
  },
});

serverIO.on("connection", (socket) => {
  // 클라이언트 접속시
  console.log("Connected Client : ", socket.id);

  // 모든 이용자는 접속시 피드를 로딩할 메인 채널로 강제 접속.
  // 메인 채널은 나갈 수 없음.
  socket.join("main");

  // 메인 채널에 접속한 사용자에게 피드 버퍼 전송.
  serverIO.to("main").emit("loading-feeds", JSON.stringify(feedBuffer));

  // 새 피드 작성 요청이 들어옴.
  socket.on("new-feed", (newFeed) => {
    const feed = JSON.parse(newFeed);
    feedBuffer.push(
      new Feed(
        feed.userImage,
        feed.userName,
        feed.feedContent,
        feed.regidate,
        feed.hashTag
      )
    );

    // 메인 채널에 접속한 사용자에게 업뎃된 피드 버퍼 전송.
    serverIO.to("main").emit("loading-feeds", JSON.stringify(feedBuffer));
  });
});
