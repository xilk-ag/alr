# 🔥 24/7 Discord Bot Setup on Vercel

This guide will help you deploy your Discord roast bot to Vercel so it runs 24/7, even when your computer is off!

## 🚀 Quick Deploy

### 1. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository: `xilk-ag/alr`
4. Configure settings:
   - **Framework Preset**: Node.js
   - **Root Directory**: `./` (default)
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
5. Click "Deploy"

### 2. Set Environment Variables
In your Vercel project dashboard:
1. Go to "Settings" → "Environment Variables"
2. Add these variables:
   ```
   DISCORD_TOKEN = your_discord_bot_token
   DISCORD_CLIENT_ID = your_discord_client_id
   OPENROUTER_API_KEY = your_openrouter_api_key
   ```
3. Click "Save"

### 3. Enable Cron Jobs (Vercel Pro Required)
The bot uses Vercel Cron to stay alive:
- **Schedule**: Every 5 minutes (`*/5 * * * *`)
- **Endpoint**: `/ping`
- **Purpose**: Keeps the Discord connection alive

## 🔧 Alternative: Free Keep-Alive Service

If you don't have Vercel Pro, use a free service:

### Option A: UptimeRobot (Recommended)
1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Sign up for free account
3. Add new monitor:
   - **Monitor Type**: HTTP(s)
   - **URL**: `https://your-project.vercel.app/ping`
   - **Check Interval**: 5 minutes
   - **Alert When**: Down
4. Save monitor

### Option B: Cron-job.org
1. Go to [cron-job.org](https://cron-job.org)
2. Create account
3. Add new cronjob:
   - **URL**: `https://your-project.vercel.app/ping`
   - **Schedule**: Every 5 minutes
   - **Enabled**: Yes

## 🎯 How It Works

### Architecture
```
Discord Server → Bot (Vercel) → OpenRouter AI → Roast Response
     ↑
Keep-Alive Service (Every 5 min)
```

### Keep-Alive Mechanism
1. **Vercel Cron** or **External Service** pings `/ping` every 5 minutes
2. **Ping endpoint** initializes Discord bot connection
3. **Bot stays connected** and responds to mentions/replies
4. **Process restarts** if it goes down

## ✅ Verification

### Test Your Bot
1. **Visit your Vercel URL**: `https://your-project.vercel.app`
2. **Should see**: `"Bot is alive and roasting! 🔥"`
3. **Check Discord**: Mention your bot or reply to it
4. **Should respond**: With a savage roast

### Monitor Status
- **Vercel Dashboard**: Check function logs
- **UptimeRobot**: Monitor uptime
- **Discord**: Test bot responses

## 🛠️ Troubleshooting

### Bot Not Responding
1. **Check environment variables** in Vercel
2. **Verify Discord token** is correct
3. **Check Vercel function logs** for errors
4. **Test ping endpoint** manually

### Keep-Alive Not Working
1. **Vercel Pro**: Enable cron jobs
2. **Free tier**: Set up UptimeRobot
3. **Check ping endpoint**: Should return 200 status
4. **Verify schedule**: Every 5 minutes

### High Latency
1. **Check OpenRouter API** response times
2. **Monitor Vercel function** cold starts
3. **Consider upgrading** to Vercel Pro for better performance

## 💰 Cost Breakdown

### Vercel Free Tier
- **Bandwidth**: 100GB/month
- **Function Execution**: 100GB-seconds/month
- **Perfect for Discord bots** - very low usage

### Vercel Pro ($20/month)
- **Unlimited bandwidth**
- **Cron jobs included**
- **Better performance**
- **Advanced analytics**

### External Services
- **UptimeRobot**: Free (50 monitors)
- **Cron-job.org**: Free
- **No additional cost**

## 🎉 Success!

Once deployed:
- ✅ **Bot runs 24/7** on Vercel
- ✅ **Works when computer is off**
- ✅ **Responds to Discord mentions**
- ✅ **Generates savage roasts**
- ✅ **Auto-restarts if needed**

Your Discord roast bot is now truly 24/7! 🔥 