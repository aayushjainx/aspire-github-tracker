#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  GitHub Release Tracker - Development Setup${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# Check if PostgreSQL is running
echo -e "${BLUE}Checking PostgreSQL...${NC}"
if ! pg_isready > /dev/null 2>&1; then
    echo -e "${RED}PostgreSQL is not running!${NC}"
    echo "Please start PostgreSQL and try again."
    exit 1
fi
echo -e "${GREEN}✓ PostgreSQL is running${NC}"
echo ""

# Check backend .env
if [ ! -f "./backend/.env" ]; then
    echo -e "${RED}Backend .env file not found!${NC}"
    echo "Please create backend/.env based on backend/.env.example"
    exit 1
fi
echo -e "${GREEN}✓ Backend .env exists${NC}"

# Check frontend .env
if [ ! -f "./frontend/.env" ]; then
    echo -e "${RED}Frontend .env file not found!${NC}"
    echo "Please create frontend/.env based on frontend/.env.example"
    exit 1
fi
echo -e "${GREEN}✓ Frontend .env exists${NC}"
echo ""

# Check if migrations have been run
echo -e "${BLUE}Would you like to run database migrations? (y/n)${NC}"
read -r run_migrations

if [ "$run_migrations" = "y" ]; then
    echo -e "${BLUE}Running migrations...${NC}"
    cd backend && npm run migrate && cd ..
    echo -e "${GREEN}✓ Migrations completed${NC}"
    echo ""
fi

# Start backend
echo -e "${BLUE}Starting backend server...${NC}"
cd backend
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"
echo -e "${GREEN}  Backend logs: tail -f backend.log${NC}"
echo ""

# Wait for backend to be ready
echo -e "${BLUE}Waiting for backend to be ready...${NC}"
sleep 3

# Start frontend
echo -e "${BLUE}Starting frontend server...${NC}"
cd frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"
echo -e "${GREEN}  Frontend logs: tail -f frontend.log${NC}"
echo ""

echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}  🎉 Application is starting!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo -e "Backend GraphQL:  ${BLUE}http://localhost:4000${NC}"
echo -e "Frontend UI:      ${BLUE}http://localhost:5173${NC}"
echo ""
echo -e "Backend PID:  $BACKEND_PID"
echo -e "Frontend PID: $FRONTEND_PID"
echo ""
echo -e "To stop the servers:"
echo -e "  kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo -e "Or save this to a file and run: ${BLUE}./stop-dev.sh${NC}"
echo "kill $BACKEND_PID $FRONTEND_PID" > stop-dev.sh
chmod +x stop-dev.sh
echo ""
