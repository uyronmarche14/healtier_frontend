import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the Gemini API with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

// Health and fitness knowledge base
const healthKnowledgeBase = {
  fitness: [
    "Regular exercise can help reduce the risk of chronic diseases such as heart disease, diabetes, and certain cancers.",
    "The American Heart Association recommends at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous aerobic activity per week.",
    "Strength training exercises should be performed at least twice per week to maintain muscle mass and bone density.",
    "High-Intensity Interval Training (HIIT) can be more effective for fat loss than steady-state cardio.",
    "Rest days are essential for muscle recovery and growth.",
    "Proper form during exercise is crucial to prevent injuries and maximize results.",
    "Progressive overload is necessary for continued strength and endurance improvements.",
    "A combination of cardio and strength training provides the most comprehensive fitness benefits."
  ],
  nutrition: [
    "A balanced diet should include proteins, carbohydrates, healthy fats, vitamins, and minerals.",
    "Protein is essential for muscle repair and growth, with recommended intake of 0.8-2.0g per kg of body weight.",
    "Complex carbohydrates provide sustained energy and are found in whole grains, legumes, and vegetables.",
    "Healthy fats, such as those in avocados, nuts, and olive oil, support hormone production and brain health.",
    "Hydration is critical for optimal physical performance and recovery.",
    "Pre-workout nutrition should focus on carbohydrates for energy, while post-workout meals should include protein for recovery.",
    "Micronutrients like vitamins and minerals play crucial roles in energy production, immune function, and recovery.",
    "Meal timing can impact workout performance and recovery, with recommendations to eat 1-3 hours before exercise."
  ],
  mentalHealth: [
    "Exercise releases endorphins, which can help reduce stress and improve mood.",
    "Regular physical activity is associated with reduced symptoms of anxiety and depression.",
    "Mindfulness practices during exercise can enhance mental well-being and focus.",
    "Setting realistic fitness goals can boost self-esteem and motivation.",
    "Social aspects of group exercise can combat feelings of isolation and improve mental health.",
    "Adequate sleep is essential for mental recovery and cognitive function.",
    "Overtraining can lead to mental fatigue and burnout.",
    "Mind-body exercises like yoga and tai chi can improve both physical and mental well-being."
  ],
  healthConditions: [
    "Exercise programs should be modified for individuals with chronic conditions like heart disease, diabetes, or arthritis.",
    "Low-impact exercises are recommended for those with joint issues or osteoporosis.",
    "Cardiac rehabilitation programs combine exercise, education, and counseling for heart disease patients.",
    "Regular physical activity can help manage blood glucose levels in people with diabetes.",
    "Exercise can help manage symptoms of depression and anxiety disorders.",
    "Specific exercises can help manage chronic pain conditions.",
    "Pregnancy requires modifications to exercise routines for safety.",
    "Rehabilitation exercises are crucial for recovery after injury or surgery."
  ]
};

export async function POST(req: NextRequest) {
  try {
    const { messages, category, query } = await req.json();
    
    if (!messages || !Array.isArray(messages) || !query) {
      return NextResponse.json(
        { error: 'Messages and query are required' },
        { status: 400 }
      );
    }

    // Get the model specified in the environment variables
    const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
    const model = genAI.getGenerativeModel({ model: modelName });

    // Determine which knowledge base to use based on the query and category
    let relevantKnowledge: string[] = [];
    
    if (category === 'fitness') {
      relevantKnowledge = [...healthKnowledgeBase.fitness];
    } else if (category === 'nutrition') {
      relevantKnowledge = [...healthKnowledgeBase.nutrition];
    } else if (category === 'mental') {
      relevantKnowledge = [...healthKnowledgeBase.mentalHealth];
    } else {
      // For general category, include a mix of knowledge
      relevantKnowledge = [
        ...healthKnowledgeBase.fitness.slice(0, 3),
        ...healthKnowledgeBase.nutrition.slice(0, 3),
        ...healthKnowledgeBase.mentalHealth.slice(0, 2)
      ];
    }

    // If query mentions health conditions, add that knowledge
    if (query.toLowerCase().includes('condition') || 
        query.toLowerCase().includes('disease') || 
        query.toLowerCase().includes('injury') ||
        query.toLowerCase().includes('pain')) {
      relevantKnowledge = [...relevantKnowledge, ...healthKnowledgeBase.healthConditions];
    }

    // Prepare system prompt with RAG context
    let systemPrompt = `You are a helpful AI health assistant. Use the following relevant health information to inform your response:

${relevantKnowledge.join('\n\n')}

Based on this information and your knowledge, provide an accurate, helpful response to the user's query. Always prioritize evidence-based information and recommend consulting healthcare professionals for medical advice.`;
    
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

    // Start a chat session with history (excluding system prompt)
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
    
    // Send the message to Gemini with RAG context and get the response
    const enhancedQuery = `${systemPrompt}\n\nUser: ${lastMessage.parts[0].text}`;
    const result = await chat.sendMessage(enhancedQuery);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error: any) {
    console.error('Error calling Gemini API with RAG:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}