# 🐳 RNBRIDGE LTD Docker Deployment Guide

This guide will help you deploy the RNBRIDGE LTD application to a DigitalOcean droplet using Docker.

## 📋 Prerequisites

- DigitalOcean account
- A droplet with Ubuntu 20.04+ or CentOS 7+
- SSH access to your droplet
- Docker installed on the droplet

## 💾 Data Persistence

The application uses Docker volumes to ensure data persistence:

- **PostgreSQL Data**: `/var/lib/postgresql/data` → `./data/postgres`
- **Application Logs**: `/app/logs` → `./data/logs`
- **File Uploads**: `/app/uploads` → `./data/uploads`

This ensures your data survives container restarts and updates.

## 🚀 Quick Deployment (Single Image)

### Option 1: Using the Deployment Script

1. **Upload your project to the droplet:**
   ```bash
   # From your local machine
   scp -r rnbridge-website/ root@your-droplet-ip:/root/
   ```

2. **SSH into your droplet:**
   ```bash
   ssh root@your-droplet-ip
   ```

3. **Navigate to the project directory:**
   ```bash
   cd /root/rnbridge-website
   ```

4. **Run the deployment script:**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

The script will automatically:
- Create data directories for persistence
- Build the Docker image
- Start the container with volume mounts
- Display access URLs and data locations

### Option 2: Manual Docker Commands

1. **Create data directories:**
   ```bash
   mkdir -p ./data/postgres
   mkdir -p ./data/logs
   mkdir -p ./data/uploads
   chmod 755 ./data/postgres ./data/logs ./data/uploads
   ```

2. **Build the Docker image:**
   ```bash
   docker build -f Dockerfile.single -t rnbridge-app .
   ```

3. **Run the container with volumes:**
   ```bash
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
   ```

## 🏗️ Multi-Service Deployment (Docker Compose)

For more control and scalability, use Docker Compose:

1. **Deploy with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

2. **View logs:**
   ```bash
   docker-compose logs -f
   ```

3. **Stop services:**
   ```bash
   docker-compose down
   ```

## 🌐 Accessing Your Application

After deployment, your application will be available at:

- **Frontend:** `http://your-droplet-ip`
- **Backend API:** `http://your-droplet-ip:5000`
- **Database:** `your-droplet-ip:5432`

## 📁 Data Management

### Data Directory Structure

```
./data/
├── postgres/     # PostgreSQL database files
├── logs/         # Application logs
└── uploads/      # File uploads
```

### Backup and Restore

1. **Create a backup:**
   ```bash
   ./backup.sh
   ```

2. **Restore from backup:**
   ```bash
   ./restore.sh ./backups/20241201_143022.tar.gz
   ```

### Manual Database Backup

```bash
# Backup database
docker exec rnbridge-app pg_dump -h localhost -U postgres rnbridge_db > backup.sql

# Restore database
docker exec -i rnbridge-app psql -h localhost -U postgres rnbridge_db < backup.sql
```

## 🔧 Configuration

### Environment Variables

The application uses the following environment variables:

```bash
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=rnbridge_db
DB_USER=postgres
DB_PASSWORD=postgres

# CORS Configuration
CORS_ORIGIN=http://your-domain.com
```

### Customizing Configuration

1. **Edit environment variables:**
   ```bash
   # Copy the example file
   cp backend/env\ copy.example backend/.env
   
   # Edit the configuration
   nano backend/.env
   ```

2. **Rebuild the Docker image:**
   ```bash
   docker build -f Dockerfile.single -t rnbridge-app .
   ```

## 📊 Monitoring and Logs

### View Application Logs

```bash
# Single container logs
docker logs rnbridge-app

# Follow logs in real-time
docker logs -f rnbridge-app

# Docker Compose logs
docker-compose logs -f

# View log files directly
tail -f ./data/logs/app.log
```

### Health Checks

The application includes health check endpoints:

- **Frontend:** `http://your-droplet-ip/health`
- **Backend:** `http://your-droplet-ip:5000/api/health`

### Container Status

