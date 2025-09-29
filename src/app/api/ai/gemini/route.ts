import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the Gemini API with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { messages, category } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages are required and must be an array' },
        { status: 400 }
      );
    }

    // Get the model specified in the environment variables
    const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
    const model = genAI.getGenerativeModel({ model: modelName });

    // Prepare system prompt based on category
    let systemPrompt = 'You are a helpful AI health assistant.';
    
    switch (category) {
      case 'fitness':
        systemPrompt = 'You are a fitness coach AI. Provide personalized workout recommendations, analyze exercise routines, and suggest nutrition plans based on health data. Focus on evidence-based advice and always consider the user\'s health conditions.';
        break;
      case 'mental':
        systemPrompt = 'You are a mental wellness AI assistant. Provide supportive guidance, coping strategies, and mindfulness techniques. Always recommend professional help for serious mental health concerns.';
        break;
      case 'nutrition':
        systemPrompt = 'You are a nutrition advisor AI. Provide dietary recommendations, meal planning advice, and nutritional insights based on health data. Focus on evidence-based nutrition science.';
        break;
      default:
        systemPrompt = 'You are a general health assistant AI. Provide accurate, evidence-based health information while always reminding users to consult healthcare professionals for medical advice.';
    }

    // Format messages for Gemini
    const formattedMessages = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Ensure chat history starts with user message
    let chatHistory = formattedMessages.slice(0, -1);
    if (chatHistory.length > 0 && chatHistory[0].role === 'model') {
      // If first message is model, start with empty history
      chatHistory = [];
    }

    // Start a chat session with history (ensuring it starts with user)
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });

    // Get the last message (user's query)
    const lastMessage = formattedMessages[formattedMessages.length - 1];
    
    // Send the message to Gemini with system prompt and get the response
    const enhancedQuery = `${systemPrompt}\n\nUser: ${lastMessage.parts[0].text}`;
    const result = await chat.sendMessage(enhancedQuery);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}