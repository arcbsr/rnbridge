#!/bin/bash

# RNBRIDGE LTD Backup Script
# This script creates backups of the database and application data

set -e

echo "💾 RNBRIDGE LTD Backup Script"
echo "=============================="

# Create backup directory
BACKUP_DIR="./backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "📁 Creating backup in: $BACKUP_DIR"

# Check if container is running
if ! docker ps | grep -q rnbridge-app; then
    echo "❌ RNBRIDGE container is not running. Starting it first..."
    ./deploy.sh
    sleep 30  # Wait for container to be ready
fi

# Backup PostgreSQL database
echo "🗄️  Backing up PostgreSQL database..."
docker exec rnbridge-app pg_dump -h localhost -U postgres rnbridge_db > "$BACKUP_DIR/database.sql"

# Backup data directories
echo "📁 Backing up data directories..."
if [ -d "./data" ]; then
    tar -czf "$BACKUP_DIR/data.tar.gz" ./data/
fi

# Backup environment configuration
echo "⚙️  Backing up configuration..."
if [ -f "./backend/.env" ]; then
    cp ./backend/.env "$BACKUP_DIR/"
fi

# Create backup info file
echo "📝 Creating backup info..."
cat > "$BACKUP_DIR/backup_info.txt" << EOF
Backup Date: $(date)
Application: RNBRIDGE LTD
Database: rnbridge_db
Backup Type: Full Backup
Files:
- database.sql: PostgreSQL database dump
- data.tar.gz: Application data directories
- .env: Environment configuration (if exists)

To restore:
1. Stop the application: docker stop rnbridge-app
2. Restore database: docker exec -i rnbridge-app psql -h localhost -U postgres rnbridge_db < database.sql
3. Restore data: tar -xzf data.tar.gz
4. Restart application: ./deploy.sh
EOF

# Create compressed backup
echo "🗜️  Creating compressed backup..."
tar -czf "$BACKUP_DIR.tar.gz" -C "$BACKUP_DIR" .

# Clean up temporary directory
rm -rf "$BACKUP_DIR"

echo "✅ Backup completed successfully!"
echo "📦 Backup file: $BACKUP_DIR.tar.gz"
echo ""
echo "📊 Backup contents:"
echo "   - Database dump (database.sql)"
echo "   - Application data (data.tar.gz)"
echo "   - Configuration files"
echo "   - Backup information (backup_info.txt)"
echo ""
echo "🔄 To restore from this backup:"
echo "   ./restore.sh $BACKUP_DIR.tar.gz" 