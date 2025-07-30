# Multi-stage Dockerfile for RNBRIDGE LTD Application
# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend package files
COPY package*.json ./

# Install frontend dependencies
RUN npm ci --only=production

# Copy frontend source code
COPY . .

# Build frontend
RUN npm run build

# Stage 2: Build Backend
FROM node:18-alpine AS backend-builder

WORKDIR /app/backend

# Copy backend package files
COPY backend/package*.json ./

# Install backend dependencies
RUN npm ci --only=production

# Copy backend source code
COPY backend/ .

# Build backend TypeScript
RUN npm run build

# Stage 3: Final Runtime Image
FROM node:18-alpine

# Install PostgreSQL client and other dependencies
RUN apk add --no-cache \
    postgresql-client \
    bash \
    curl \
    && rm -rf /var/cache/apk/*

# Create app directory
WORKDIR /app

# Copy built frontend from stage 1
COPY --from=frontend-builder /app/frontend/build ./frontend/build

# Copy built backend from stage 2
COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=backend-builder /app/backend/package*.json ./backend/

# Install only production dependencies for backend
WORKDIR /app/backend
RUN npm ci --only=production

# Copy environment file
COPY backend/env\ copy.example ./backend/.env

# Create startup script
RUN echo '#!/bin/bash\n\
# Start PostgreSQL service\n\
echo "Starting PostgreSQL..."\n\
pg_ctl -D /var/lib/postgresql/data -l /var/lib/postgresql/logfile start\n\
\n\
# Wait for PostgreSQL to be ready\n\
echo "Waiting for PostgreSQL to be ready..."\n\
until pg_isready -h localhost -p 5432; do\n\
  echo "PostgreSQL is not ready yet..."\n\
  sleep 2\n\
done\n\
echo "PostgreSQL is ready!"\n\
\n\
# Initialize database\n\
echo "Initializing database..."\n\
psql -h localhost -U postgres -c "CREATE DATABASE rnbridge_db;" || true\n\
\n\
# Start backend server\n\
echo "Starting backend server..."\n\
cd /app/backend\n\
npm start &\n\
\n\
# Start nginx for frontend\n\
echo "Starting nginx..."\n\
nginx -g "daemon off;" &\n\
\n\
# Wait for all background processes\n\
wait\n\
' > /app/start.sh && chmod +x /app/start.sh

# Install nginx
RUN apk add --no-cache nginx

# Configure nginx
RUN echo 'server {\n\
    listen 80;\n\
    server_name localhost;\n\
    root /app/frontend/build;\n\
    index index.html;\n\
    \n\
    # Serve static files\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
    \n\
    # Proxy API requests to backend\n\
    location /api {\n\
        proxy_pass http://localhost:5000;\n\
        proxy_http_version 1.1;\n\
        proxy_set_header Upgrade $http_upgrade;\n\
        proxy_set_header Connection "upgrade";\n\
        proxy_set_header Host $host;\n\
        proxy_set_header X-Real-IP $remote_addr;\n\
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n\
        proxy_set_header X-Forwarded-Proto $scheme;\n\
        proxy_cache_bypass $http_upgrade;\n\
    }\n\
    \n\
    # Health check endpoint\n\
    location /health {\n\
        return 200 "OK";\n\
        add_header Content-Type text/plain;\n\
    }\n\
}' > /etc/nginx/http.d/default.conf

# Create PostgreSQL data directory
RUN mkdir -p /var/lib/postgresql/data

# Initialize PostgreSQL database
RUN initdb -D /var/lib/postgresql/data

# Configure PostgreSQL
RUN echo "host all all 0.0.0.0/0 md5" >> /var/lib/postgresql/data/pg_hba.conf
RUN echo "listen_addresses = '*'" >> /var/lib/postgresql/data/postgresql.conf

# Expose ports
EXPOSE 80 5432

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000
ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_NAME=rnbridge_db
ENV DB_USER=postgres
ENV DB_PASSWORD=postgres
ENV CORS_ORIGIN=http://localhost

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

# Start the application
CMD ["/app/start.sh"] 