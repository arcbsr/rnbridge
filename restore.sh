#!/bin/bash

# RNBRIDGE LTD Restore Script
# This script restores data from a backup file

set -e

if [ $# -eq 0 ]; then
    echo "❌ Please provide a backup file path"
    echo "Usage: ./restore.sh <backup_file.tar.gz>"
    exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Backup file not found: $BACKUP_FILE"
    exit 1
fi

echo "🔄 RNBRIDGE LTD Restore Script"
echo "==============================="
echo "📦 Restoring from: $BACKUP_FILE"

# Create temporary restore directory
RESTORE_DIR="./restore_temp_$(date +%s)"
mkdir -p "$RESTORE_DIR"

echo "📁 Extracting backup..."
tar -xzf "$BACKUP_FILE" -C "$RESTORE_DIR"

# Check if container is running
if ! docker ps | grep -q rnbridge-app; then
    echo "❌ RNBRIDGE container is not running. Starting it first..."
    ./deploy.sh
    sleep 30  # Wait for container to be ready
fi

# Stop the application
echo "⏹️  Stopping application..."
docker stop rnbridge-app

# Restore database
if [ -f "$RESTORE_DIR/database.sql" ]; then
    echo "🗄️  Restoring database..."
    docker start rnbridge-app
    sleep 10  # Wait for PostgreSQL to start
    
    # Drop and recreate database
    docker exec rnbridge-app psql -h localhost -U postgres -c "DROP DATABASE IF EXISTS rnbridge_db;"
    docker exec rnbridge-app psql -h localhost -U postgres -c "CREATE DATABASE rnbridge_db;"
    
    # Restore data
    docker exec -i rnbridge-app psql -h localhost -U postgres rnbridge_db < "$RESTORE_DIR/database.sql"
    echo "✅ Database restored successfully!"
else
    echo "⚠️  No database backup found, skipping database restore"
fi

# Restore data directories
if [ -f "$RESTORE_DIR/data.tar.gz" ]; then
    echo "📁 Restoring data directories..."
    tar -xzf "$RESTORE_DIR/data.tar.gz" -C ./
    echo "✅ Data directories restored successfully!"
else
    echo "⚠️  No data backup found, skipping data restore"
fi

# Restore configuration
if [ -f "$RESTORE_DIR/.env" ]; then
    echo "⚙️  Restoring configuration..."
    cp "$RESTORE_DIR/.env" ./backend/
    echo "✅ Configuration restored successfully!"
else
    echo "⚠️  No configuration backup found, skipping config restore"
fi

# Clean up
rm -rf "$RESTORE_DIR"

# Restart the application
echo "🚀 Restarting application..."
docker start rnbridge-app

echo "✅ Restore completed successfully!"
echo ""
echo "🌐 Application URLs:"
echo "   Frontend: http://localhost"
echo "   Backend API: http://localhost:5000"
echo "   Database: localhost:5432"
echo ""
echo "📊 Check application status:"
echo "   docker ps"
echo "   docker logs rnbridge-app" 