```bash
# Check container status
docker ps

# Check container health
docker inspect rnbridge-app | grep Health -A 10

# Check data volumes
docker volume ls
```

## 🔄 Updating the Application

### Method 1: Rebuild and Deploy

1. **Stop the current container:**
   ```bash
   docker stop rnbridge-app
   docker rm rnbridge-app
   ```

2. **Rebuild the image:**
   ```bash
   docker build -f Dockerfile.single -t rnbridge-app .
   ```

3. **Start the new container with volumes:**
   ```bash
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
   ```

### Method 2: Using Docker Compose

```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

## 🛠️ Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Check what's using the port
   sudo netstat -tulpn | grep :80
   
   # Stop the conflicting service
   sudo systemctl stop nginx  # if nginx is running
   ```

2. **Database connection issues:**
   ```bash
   # Check if PostgreSQL is running
   docker exec rnbridge-app pg_isready -h localhost -p 5432
   
   # Check database logs
   docker logs rnbridge-app | grep -i postgres
   ```

3. **Data persistence issues:**
   ```bash
   # Check volume mounts
   docker inspect rnbridge-app | grep -A 10 Mounts
   
   # Check data directory permissions
   ls -la ./data/
   ```

4. **Application not starting:**
   ```bash
   # Check container logs
   docker logs rnbridge-app
   
   # Check container status
   docker ps -a
   ```

### Debugging Commands

```bash
# Enter the container
docker exec -it rnbridge-app /bin/bash

# Check processes inside container
docker exec rnbridge-app ps aux

# Check nginx configuration
docker exec rnbridge-app nginx -t

# Check PostgreSQL status
docker exec rnbridge-app pg_ctl status -D /var/lib/postgresql/data

# Check data directories
docker exec rnbridge-app ls -la /var/lib/postgresql/data
docker exec rnbridge-app ls -la /app/logs
docker exec rnbridge-app ls -la /app/uploads
```

## 🔒 Security Considerations

1. **Change default passwords:**
   - Update PostgreSQL password in environment variables
   - Use strong passwords for production

2. **Firewall configuration:**
   ```bash
   # Allow only necessary ports
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw allow 22/tcp
   sudo ufw enable
   ```

3. **SSL/HTTPS:**
   - Set up SSL certificates for production
   - Configure nginx for HTTPS

4. **Data security:**
   - Regularly backup your data
   - Encrypt sensitive data
   - Restrict access to data directories

## 📈 Scaling

### Horizontal Scaling

For high traffic, consider:

1. **Load Balancer:** Use DigitalOcean Load Balancer
2. **Multiple Instances:** Deploy multiple containers
3. **Database Scaling:** Use managed PostgreSQL service

### Vertical Scaling

1. **Increase Resources:** Upgrade your droplet
2. **Optimize Images:** Use multi-stage builds
3. **Caching:** Implement Redis for caching

## 💾 Backup Strategy

### Automated Backups

1. **Set up cron job for daily backups:**
   ```bash
   # Add to crontab
   0 2 * * * cd /root/rnbridge-website && ./backup.sh
   ```

2. **Backup to external storage:**
   ```bash
   # Copy backups to external storage
   scp ./backups/*.tar.gz user@backup-server:/backups/
   ```

### Backup Verification

```bash
# Test backup restoration
docker stop rnbridge-app
./restore.sh ./backups/latest.tar.gz
docker start rnbridge-app
```

## 📞 Support

If you encounter issues:

1. Check the logs: `docker logs rnbridge-app`
2. Verify configuration: `docker exec rnbridge-app cat /app/backend/.env`
3. Test connectivity: `curl http://localhost/health`
4. Check data persistence: `ls -la ./data/`

## 🎯 Next Steps

1. **Domain Setup:** Configure your domain to point to the droplet
2. **SSL Certificate:** Install Let's Encrypt for HTTPS
3. **Monitoring:** Set up monitoring and alerting
4. **Backup:** Configure automated backups for the database
5. **CI/CD:** Set up automated deployment pipeline
6. **Data Migration:** Plan for data migration strategies

---

**Happy Deploying! 🚀** 