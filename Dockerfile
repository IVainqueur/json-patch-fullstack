FROM node:alpine

WORKDIR /app

COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY frontend/ ./frontend/

COPY backend/package*.json ./backend/
RUN cd backend && npm install

COPY backend/ ./backend/

EXPOSE 3000
EXPOSE 3001

CMD cd frontend && npm run dev -- --host & cd backend && npm start
