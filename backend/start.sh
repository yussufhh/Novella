#!/bin/bash

# Novella Backend Startup Script

echo "🚀 Starting Novella Backend Server..."
echo ""

# Navigate to backend directory
cd "$(dirname "$0")"

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found!"
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "📦 Activating virtual environment..."
source venv/bin/activate

# Install/update dependencies
if [ ! -f "venv/.installed" ]; then
    echo "📥 Installing dependencies..."
    pip install -r requirements.txt
    touch venv/.installed
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found, creating from template..."
    cp .env.example .env
    echo "⚙️  Please update the .env file with your secret keys!"
fi

echo ""
echo "✅ Server starting on http://127.0.0.1:5000"
echo "📝 Press CTRL+C to stop the server"
echo ""

# Start Flask application
python app.py
