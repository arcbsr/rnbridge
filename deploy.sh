#!/bin/bash

# RNBRIDGE LTD Deployment Script for DigitalOcean
# This script builds and deploys the application to a DigitalOcean droplet

set -e

echo "🚀 RNBRIDGE LTD Deployment Script"
echo "=================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the project root directory."
    exit 1
fi

# Create data directories if they don't exist
echo "📁 Creating data directories..."
mkdir -p ./data/postgres
mkdir -p ./data/logs
mkdir -p ./data/uploads

# Set proper permissions
chmod 755 ./data/postgres
chmod 755 ./data/logs
chmod 755 ./data/uploads

# Build the Docker image
echo "🔨 Building Docker image..."
docker build -f Dockerfile.single -t rnbridge-app .

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully!"
else
    echo "❌ Docker build failed!"
    exit 1
fi

# Stop and remove existing container if it exists
echo "🧹 Cleaning up existing containers..."
docker stop rnbridge-app 2>/dev/null || true
docker rm rnbridge-app 2>/dev/null || true

# Run the container with volume mounts
echo "🚀 Starting application with data persistence..."
docker run -d \
    --name rnbridge-app \
    -p 80:80 \
    -p 5000:5000 \
    -p 5432:5432 \
    -v $(pwd)/data/postgres:/var/lib/postgresql/data \
    -v $(pwd)/data/logs:/app/logs \
    -v $(pwd)/data/uploads:/app/uploads \
    --restart unless-stopped \
    rnbridge-app

# Check if container started successfully
if [ $? -eq 0 ]; then
    echo "✅ Application started successfully!"
    echo ""
    echo "🌐 Application URLs:"
    echo "   Frontend: http://localhost"
    echo "   Backend API: http://localhost:5000"
    echo "   Database: localhost:5432"
    echo ""
    echo "📁 Data directories:"
    echo "   PostgreSQL: $(pwd)/data/postgres"
    echo "   Logs: $(pwd)/data/logs"
    echo "   Uploads: $(pwd)/data/uploads"
    echo ""
    echo "📊 Container status:"
    docker ps | grep rnbridge-app
    echo ""
    echo "📝 Logs:"
    echo "   docker logs rnbridge-app"
    echo "   docker logs -f rnbridge-app (follow logs)"
    echo ""
    echo "💾 Data persistence:"
    echo "   Your data will persist even if the container is restarted"
    echo "   Database files are stored in: $(pwd)/data/postgres"
else
    echo "❌ Failed to start application!"
    exit 1
fi 