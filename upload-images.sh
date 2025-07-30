#!/bin/bash

# Upload Docker Images to Docker Hub
# Replace 'your-dockerhub-username' with your actual Docker Hub username

echo "🐳 Uploading RNBRIDGE LTD Docker Images to Docker Hub..."

# Get Docker Hub username
read -p "Enter your Docker Hub username: " DOCKER_USERNAME

if [ -z "$DOCKER_USERNAME" ]; then
    echo "❌ Error: Docker Hub username is required!"
    exit 1
fi

echo "📦 Tagging images for Docker Hub..."

# Tag the images
docker tag rnbridge-website-frontend $DOCKER_USERNAME/rnbridge-frontend:latest
docker tag rnbridge-website-backend $DOCKER_USERNAME/rnbridge-backend:latest

echo "🚀 Pushing frontend image..."
docker push $DOCKER_USERNAME/rnbridge-frontend:latest

echo "🚀 Pushing backend image..."
docker push $DOCKER_USERNAME/rnbridge-backend:latest

echo "✅ Images uploaded successfully!"
echo ""
echo "📋 Your images are now available at:"
echo "   Frontend: $DOCKER_USERNAME/rnbridge-frontend:latest"
echo "   Backend: $DOCKER_USERNAME/rnbridge-backend:latest"
echo ""
echo "🌐 To deploy on DigitalOcean droplet:"
echo "   1. SSH into your droplet"
echo "   2. Run: docker pull $DOCKER_USERNAME/rnbridge-frontend:latest"
echo "   3. Run: docker pull $DOCKER_USERNAME/rnbridge-backend:latest"
echo "   4. Use the docker-compose.deploy.yml file to run the application" 