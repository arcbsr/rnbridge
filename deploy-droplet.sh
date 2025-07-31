#!/bin/bash

# RNBRIDGE LTD - Simple DigitalOcean Deployment
# This script will deploy the application to your droplet

echo "🚀 Deploying RNBRIDGE LTD to DigitalOcean Droplet..."

# Update system
echo "📦 Updating system packages..."
apt update -y && apt upgrade -y

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    systemctl enable docker
    systemctl start docker
fi

# Install Docker Compose if not installed
if ! command -v docker compose &> /dev/null; then
    echo "📦 Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Navigate to project directory
echo "📁 Setting up project directory..."
cd /root
rm -rf rnbridge
mkdir -p rnbridge
cd rnbridge

# Clone the repository
echo "📥 Cloning repository from Git..."
git clone https://github.com/arcbsr/rnbridge.git .

# Create necessary directories
echo "📁 Creating data directories..."
mkdir -p ./data/logs
mkdir -p ./data/uploads
mkdir -p ./data/postgres
chmod 755 ./data/logs ./data/uploads

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker compose down 2>/dev/null || true

# Build and start the application
echo "🔨 Building and starting services..."
docker compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 60

# Check service status
echo "📊 Checking service status..."
docker ps

# Test the application
echo "🧪 Testing application..."
if curl -f http://localhost:80 >/dev/null 2>&1; then
    echo "✅ Frontend is running at: http://164.92.102.194"
else
    echo "❌ Frontend health check failed"
fi

if curl -f http://localhost:5000/api/health >/dev/null 2>&1; then
    echo "✅ Backend is running at: http://164.92.102.194:5000"
else
    echo "❌ Backend health check failed"
fi

echo ""
echo "🎉 Deployment completed!"
echo "📱 Your application is now running at:"
echo "   Frontend: http://164.92.102.194"
echo "   Backend API: http://164.92.102.194:5000"
echo "   Database: localhost:5432"
echo ""
echo "📋 Useful commands:"
echo "   View logs: docker compose logs"
echo "   Stop app: docker compose down"
echo "   Restart: docker compose restart"
echo "   Update from Git: git pull origin main && docker compose up --build -d" 