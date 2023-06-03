import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(8086, () => {
  console.log('Server is running on port 8086');
  console.log('1. 해당 서버는 인증 서버로 다룬다.');
  console.log('2. 채팅과 피드를 받아오기 위한 웹 서버로 다룬다.');
});