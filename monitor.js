const { spawn } = require('child_process');
const path = require('path');

console.log('🔥 Discord Roast Bot Monitor Starting...');

function startBot() {
  console.log('🚀 Starting Discord roast bot...');
  
  const bot = spawn('node', ['index.js'], {
    stdio: 'inherit',
    cwd: __dirname
  });

  bot.on('close', (code) => {
    console.log(`❌ Bot process exited with code ${code}`);
    console.log('🔄 Restarting bot in 5 seconds...');
    
    setTimeout(() => {
      startBot();
    }, 5000);
  });

  bot.on('error', (error) => {
    console.error('❌ Bot process error:', error);
    console.log('🔄 Restarting bot in 5 seconds...');
    
    setTimeout(() => {
      startBot();
    }, 5000);
  });

  return bot;
}

// Start the bot
let botProcess = startBot();

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down bot monitor...');
  botProcess.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down bot monitor...');
  botProcess.kill();
  process.exit(0);
}); 