const { spawn } = require('child_process');
const axios = require('axios');
const config = require('./config');

console.log('🔥 Discord Roast Bot Supervisor - Ultra Aggressive Mode');

let botProcess = null;
let isRunning = false;

// Function to check if bot is actually online in Discord
async function checkBotStatus() {
  try {
    const response = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: {
        'Authorization': `Bot ${config.DISCORD_TOKEN}`
      }
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

// Function to start the bot
function startBot() {
  if (isRunning) {
    console.log('⚠️ Bot is already running, skipping restart...');
    return;
  }

  console.log('🚀 Starting Discord roast bot...');
  isRunning = true;
  
  botProcess = spawn('node', ['index.js'], {
    stdio: 'inherit',
    cwd: __dirname
  });

  botProcess.on('close', (code) => {
    console.log(`❌ Bot process exited with code ${code}`);
    isRunning = false;
    console.log('🔄 Restarting bot IMMEDIATELY...');
    setTimeout(() => startBot(), 1000); // Restart in 1 second
  });

  botProcess.on('error', (error) => {
    console.error('❌ Bot process error:', error);
    isRunning = false;
    console.log('🔄 Restarting bot IMMEDIATELY...');
    setTimeout(() => startBot(), 1000); // Restart in 1 second
  });

  return botProcess;
}

// Function to monitor bot status
async function monitorBot() {
  try {
    const isOnline = await checkBotStatus();
    
    if (!isOnline && !isRunning) {
      console.log('🔍 Bot detected as offline, restarting...');
      startBot();
    } else if (isOnline && !isRunning) {
      console.log('🔍 Bot detected as online but process not running, restarting...');
      startBot();
    } else if (isOnline && isRunning) {
      console.log('✅ Bot is online and running properly');
    } else {
      console.log('⚠️ Bot process running but Discord connection may be down');
    }
  } catch (error) {
    console.error('❌ Error checking bot status:', error);
    if (!isRunning) {
      console.log('🔄 Restarting bot due to error...');
      startBot();
    }
  }
}

// Start the bot initially
startBot();

// Monitor every 10 seconds
setInterval(monitorBot, 10000);

// Also monitor every 30 seconds for Discord API status
setInterval(async () => {
  const isOnline = await checkBotStatus();
  if (!isOnline) {
    console.log('🔍 Discord API check failed, ensuring bot is running...');
    if (!isRunning) {
      startBot();
    }
  }
}, 30000);

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down supervisor...');
  if (botProcess) {
    botProcess.kill();
  }
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down supervisor...');
  if (botProcess) {
    botProcess.kill();
  }
  process.exit(0);
});

console.log('🔥 Supervisor is now monitoring the bot every 10 seconds...'); 