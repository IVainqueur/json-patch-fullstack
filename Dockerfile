# Use the official Node.js image
FROM node:slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for frontend and install dependencies
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copy the entire frontend project to the working directory
COPY frontend/ ./frontend/

# Copy package.json and package-lock.json for backend and install dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy the entire backend project to the working directory
COPY backend/ ./backend/

# Expose ports for frontend and backend
EXPOSE 3000
EXPOSE 3001

# Command to start both frontend and backend (modify as needed)
CMD cd frontend && npm run dev -- --host & cd backend && npm start
