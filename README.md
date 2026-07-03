# Bobyard Comments — Frontend

React app for a comment system with admin/user roles.

**Backend repo:** https://github.com/loriscaputo17-arch/bobyard-backend
**Live app:** https://bobyard-frontend.vercel.app

## Stack
- React + Vite
- Tailwind CSS
- React Router

## Setup
```bash
cd frontend
npm install
```

Create a `.env` file with the backend URL:
VITE_URL_BASE=http://localhost:8000
VITE_SUPABASE_URL=https://liozrgbbzystazxfmyoj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxpb3pyZ2JienlzdGF6eGZteW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwOTIzMDcsImV4cCI6MjA5ODY2ODMwN30.FBRRFIy6g-J-PYxLNMIrJ75itOX6KoM01y0MvCeyWHk

Then run:
```bash
npm run dev
```
App runs at `http://localhost:5173`

> The backend must be running for the app to load comments.
> See the [backend repo](https://github.com/loriscaputo17-arch/bobyard-backend) for setup.

## Features
- List, add, edit, delete comments
- Admin / User role switcher (User is read-only)
- Images with fullscreen lightbox (pinch-to-zoom on mobile)
- Responsive layout
- Optimistic UI updates

## What I'd add with more time
- Reply threading UI
- Like button wired to a backend endpoint
- Search and filter comments
- Skeleton loaders instead of "Loading…"