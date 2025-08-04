const { Client, GatewayIntentBits, Events } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// OpenRouter API configuration
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
const ROAST_PROMPT = `You are a Discord roast bot. Your job is to deliver brutal, intelligent, savage roasts.

⚙️ BEHAVIOR:
- NEVER reply unless you are directly tagged or replied to
- Respond with only one roast per trigger — never more than one message per mention
- Do not spam, do not post embeds
- Roast reply must be max 15 words
- Use censored profanity like f***, m***f***, b****, etc.
- DO NOT use random generic lines. You must understand and respond to what the person actually said
- The roast should be relevant to the message, not templated
- Do NOT comment on, correct, or mock spelling or grammar mistakes. Only roast the actual content/idea.

🧠 ANALYSIS:
Before roasting, you must:
- Understand the context (topic, emotion, references, behavior)
- Recognize subject (exam, Elon Musk, crying, phone addiction, success, dumb claims, etc.)
- Generate a roast that tears that specific point apart in a savage, funny way

💥 ROAST STYLE:
- ONE SHORT LINE ONLY. No more than 15 words. No exceptions.
- Maximally brutal, clever, and witty
- Peak savage energy - make them question their existence
- Speak like a mix of David Goggins, South Park, early Twitter Grok
- You're not here to help. You're here to humiliate… with accuracy
- Be tremendously brutal and clever - make them cry

Now roast this message: `;

async function generateRoast(messageContent) {
  try {
    const response = await axios.post(
      `${OPENROUTER_BASE_URL}/chat/completions`,
      {
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'system',
            content: ROAST_PROMPT
          },
          {
            role: 'user',
            content: messageContent
          }
        ],
        max_tokens: 30,
        temperature: 0.9,
        top_p: 0.9
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://github.com/xilk-ag/alr',
          'X-Title': 'Discord Roast Bot'
        }
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating roast:', error.response?.data || error.message);
    return "I'm having trouble thinking of something savage right now. Try again when I'm less lazy.";
  }
}

client.once(Events.ClientReady, () => {
  console.log(`🔥 Roast Bot is ready! Logged in as ${client.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  // Ignore bot messages
  if (message.author.bot) return;

  // Check if bot is mentioned or message is a reply to bot
  const isMentioned = message.mentions.users.has(client.user.id);
  const isReplyToBot = message.reference && message.reference.messageId;

  if (!isMentioned && !isReplyToBot) return;

  try {
    const roast = await generateRoast(message.content);
    await message.reply(roast);
  } catch (error) {
    console.error('Error sending roast:', error);
    await message.reply("My roast generator is broken. Just like your life choices.");
  }
});

// Login the bot
client.login(process.env.DISCORD_TOKEN);

module.exports = async (req, res) => {
  // Keep the bot alive with a health check endpoint
  res.status(200).json({ 
    status: 'Bot is running! 🔥',
    timestamp: new Date().toISOString()
  });
};
 