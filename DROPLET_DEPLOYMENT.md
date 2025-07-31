# 🚀 Deploy to DigitalOcean Droplet

## 📋 **Step-by-Step Deployment Guide**

### **Step 1: SSH into Your Droplet**

```bash
ssh root@64.23.154.149
```

### **Step 2: Upload the Deployment Script**

From your local machine, upload the deployment script:

```bash
scp deploy-from-git.sh root@64.23.154.149:/root/
```

### **Step 3: Make Script Executable and Run**

On the droplet:

```bash
chmod +x deploy-from-git.sh
./deploy-from-git.sh
```

## 🎯 **What the Script Does**

1. **Updates System**: Installs latest packages
2. **Installs Docker**: Sets up Docker and Docker Compose
3. **Clones Repository**: Downloads code from https://github.com/arcbsr/rnbridge.git
4. **Creates Directories**: Sets up data persistence folders
5. **Builds Containers**: Creates Docker images for all services
6. **Starts Services**: Launches PostgreSQL, Backend, and Frontend
7. **Health Checks**: Verifies all services are running

## 📱 **Access URLs**

Once deployed, your application will be available at:

- **🌐 Frontend**: http://64.23.154.149:13000
- **🔧 Backend API**: http://64.23.154.149:15000
- **🗄️ Database**: 64.23.154.149:15432

## 🛠️ **Management Commands**

### **View Logs**
```bash
docker compose -f docker-compose.local.yml logs
```

### **Stop Application**
```bash
docker compose -f docker-compose.local.yml down
```

### **Restart Application**
```bash
docker compose -f docker-compose.local.yml restart
```

### **Update from Git**
```bash
cd /root/rnbridge
git pull origin main
docker compose -f docker-compose.local.yml up --build -d
```

## 🔧 **Troubleshooting**

### **If Ports are Blocked**
```bash
# Open ports in UFW firewall
ufw allow 13000
ufw allow 15000
ufw allow 15432
ufw allow 180
```

### **If Docker is Not Running**
```bash
systemctl start docker
systemctl enable docker
```

### **If Services Won't Start**
```bash
# Check logs
docker compose -f docker-compose.local.yml logs

# Restart Docker
systemctl restart docker
```

## 📊 **Monitoring**

### **Check Container Status**
```bash
docker ps
```

### **Monitor Resource Usage**
```bash
docker stats
```

### **View Real-time Logs**
```bash
docker compose -f docker-compose.local.yml logs -f
```

## 🎉 **Success!**

Your RNBRIDGE LTD application will be running on your DigitalOcean droplet with:
- ✅ Frontend on http://64.23.154.149:13000
- ✅ Backend API on http://64.23.154.149:15000
- ✅ PostgreSQL database on 64.23.154.149:15432

---

**Need Help?** Check the logs or restart the application using the commands above. 