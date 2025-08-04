const { Client, GatewayIntentBits, Events } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

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
          'HTTP-Referer': 'https://github.com/your-repo/discord-roast-bot',
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

// Send introduction message when bot joins a server
client.on(Events.GuildCreate, async (guild) => {
  console.log(`🔥 Bot joined new server: ${guild.name}`);
  
  try {
    // Find the general channel with priority order
    const generalChannel = guild.channels.cache.find(channel => 
      channel.type === 0 && // Text channel
      channel.name === 'chat-general'
    ) || guild.channels.cache.find(channel => 
      channel.type === 0 && // Text channel
      channel.name === 'general'
    ) || guild.channels.cache.find(channel => 
      channel.type === 0 && // Text channel
      channel.name === 'chat'
    ) || guild.channels.cache.find(channel => 
      channel.type === 0 && // Text channel
      channel.name === 'main'
    ) || guild.channels.cache.find(channel => 
      channel.type === 0 && channel.permissionsFor(client.user).has('SendMessages')
    );

    if (generalChannel) {
      const introMessage = `Yo. I'm about.blank — your friendly neighborhood roast dealer.

Tag me or reply to me if you really wanna get cooked.

🔥 I don't do random s*** — I read what you say, then break it down harder than your last relationship.

Just one roast per tag. No spam. No mercy.

Wanna test how dumb your takes are?

@${client.user.username} . I f***ing dare you.`;

      await generalChannel.send(introMessage);
      console.log(`✅ Sent intro message to ${guild.name} in #${generalChannel.name}`);
    } else {
      console.log(`⚠️ Could not find suitable channel in ${guild.name} for intro message`);
    }
  } catch (error) {
    console.error(`❌ Error sending intro message to ${guild.name}:`, error);
  }
});

client.on(Events.MessageCreate, async (message) => {
  // Ignore bot messages
  if (message.author.bot) return;

  // Check if bot is mentioned or replied to
  const isMentioned = message.mentions.users.has(client.user.id);
  const isRepliedTo = message.reference && message.reference.messageId;

  if (!isMentioned && !isRepliedTo) return;

  // Get the content to roast
  let contentToRoast = message.content;
  
  // If it's a reply, get the original message content
  if (isRepliedTo && !isMentioned) {
    try {
      const repliedMessage = await message.channel.messages.fetch(message.reference.messageId);
      contentToRoast = repliedMessage.content;
    } catch (error) {
      console.error('Error fetching replied message:', error);
      return;
    }
  }

  // Remove bot mention from content
  contentToRoast = contentToRoast.replace(/<@!?\d+>/g, '').trim();

  // Don't roast if there's no content
  if (!contentToRoast) {
    await message.reply("I need something to roast, genius. Try saying something worth mocking.");
    return;
  }

  // Generate and send roast
  try {
    const roast = await generateRoast(contentToRoast);
    await message.reply(roast);
  } catch (error) {
    console.error('Error sending roast:', error);
    await message.reply("My roast game is broken right now. Even my insults are failing me.");
  }
});

// Error handling
client.on('error', (error) => {
  console.error('Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN); 