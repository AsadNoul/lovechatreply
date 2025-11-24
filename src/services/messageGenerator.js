// Mock AI message generation service
// In a real app, this would call an AI API like OpenAI, Anthropic, etc.

const messageTemplates = {
  'good-morning': {
    Romantic: [
      'Good morning, my love! Waking up knowing you\'re in my life makes every day brighter. Hope your day is as beautiful as you are! 💕',
      'Rise and shine, gorgeous! Just wanted to remind you that you\'re the first thought on my mind every morning. Have an amazing day!',
      'Morning, beautiful! I hope today brings you as much joy as you bring to my life. Can\'t wait to see you later! ❤️',
    ],
    Playful: [
      'Wakey wakey, sleeping beauty! ☀️ Time to rise and shine and be your awesome self today!',
      'Good morning! Did you know that thinking about you is my favorite way to start the day? Now you do! 😊',
      'Morning! I hope your day is filled with good vibes, great coffee, and zero Monday energy (even if it\'s Monday!).',
    ],
    Caring: [
      'Good morning! I hope you slept well. Remember to take care of yourself today and don\'t forget to eat breakfast! 🥐',
      'Morning! Just checking in to say I hope you have a wonderful day ahead. You\'ve got this! 💪',
      'Good morning! Sending you positive vibes for a great day. Remember, I\'m here if you need anything! ☀️',
    ],
    Flirty: [
      'Good morning, cutie! 😏 Just wanted to say you looked pretty amazing in my dreams last night...',
      'Morning! Fair warning: I might be thinking about you all day today. Hope that\'s okay with you! 😉',
      'Rise and shine, gorgeous! Ready to make today as incredible as you are? 💋',
    ],
  },
  'first-dm': {
    Romantic: [
      'Hi! I know this might seem random, but I couldn\'t help noticing you and wanted to reach out. Hope that\'s okay! 😊',
      'Hey! I\'ve been wanting to say hi for a while now. You seem really interesting and I\'d love to get to know you better.',
    ],
    Flirty: [
      'Hey there! 😊 I saw your profile and just had to say hi. You seem pretty amazing!',
      'Hi! Okay, I\'m just going to be honest - you caught my attention and I\'d love to chat. What do you say? 😉',
    ],
    Playful: [
      'Hey! Quick question: on a scale of 1-10, how weird is it that I\'m messaging you? Hoping for a 5 or lower! 😄',
      'Hi! Fair warning: I\'m terrible at first messages, but I promise I get more interesting! Want to find out? 😊',
    ],
  },
  'apology': {
    Apology: [
      'I\'m really sorry about what happened. I know I messed up, and I want you to know that I take full responsibility. Can we talk about this?',
      'Hey, I owe you an apology. What I did/said was wrong, and I\'m genuinely sorry. You mean a lot to me, and I hope we can work through this.',
      'I\'m so sorry. I\'ve been thinking about what happened, and I realize I was completely in the wrong. I hope you can forgive me.',
    ],
  },
  'anniversary': {
    Romantic: [
      'Happy Anniversary, my love! ❤️ Every moment with you has been a gift. Here\'s to many more amazing years together!',
      'Can\'t believe it\'s been another year with you! You make every day special, and I\'m so grateful for our love. Happy Anniversary! 💕',
      'Happy Anniversary to the person who makes my heart skip a beat! Thank you for being my partner in everything. I love you more each day! 🥂',
    ],
    Sincere: [
      'Happy Anniversary! Looking back on our time together fills my heart with joy. Thank you for being you and for choosing me every day.',
      'Another year together, and I still feel so lucky to have you in my life. Happy Anniversary, and here\'s to our future! 💖',
    ],
  },
  'thinking-of-you': {
    Romantic: [
      'Just wanted to let you know you\'re on my mind today. Actually, you\'re on my mind most days. Hope you\'re doing well! 💭❤️',
      'Thinking of you and smiling. Hope wherever you are, whatever you\'re doing, you\'re having a great day! 💕',
    ],
    Sincere: [
      'Hey! You popped into my thoughts and I wanted to reach out. Hope you\'re doing well! 😊',
      'Just thinking about you and wanted to send some positive vibes your way. Hope today is treating you kindly!',
    ],
    Caring: [
      'Hi! You\'ve been on my mind. Just wanted to check in and see how you\'re doing. Here if you need anything! 💙',
      'Thinking of you today. Hope everything is going well, and remember I\'m always here if you need to talk! 🤗',
    ],
  },
  'cheering-up': {
    Support: [
      'Hey, I know things are tough right now, but I believe in you! You\'re stronger than you think, and this will pass. Here if you need me! 💪',
      'Sending you a big virtual hug! 🤗 Remember, tough times don\'t last, but tough people do. You\'ve got this!',
      'I know you\'re going through a lot, and I just want you to know I\'m here for you. Better days are coming, I promise! ☀️',
    ],
    Playful: [
      'Hey you! Time to turn that frown upside down! 😊 What can I do to make you smile? Name it and it\'s done!',
      'Knock knock! (You\'re supposed to say "who\'s there?") It\'s me, here to cheer you up! Want to talk about it or need a distraction? 🎉',
    ],
  },
};

export const generateMessages = async (scenario, tone, language, length) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Get messages from templates
  const scenarioMessages = messageTemplates[scenario.id] || {};
  let messages = scenarioMessages[tone] || scenarioMessages['Romantic'] || [];

  // If no messages found, generate generic ones
  if (messages.length === 0) {
    messages = [
      `A ${tone.toLowerCase()} message for ${scenario.title.toLowerCase()}.`,
      `Another ${tone.toLowerCase()} way to express this: ${scenario.title.toLowerCase()}.`,
      `Here's a ${tone.toLowerCase()} take on ${scenario.title.toLowerCase()}.`,
    ];
  }

  // Adjust length (simple simulation)
  if (length === 'Medium') {
    messages = messages.map((msg) => msg + ' I really mean that! 💖');
  } else if (length === 'Long') {
    messages = messages.map(
      (msg) =>
        msg +
        ' I really mean that! You mean the world to me, and I wanted to take a moment to express how I feel. 💖✨'
    );
  }

  // Language translation (mock - in real app would use translation API)
  if (language !== 'English') {
    messages = messages.map((msg) => `[${language}] ${msg}`);
  }

  return messages;
};

export const generateCustomMessage = async (prompt, tone, language, length) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock generation based on prompt
  const messages = [
    `A ${tone.toLowerCase()} message about: ${prompt}`,
    `Here's another ${tone.toLowerCase()} way to say it: ${prompt}`,
    `One more ${tone.toLowerCase()} option for: ${prompt}`,
  ];

  return messages;
};
