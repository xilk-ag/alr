const { Client, GatewayIntentBits } = require('discord.js');

module.exports = async (req, res) => {
  try {
    // Check environment variables
    const envCheck = {
      hasToken: !!process.env.DISCORD_TOKEN,
      hasClientId: !!process.env.DISCORD_CLIENT_ID,
      hasApiKey: !!process.env.OPENROUTER_API_KEY,
      tokenLength: process.env.DISCORD_TOKEN ? process.env.DISCORD_TOKEN.length : 0,
      clientId: process.env.DISCORD_CLIENT_ID || 'NOT_SET'
    };

    // Try to create Discord client
    let discordStatus = 'Not tested';
    try {
      const client = new Client({
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.MessageContent,
        ],
      });

      // Test login
      await client.login(process.env.DISCORD_TOKEN);
      discordStatus = 'Connected successfully';
      client.destroy();
    } catch (discordError) {
      discordStatus = `Error: ${discordError.message}`;
    }

    res.status(200).json({
      status: 'Environment and Discord Test',
      timestamp: new Date().toISOString(),
      environment: envCheck,
      discordStatus: discordStatus,
      message: 'This will help identify the issue'
    });

  } catch (error) {
    res.status(500).json({
      status: 'Test failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}; 