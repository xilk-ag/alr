# 🚀 Heroku Deployment Guide

## Deploy Your Discord Roast Bot to Heroku (24/7)

### 📋 Prerequisites
1. **Heroku Account** - Sign up at [heroku.com](https://heroku.com)
2. **Heroku CLI** - Install from [devcenter.heroku.com](https://devcenter.heroku.com/articles/heroku-cli)
3. **Git** - Make sure your project is in a Git repository

### 🔧 Step-by-Step Deployment

#### 1. Install Heroku CLI
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Or download from heroku.com
```

#### 2. Login to Heroku
```bash
heroku login
```

#### 3. Create Heroku App
```bash
# In your project directory
heroku create your-roast-bot-name
```

#### 4. Set Environment Variables
```bash
# Set your Discord bot token
heroku config:set DISCORD_TOKEN="YOUR_DISCORD_BOT_TOKEN_HERE"

# Set your OpenRouter API key
heroku config:set OPENROUTER_API_KEY="YOUR_OPENROUTER_API_KEY_HERE"
```

#### 5. Deploy to Heroku
```bash
# Add all files to git (if not already done)
git add .

# Commit changes
git commit -m "Deploy roast bot to Heroku"

# Push to Heroku
git push heroku main
```

#### 6. Start the Bot
```bash
# Scale the worker dyno (this is what runs your bot)
heroku ps:scale worker=1
```

#### 7. Check Bot Status
```bash
# View logs
heroku logs --tail

# Check dyno status
heroku ps
```

### 🎯 Your Bot is Now 24/7!

- ✅ **Runs continuously** even when your computer is off
- ✅ **Auto-restarts** if it crashes
- ✅ **Professional hosting** with Heroku
- ✅ **Free tier available** (with limitations)

### 🔧 Management Commands

**View logs:**
```bash
heroku logs --tail
```

**Restart the bot:**
```bash
heroku restart
```

**Stop the bot:**
```bash
heroku ps:scale worker=0
```

**Start the bot:**
```bash
heroku ps:scale worker=1
```

### 💰 Heroku Pricing
- **Free tier:** 550-1000 dyno hours/month
- **Paid:** $7/month for unlimited usage

### 🎉 Congratulations!
Your Discord roast bot is now running 24/7 on Heroku cloud hosting! 