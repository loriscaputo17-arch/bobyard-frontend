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