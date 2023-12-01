import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

interface SessionStore {
  [sessionId: string]: string;
}
// Simple in-memory storage for demonstration purposes
const sessionStore: SessionStore = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method should be POST' });
    return;
  }

  try {
    const { message, sessionId } = req.body;

    // Retrieve the existing conversation history
    const history = sessionStore[sessionId] || "";

    const prompt = `My name is Newt Trition and I have a silly demeanor. The following is a conversation with a university student at UTC in Chattanooga, TN. The assistant is helpful, creative, clever, and very informed on nutrition.\n${history}\nHuman: ${message}\nAI:`;

    const url = 'https://api.openai.com/v1/completions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
    };
    const data = {
      model: 'gpt-3.5-turbo-instruct', // specify the model
      // eslint-disable-next-line object-shorthand
      prompt: prompt,
      max_tokens: 350,
      n: 1,
      stop: ["\n", " Human:", " AI:"]
    };

    const response = await axios.post(url, data, { headers });

    // Update the conversation history with the AI response
    const aiResponse = response.data.choices[0].text.trim();
    sessionStore[sessionId] = `${history}\nHuman: ${message}\nAI: ${aiResponse}`;

    res.status(200).json({ message: aiResponse });
  } catch (error) {
    console.error('Error in OpenAI API call', error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error('Error', error.message);
      }
    }

    res.status(500).json({ message: 'Internal server error' });
  }
}
