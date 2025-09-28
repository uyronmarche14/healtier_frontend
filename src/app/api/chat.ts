import { GoogleGenerativeAI } from '@google/generative-ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Validate API key
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      throw new Error('GOOGLE_GENERATIVE_AI_API_KEY environment variable is not set');
    }

    // Create Google Generative AI instance
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Add healthcare context as system message
    const systemMessage = `You are a helpful healthcare assistant for the Healtier platform. You provide information about:
- General health and wellness advice
- Medication information and reminders
- Appointment scheduling assistance
- Health tracking and monitoring
- Symptoms and when to see a doctor

Important guidelines:
- Always provide accurate, evidence-based health information
- Recommend consulting healthcare professionals for medical diagnoses
- Be supportive and empathetic
- Never provide specific medical diagnoses or treatment recommendations
- Keep responses clear, concise, and helpful
- If unsure, recommend speaking with a healthcare provider`;

    // Combine system message with user messages
    const conversationHistory = [
      { role: 'user', parts: [{ text: systemMessage }] },
      ...messages.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }))
    ];

    // Generate response using the model
    const result = await model.generateContent({
      contents: conversationHistory
    });

    const response = await result.response;
    const text = response.text();

    // Return the response
    return new Response(JSON.stringify({ response: text }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate response',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}