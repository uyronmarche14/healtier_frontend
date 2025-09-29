import { User, Message, Chat } from '@/types/chat'

export const mockUsers: User[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      role: 'doctor',
      avatar: '/api/placeholder/40/40',
      status: 'online'
    },
    {
      id: '2', 
      name: 'John Smith',
      role: 'patient',
      status: 'online'
    },
    {
      id: '3',
      name: 'Dr. Michael Chen',
      role: 'doctor',
      status: 'offline'
    },
    {
      id: '4',
      name: 'Emily Davis',
      role: 'patient',
      status: 'offline'
    },
    {
      id: '5',
      name: 'AI Assistant',
      role: 'doctor',
      status: 'online'
    }
  ];
  
  export const mockMessages: Record<string, Message[]> = {
    'chat-1': [
      {
        id: '1',
        content: 'Good morning John, how are you feeling today after starting the new medication?',
        senderId: '1',
        timestamp: new Date(Date.now() - 600000),
        type: 'text'
      },
      {
        id: '2',
        content: 'Hi Dr. Johnson, much better actually. The chest tightness has reduced a lot, though I still feel a bit dizzy in the evenings.',
        senderId: '2',
        timestamp: new Date(Date.now() - 570000),
        type: 'text'
      },
      {
        id: '3',
        content: 'That’s good progress. Can you describe the dizziness—does it feel like the room is spinning, or more like lightheadedness?',
        senderId: '1',
        timestamp: new Date(Date.now() - 540000),
        type: 'text'
      },
      {
        id: '4',
        content: 'It’s more like lightheadedness. Happens mostly when I stand up quickly.',
        senderId: '2',
        timestamp: new Date(Date.now() - 500000),
        type: 'text'
      },
      {
        id: '5',
        content: 'That could be a side effect of the medication. I suggest drinking more water and standing up slowly. If it continues, we may adjust the dose.',
        senderId: '1',
        timestamp: new Date(Date.now() - 470000),
        type: 'text'
      },
      {
        id: '6',
        content: 'Would you like me to schedule a follow-up appointment with Dr. Johnson next week?',
        senderId: '5',
        timestamp: new Date(Date.now() - 460000),
        type: 'ai_response'
      }
    ],
    'chat-2': [
      {
        id: '7',
        content: 'Dr. Chen, I’ve been having recurring headaches for the past 3 days. They get worse at night.',
        senderId: '4',
        timestamp: new Date(Date.now() - 720000),
        type: 'text'
      },
      {
        id: '8',
        content: 'Can you describe the pain? Is it sharp, dull, or throbbing?',
        senderId: '3',
        timestamp: new Date(Date.now() - 700000),
        type: 'text'
      },
      {
        id: '9',
        content: 'It’s a throbbing pain, mostly on the left side. Sometimes my vision blurs for a few seconds too.',
        senderId: '4',
        timestamp: new Date(Date.now() - 690000),
        type: 'text'
      },
      {
        id: '10',
        content: 'Blurred vision along with headache can sometimes indicate a migraine. Do you also feel sensitive to light or sound?',
        senderId: '3',
        timestamp: new Date(Date.now() - 650000),
        type: 'text'
      },
      {
        id: '11',
        content: 'Yes, especially light. Even looking at my phone feels uncomfortable when it happens.',
        senderId: '4',
        timestamp: new Date(Date.now() - 620000),
        type: 'text'
      },
      {
        id: '12',
        content: 'Based on your symptoms, this sounds like a migraine episode. I recommend resting in a dark, quiet room when the headache starts, staying hydrated, and keeping a record of triggers like certain foods or stress.',
        senderId: '3',
        timestamp: new Date(Date.now() - 600000),
        type: 'text'
      },
      {
        id: '13',
        content: 'Would you like me to log this episode in your health record and notify Dr. Chen if it recurs more than twice this week?',
        senderId: '5',
        timestamp: new Date(Date.now() - 590000),
        type: 'ai_response'
      }
    ],
    'chat-3': [
      {
        id: '14',
        content: 'Hello Emily, your lab results are ready. Your cholesterol levels are slightly higher than normal.',
        senderId: '1',
        timestamp: new Date(Date.now() - 400000),
        type: 'text'
      },
      {
        id: '15',
        content: 'Oh, I see. Is that something I should be worried about?',
        senderId: '4',
        timestamp: new Date(Date.now() - 380000),
        type: 'text'
      },
      {
        id: '16',
        content: 'Not necessarily, but it’s something to monitor. I’d suggest reducing fried foods and exercising regularly.',
        senderId: '1',
        timestamp: new Date(Date.now() - 360000),
        type: 'text'
      },
      {
        id: '17',
        content: 'I can also generate a 7-day heart-healthy meal plan for you. Would you like me to do that?',
        senderId: '5',
        timestamp: new Date(Date.now() - 350000),
        type: 'ai_response'
      }
    ]
  };
  
  export const mockChats: Chat[] = [
    {
      id: 'chat-1',
      participants: [mockUsers[0], mockUsers[1]],
      lastMessage: {
        id: '6',
        content: 'Would you like me to schedule a follow-up appointment with Dr. Johnson next week?',
        senderId: '5',
        timestamp: new Date(Date.now() - 460000),
        type: 'ai_response'
      },
      unreadCount: 0
    },
    {
      id: 'chat-2',
      participants: [mockUsers[2], mockUsers[3]],
      lastMessage: {
        id: '13',
        content: 'Would you like me to log this episode in your health record and notify Dr. Chen if it recurs more than twice this week?',
        senderId: '5',
        timestamp: new Date(Date.now() - 590000),
        type: 'ai_response'
      },
      unreadCount: 1
    },
    {
      id: 'chat-3',
      participants: [mockUsers[0], mockUsers[3]],
      lastMessage: {
        id: '17',
        content: 'I can also generate a 7-day heart-healthy meal plan for you. Would you like me to do that?',
        senderId: '5',
        timestamp: new Date(Date.now() - 350000),
        type: 'ai_response'
      },
      unreadCount: 2
    }
  ];
  