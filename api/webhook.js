const axios = require('axios');

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

async function sendDiscordMessage(channelId, content, replyToMessageId = null) {
  try {
    const messageData = {
      content: content
    };

    if (replyToMessageId) {
      messageData.message_reference = {
        message_id: replyToMessageId
      };
    }

    await axios.post(
      `https://discord.com/api/v10/channels/${channelId}/messages`,
      messageData,
      {
        headers: {
          'Authorization': `Bot ${process.env.DISCORD_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error sending Discord message:', error.response?.data || error.message);
  }
}

module.exports = async (req, res) => {
  // Handle Discord webhook verification
  if (req.method === 'GET') {
    return res.status(200).json({ 
      status: 'Bot webhook endpoint is ready! 🔥',
      timestamp: new Date().toISOString()
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    // Ignore bot messages
    if (message.author.bot) {
      return res.status(200).json({ status: 'Ignored bot message' });
    }

    // Check if bot is mentioned or message is a reply to bot
    const botUserId = process.env.DISCORD_CLIENT_ID;
    const isMentioned = message.mentions && message.mentions.some(mention => mention.id === botUserId);
    const isReplyToBot = message.referenced_message && message.referenced_message.author.id === botUserId;

    if (!isMentioned && !isReplyToBot) {
      return res.status(200).json({ status: 'Not mentioned or replied to' });
    }

    // Generate and send roast
    const roast = await generateRoast(message.content);
    await sendDiscordMessage(message.channel_id, roast, message.id);

    res.status(200).json({ 
      status: 'Roast sent successfully! 🔥',
      roast: roast
    });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}; 