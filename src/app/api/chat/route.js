import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initial system message to guide the assistant's behavior
const SYSTEM_MESSAGE = {
  role: "system",
  content: "You are a helpful, friendly assistant. Be concise in your responses."
};

export async function POST(request) {
  try {
    const { conversation, newUserMessage } = await request.json();
    
    // Construct the full message history
    const messages = [
      SYSTEM_MESSAGE,
      ...(conversation || []), // existing conversation history
      { role: "user", content: newUserMessage } // new user message
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
    });

    const assistantResponse = completion.choices[0].message;
    
    // Return both the response and the updated conversation
    return new Response(JSON.stringify({ 
      response: assistantResponse,
      updatedConversation: [
        ...(conversation || []),
        { role: "user", content: newUserMessage },
        assistantResponse
      ]
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return new Response(JSON.stringify({ 
      error: 'Error processing your request',
      details: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}