# 🔥 Discord AI Roast Bot

A savage Discord bot that delivers brutal, intelligent roasts using OpenRouter AI. The bot only responds when tagged (@bot) or replied to, ensuring it doesn't spam your server.

## Features

- 🤖 **Smart AI Integration**: Uses OpenRouter API with Claude 3.5 Sonnet for context-aware roasts
- 🎯 **Precise Targeting**: Only responds when directly mentioned or replied to
- 🧠 **Context Analysis**: Understands message content and generates relevant roasts
- 💀 **Savage Style**: Mix of David Goggins, South Park, and early Twitter Grok energy
- 📝 **Word Limit**: Max 70 words per roast to keep it concise
- 🚫 **No Spam**: One roast per trigger, no embeds, no random responses

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configuration

The bot is already configured with your credentials in `config.js`:
- Discord Bot Token
- Discord Client ID  
- OpenRouter API Key

### 3. Run the Bot

```bash
# Production
npm start

# Development (with auto-restart)
npm run dev
```

## Usage

### How to Trigger Roasts

1. **Mention the bot**: `@bot you're so dumb`
2. **Reply to a message**: Reply to any message with the bot

### Example Interactions

```
User: @bot I'm the next Elon Musk
Bot: You? Next Elon? Bro, you can't even launch yourself out of bed without 10 alarms. The only thing you're innovating is new ways to waste time.

User: @bot I studied 12 hours today  
Bot: And still dumb as a rock in airplane mode. You studied, sure — just not the right f***ing subject.

User: @bot I'm depressed as hell
Bot: Maybe if you got off your a** and did something with your life, depression wouldn't cling to you like your browser tabs — 38 open, zero useful.
```

## Bot Behavior

- ✅ **Responds to**: Direct mentions (@bot) and replies
- ❌ **Ignores**: All other messages
- 📏 **Length**: Max 70 words per roast
- 🎭 **Style**: Smart, savage, sarcastic with censored profanity
- 🧠 **Intelligence**: Context-aware, not generic templates

## Technical Details

- **Framework**: Discord.js v14
- **AI Provider**: OpenRouter API
- **Model**: Claude 3.5 Sonnet
- **Language**: Node.js/JavaScript

## Bot Invite Link

Use this link to invite the bot to your server:
```
https://discord.com/api/oauth2/authorize?client_id=1401784369881940081&permissions=2048&scope=bot
```

## Permissions Required

- Send Messages
- Read Message History
- Use Slash Commands

## Error Handling

The bot includes comprehensive error handling for:
- API failures
- Network issues
- Invalid messages
- Rate limiting

## License

MIT License - Feel free to modify and distribute! 