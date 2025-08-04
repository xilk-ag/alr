#!/bin/bash

echo "🔥 Starting Discord Roast Bot with auto-restart..."

# Function to start the bot
start_bot() {
    echo "🚀 Starting bot..."
    node monitor.js
}

# Keep restarting if the process dies
while true; do
    start_bot
    echo "❌ Bot stopped, restarting in 10 seconds..."
    sleep 10
done 