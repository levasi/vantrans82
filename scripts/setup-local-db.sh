#!/bin/bash

# Setup script for local database development
# This script helps set up a local PostgreSQL database for development

set -e

echo "🚀 VanTrans82 Local Database Setup"
echo "=================================="
echo ""

# Check if Docker is available
if command -v docker &> /dev/null; then
    # Check for docker compose (newer) or docker-compose (older)
    if docker compose version &> /dev/null || docker-compose version &> /dev/null; then
        echo "✅ Docker detected"
        echo ""
        echo "Option 1: Use Docker (Recommended)"
        echo "  This will start a PostgreSQL container using docker compose"
        echo ""
        read -p "Do you want to use Docker? (y/n) " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo "🐳 Starting PostgreSQL with Docker..."
            # Try newer syntax first, fall back to older
            if docker compose version &> /dev/null; then
                docker compose up -d postgres
            else
                docker-compose up -d postgres
            fi
            echo ""
            echo "✅ PostgreSQL is running!"
            echo ""
            echo "Connection string for .env file:"
            echo "DATABASE_LOCAL_URL=postgresql://vantrans82:vantrans82_dev@localhost:5432/vantrans82_local"
            echo ""
            echo "To stop the database: npm run db:stop"
            echo "To view logs: npm run db:logs"
            exit 0
        fi
    fi
fi

# Check if PostgreSQL is installed locally
if command -v psql &> /dev/null; then
    echo "✅ PostgreSQL detected"
    echo ""
    echo "Option 2: Use Local PostgreSQL"
    echo ""
    read -p "Do you want to create a local database? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Database name (default: vantrans82_local): " db_name
        db_name=${db_name:-vantrans82_local}
        
        read -p "PostgreSQL username (default: $(whoami)): " db_user
        db_user=${db_user:-$(whoami)}
        
        echo ""
        echo "Creating database: $db_name"
        
        # Try to create database
        if createdb -U "$db_user" "$db_name" 2>/dev/null; then
            echo "✅ Database '$db_name' created successfully!"
            echo ""
            echo "Connection string for .env file:"
            echo "DATABASE_LOCAL_URL=postgresql://$db_user@localhost:5432/$db_name"
            echo ""
            echo "Note: If your PostgreSQL requires a password, add it to the connection string:"
            echo "DATABASE_LOCAL_URL=postgresql://$db_user:your_password@localhost:5432/$db_name"
        else
            echo "❌ Failed to create database. You may need to:"
            echo "   1. Enter your PostgreSQL password"
            echo "   2. Run: createdb -U $db_user $db_name"
            echo "   3. Or use a different username"
        fi
        exit 0
    fi
fi

echo "❌ Neither Docker nor PostgreSQL CLI found."
echo ""
echo "Please install one of the following:"
echo "  - Docker & Docker Compose: https://docs.docker.com/get-docker/"
echo "  - PostgreSQL: https://www.postgresql.org/download/"
echo ""
echo "Or manually set up your database and add DATABASE_LOCAL_URL to .env"
