module.exports = async (req, res) => {
  res.status(200).json({ 
    status: 'Bot is alive! 🔥',
    timestamp: new Date().toISOString(),
    message: 'Discord Roast Bot is running and ready to roast!'
  });
}; 