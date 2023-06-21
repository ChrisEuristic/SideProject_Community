"use client";
import Image from "next/image";
import { Configuration } from "openai/dist/configuration";
import { OpenAIApi } from "openai/dist/api";
import { useState } from "react";

export default function Home() {

  const [view, setView] = useState("");

  const configuration = new Configuration({
    apiKey: process.env.API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  async function sendChat() {
    const result = await fetch('/api', {
      method: "POST",
    })
    const answer = await result.json();
    setView(answer[0].message.content);
  }

  function printText(a : any) {
    alert(a);
  }

  return (
    <>
      <button onClick={sendChat}>전송</button>

      <button onClick={printText}>ㅇㅇ</button>
      <p></p>
      {view}
    </>
  );
}
