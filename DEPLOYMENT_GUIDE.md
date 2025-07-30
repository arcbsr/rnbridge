# 🚀 RNBRIDGE LTD - DigitalOcean Deployment Guide

## ✅ **Images Successfully Uploaded to Docker Hub**

Your Docker images are now available at:
- **Frontend**: `bsrsoftbd/rnbridge-frontend:latest`
- **Backend**: `bsrsoftbd/rnbridge-backend:latest`

## 📋 **Deployment Steps**

### **Step 1: Upload Files to Your Droplet**

```bash
# Upload the deployment files to your droplet
scp -r rnbridge-website/ root@YOUR_DROPLET_IP:/root/
```

### **Step 2: SSH into Your Droplet**

```bash
ssh root@YOUR_DROPLET_IP
```

### **Step 3: Navigate to Project Directory**

```bash
cd /root/rnbridge-website
```

### **Step 4: Make Deployment Script Executable**

```bash
chmod +x deploy-to-droplet.sh
```

### **Step 5: Run the Deployment**

```bash
./deploy-to-droplet.sh
```

## 🎯 **What the Deployment Does**

1. **Pulls Images**: Downloads your latest images from Docker Hub
2. **Creates Directories**: Sets up data persistence folders
3. **Starts Services**: Launches PostgreSQL, Backend, and Frontend
4. **Health Checks**: Verifies all services are running
5. **Port Mapping**: 
   - Frontend: `http://YOUR_DROPLET_IP:80`
   - Backend: `http://YOUR_DROPLET_IP:5000`
   - Database: `YOUR_DROPLET_IP:5432`

## 🔧 **Management Commands**

### **View Logs**
```bash
docker compose -f docker-compose.deploy.yml logs
```

### **Stop Application**
```bash
docker compose -f docker-compose.deploy.yml down
```

### **Restart Application**
```bash
docker compose -f docker-compose.deploy.yml restart
```

### **Update Application**
```bash
# Pull latest images and restart
docker pull bsrsoftbd/rnbridge-frontend:latest
docker pull bsrsoftbd/rnbridge-backend:latest
docker compose -f docker-compose.deploy.yml up -d
```

## 📊 **Monitoring**

### **Check Container Status**
```bash
docker ps
```

### **Check Resource Usage**
```bash
docker stats
```

### **View Application Logs**
```bash
# All services
docker compose -f docker-compose.deploy.yml logs

# Specific service
docker compose -f docker-compose.deploy.yml logs frontend
docker compose -f docker-compose.deploy.yml logs backend
docker compose -f docker-compose.deploy.yml logs postgres
```

## 🔒 **Security Considerations**

1. **Change Default Passwords**: Update PostgreSQL password in production
2. **Firewall**: Configure UFW to only allow necessary ports
3. **SSL**: Set up SSL certificates for HTTPS
4. **Backup**: Regular database backups

## 🚨 **Troubleshooting**

### **If Frontend Won't Load**
```bash
# Check frontend logs
docker compose -f docker-compose.deploy.yml logs frontend

# Check if port 80 is open
sudo ufw status
```

### **If Backend Won't Connect**
```bash
# Check backend logs
docker compose -f docker-compose.deploy.yml logs backend

# Check database connection
docker compose -f docker-compose.deploy.yml logs postgres
```

### **If Database Issues**
```bash
# Check PostgreSQL logs
docker compose -f docker-compose.deploy.yml logs postgres

# Access PostgreSQL directly
docker exec -it rnbridge-postgres psql -U postgres -d rnbridge_db
```

## 📈 **Scaling Options**

### **Horizontal Scaling**
```bash
# Scale backend to multiple instances
docker compose -f docker-compose.deploy.yml up -d --scale backend=3
```

### **Load Balancer**
- Set up Nginx as a reverse proxy
- Configure load balancing between multiple backend instances

## 💾 **Backup & Restore**

### **Backup Database**
```bash
docker exec rnbridge-postgres pg_dump -U postgres rnbridge_db > backup.sql
```

### **Restore Database**
```bash
docker exec -i rnbridge-postgres psql -U postgres rnbridge_db < backup.sql
```

## 🎉 **Success!**

Your RNBRIDGE LTD application is now deployed and running on DigitalOcean!

**Access URLs:**
- 🌐 **Frontend**: `http://YOUR_DROPLET_IP`
- 🔧 **Backend API**: `http://YOUR_DROPLET_IP:5000`
- 🗄️ **Database**: `YOUR_DROPLET_IP:5432`

---

**Need Help?** Check the logs or restart the application using the commands above. 