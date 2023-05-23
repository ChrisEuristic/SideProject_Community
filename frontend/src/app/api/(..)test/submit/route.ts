import { NextResponse } from "next/server";
import { Configuration } from "openai/dist/configuration";
import { OpenAIApi } from "openai/dist/api";

export async function POST() {
  console.log("2번")
  const configuration = new Configuration({
    apiKey: process.env.API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response1 = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "" },
      { role: "user", content: "" },
      {
        role: "assistant",
        content: "",
      },
      { role: "user", content: "tell me about him." },
    ],
    temperature: 0.5,
    max_tokens: 3000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const answer1 = response1.data.choices[0]?.message?.content;

  const response2 = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a psychotherapist. Speak professionally." },
      {
        role: "assistant",
        content: answer1 ?? "",
      },
      { role: "user", content: "Say it in Korean." },
    ],
    temperature: 0.5,
    max_tokens: 3000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const answer2 = response1.data.choices[0]?.message?.content;

  console.log(answer2);

  return NextResponse.json(response2.data.choices);
}
