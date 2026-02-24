#!/bin/bash

# E-Commerce Platform - Quick Setup Script
# This script sets up the entire project structure

echo "🚀 Setting up E-Commerce Platform..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Backend Setup
echo -e "${BLUE}📦 Setting up Backend...${NC}"
cd backend

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ Created backend .env file${NC}"
else
    echo -e "${GREEN}✓ Backend .env already exists${NC}"
fi

# Install backend dependencies
echo "Installing backend dependencies..."
npm install

# Frontend Setup
echo -e "${BLUE}📦 Setting up Frontend...${NC}"
cd ../frontend

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ Created frontend .env file${NC}"
else
    echo -e "${GREEN}✓ Frontend .env already exists${NC}"
fi

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

cd ..

echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Configure your .env files:"
echo "   - backend/.env (MongoDB, Stripe, Cloudinary)"
echo "   - frontend/.env (Stripe public key)"
echo ""
echo "2. Start MongoDB:"
echo "   brew services start mongodb-community  # macOS"
echo "   sudo systemctl start mongod            # Linux"
echo ""
echo "3. Seed the database:"
echo "   cd backend && npm run seed"
echo ""
echo "4. Start the servers:"
echo "   Terminal 1: cd backend && npm run dev"
echo "   Terminal 2: cd frontend && npm run dev"
echo ""
echo "5. Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "🔑 Default Admin Credentials:"
echo "   Email: admin@ecommerce.com"
echo "   Password: Admin@123456"
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}"
