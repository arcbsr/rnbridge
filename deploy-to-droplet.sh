#!/bin/bash

# Deploy RNBRIDGE LTD Application to DigitalOcean Droplet
# This script should be run on your DigitalOcean droplet

echo "🚀 Deploying RNBRIDGE LTD Application to DigitalOcean..."

# Create necessary directories
echo "📁 Creating data directories..."
mkdir -p ./data/logs
mkdir -p ./data/uploads
chmod 755 ./data/logs ./data/uploads

# Pull the latest images from Docker Hub
echo "📦 Pulling latest images from Docker Hub..."
docker pull bsrsoftbd/rnbridge-frontend:latest
docker pull bsrsoftbd/rnbridge-backend:latest

# Stop and remove existing containers
echo "🛑 Stopping existing containers..."
docker compose -f docker-compose.deploy.yml down

# Start the application
echo "🚀 Starting application..."
docker compose -f docker-compose.deploy.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check service status
echo "📊 Checking service status..."
docker ps

# Test the application
echo "🧪 Testing application..."
if curl -f http://localhost/health >/dev/null 2>&1; then
    echo "✅ Frontend is running at: http://localhost"
else
    echo "❌ Frontend health check failed"
fi

if curl -f http://localhost:5000/api/health >/dev/null 2>&1; then
    echo "✅ Backend is running at: http://localhost:5000"
else
    echo "❌ Backend health check failed"
fi

echo ""
echo "🎉 Deployment completed!"
echo "📱 Your application is now running at:"
echo "   Frontend: http://localhost"
echo "   Backend API: http://localhost:5000"
echo "   Database: localhost:5432"
echo ""
echo "📋 Useful commands:"
echo "   View logs: docker compose -f docker-compose.deploy.yml logs"
echo "   Stop app: docker compose -f docker-compose.deploy.yml down"
echo "   Restart: docker compose -f docker-compose.deploy.yml restart" 