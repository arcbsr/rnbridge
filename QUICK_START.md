# 🚀 RNBRIDGE LTD - Quick Start Guide

## 📋 **Prerequisites**

- Docker Desktop installed and running
- Git installed
- At least 4GB RAM available

## 🎯 **Quick Start**

### **Option 1: Using the Run Script (Recommended)**

```bash
# Make sure you're in the project directory
./run-project.sh
```

### **Option 2: Manual Docker Compose**

```bash
# Create data directories
mkdir -p ./data/logs ./data/uploads ./data/postgres

# Start all services
docker compose up --build -d

# Check status
docker ps
```

## 📱 **Access URLs**

Once the application is running:

- **🌐 Frontend**: http://localhost:3000
- **🔧 Backend API**: http://localhost:5000
- **🗄️ Database**: localhost:5432

## 🛠️ **Management Commands**

### **View Logs**
```bash
# All services
docker compose logs

# Specific service
docker compose logs frontend
docker compose logs backend
docker compose logs postgres
```

### **Stop Application**
```bash
docker compose down
```

### **Restart Application**
```bash
docker compose restart
```

### **Rebuild and Start**
```bash
docker compose up --build -d
```

## 📊 **Service Details**

### **Frontend (React)**
- **Port**: 3000
- **Technology**: React + TypeScript
- **Container**: rnbridge-frontend

### **Backend (Node.js)**
- **Port**: 5000
- **Technology**: Node.js + Express + TypeScript
- **Container**: rnbridge-backend

### **Database (PostgreSQL)**
- **Port**: 5432
- **Database**: rnbridge_db
- **Username**: postgres
- **Password**: postgres
- **Container**: rnbridge-postgres

## 🔧 **Troubleshooting**

### **If Frontend Won't Load**
```bash
# Check frontend logs
docker compose logs frontend

# Check if container is running
docker ps | grep frontend
```

### **If Backend Won't Connect**
```bash
# Check backend logs
docker compose logs backend

# Check database connection
docker compose logs postgres
```

### **If Database Issues**
```bash
# Check PostgreSQL logs
docker compose logs postgres

# Access PostgreSQL directly
docker exec -it rnbridge-postgres psql -U postgres -d rnbridge_db
```

### **Reset Everything**
```bash
# Stop and remove everything
docker compose down -v

# Remove all images
docker system prune -a

# Start fresh
./run-project.sh
```

## 📈 **Development**

### **View Real-time Logs**
```bash
docker compose logs -f
```

### **Access Container Shell**
```bash
# Frontend
docker exec -it rnbridge-frontend sh

# Backend
docker exec -it rnbridge-backend sh

# Database
docker exec -it rnbridge-postgres psql -U postgres
```

## 🎉 **Success!**

Your RNBRIDGE LTD application should now be running with:
- ✅ Frontend on http://localhost:3000
- ✅ Backend API on http://localhost:5000
- ✅ PostgreSQL database on localhost:5432

The application includes:
- 🌐 Modern React frontend with Material-UI
- 🔧 Node.js backend with TypeScript
- 🗄️ PostgreSQL database with data persistence
- 🐳 Docker containerization for easy deployment 