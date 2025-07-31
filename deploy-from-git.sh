#!/bin/bash

# RNBRIDGE LTD - Deploy from Git to DigitalOcean Droplet
# This script should be run on your DigitalOcean droplet

echo "🚀 Deploying RNBRIDGE LTD Application from Git to DigitalOcean..."

# Update system
echo "📦 Updating system packages..."
apt update -y
apt upgrade -y

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
    ln -sf /usr/local/bin/docker-compose /usr/local/bin/docker-compose
fi

# Create project directory
echo "📁 Creating project directory..."
mkdir -p /root/rnbridge
cd /root/rnbridge

# Clone the repository
echo "📥 Cloning repository from Git..."
if [ -d ".git" ]; then
    echo "🔄 Repository already exists, pulling latest changes..."
    git pull origin main
else
    echo "📥 Cloning fresh repository..."
    git clone https://github.com/arcbsr/rnbridge.git .
fi

# Create necessary directories
echo "📁 Creating data directories..."
mkdir -p ./data/logs
mkdir -p ./data/uploads
mkdir -p ./data/postgres
chmod 755 ./data/logs ./data/uploads

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker compose -f docker-compose.local.yml down 2>/dev/null || true
docker compose -f docker-compose.yml down 2>/dev/null || true

# Build and start the application
echo "🔨 Building and starting services..."
docker compose -f docker-compose.local.yml up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 60

# Check service status
echo "📊 Checking service status..."
docker ps

# Test the application
echo "🧪 Testing application..."
if curl -f http://localhost:13000 >/dev/null 2>&1; then
    echo "✅ Frontend is running at: http://164.92.102.194:13000"
else
    echo "❌ Frontend health check failed"
fi

if curl -f http://localhost:15000/api/health >/dev/null 2>&1; then
    echo "✅ Backend is running at: http://164.92.102.194:15000"
else
    echo "❌ Backend health check failed"
fi

echo ""
echo "🎉 Deployment completed!"
echo "📱 Your application is now running at:"
echo "   Frontend: http://164.92.102.194:13000"
echo "   Backend API: http://164.92.102.194:15000"
echo "   Database: 164.92.102.194:15432"
echo ""
echo "📋 Useful commands:"
echo "   View logs: docker compose -f docker-compose.local.yml logs"
echo "   Stop app: docker compose -f docker-compose.local.yml down"
echo "   Restart: docker compose -f docker-compose.local.yml restart"
echo "   Update from Git: git pull origin main && docker compose -f docker-compose.local.yml up --build -d" 