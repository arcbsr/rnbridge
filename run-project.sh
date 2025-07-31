#!/bin/bash

# RNBRIDGE LTD - Project Runner
# This script will start the entire application using Docker Compose

echo "🚀 Starting RNBRIDGE LTD Application..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

# Create necessary directories
echo "📁 Creating data directories..."
mkdir -p ./data/logs
mkdir -p ./data/uploads
mkdir -p ./data/postgres

# Set proper permissions
chmod 755 ./data/logs ./data/uploads

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker compose down

# Build and start the application
echo "🔨 Building and starting services..."
docker compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check service status
echo "📊 Checking service status..."
docker ps

# Test the application
echo "🧪 Testing application..."
echo ""
echo "🎉 Application is starting up!"
echo ""
echo "📱 Access URLs:"
echo "   🌐 Frontend: http://localhost:3000"
echo "   🔧 Backend API: http://localhost:5000"
echo "   🗄️ Database: localhost:5432"
echo ""
echo "📋 Useful commands:"
echo "   View logs: docker compose logs"
echo "   Stop app: docker compose down"
echo "   Restart: docker compose restart"
echo "   Frontend logs: docker compose logs frontend"
echo "   Backend logs: docker compose logs backend"
echo "   Database logs: docker compose logs postgres"
echo ""
echo "⏳ Services are starting up. Please wait a few minutes for everything to be ready." 