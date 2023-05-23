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
    console.log("1번");
    const result = await fetch('/api', {
      method: "POST",
    })
    const answer = await result.json();
    console.log(answer);
    console.log(answer[0].message.content);
    setView(answer[0].message.content);
  }

  function printText(a : any) {
    alert(a);
  }

  return (
    <>
      <button onClick={sendChat}>전송</button>

      <button onClick={printText}>병신</button>
      <p></p>
      {view}
    </>
  );
}
