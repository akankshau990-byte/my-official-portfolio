# Akanksha Kumari — Full Stack Portfolio

A new portfolio project with a React + Vite frontend and an Express backend contact API.

## Features
- Responsive dark UI with purple/blue accents
- Animated sections and project cards (Framer Motion)
- Mobile navigation, dark visual system, smooth scrolling
- Skills, About, Projects and Contact sections
- Working email links and resume download
- Contact form with validation and backend API endpoint
- Optional MongoDB persistence for contact messages
- Clear project structure and environment variable examples

## Requirements
- Node.js 18+ and npm
- MongoDB only if you want contact messages saved to a database

## Start the frontend
Open a terminal in `frontend`:
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually `http://localhost:5173`).

## Start the backend
Open a second terminal in `backend`:
```bash
npm install
cp .env.example .env
npm run dev
```
On Windows Command Prompt, use:
```bat
copy .env.example .env
npm run dev
```
The API starts at `http://localhost:5000`.

## Optional MongoDB storage
Edit `backend/.env` and set `MONGODB_URI` to your MongoDB connection string. If it is left blank, the contact endpoint validates the request and returns a helpful message, but does not save it. The form does not pretend a message was saved when the database is unavailable.

## Resume
The included `frontend/public/resume.pdf` is a starter resume generated from the details provided so far. Please review it and replace it with your final resume PDF before applying. Keep the filename `resume.pdf` so the button continues to work.

## Update project links honestly
- Portfolio: this project itself; add its deployed URL after deployment.
- Placement Tracker: link currently points to the provided frontend repository.
- URL Shortener: no repository URL was supplied, so the project card does not invent one. Add the real repository URL in `frontend/src/App.jsx` when ready.

## Build
```bash
cd frontend
npm run build
```
The production frontend output is generated in `frontend/dist`.
