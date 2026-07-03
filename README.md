# Bobyard Comments

Comment system with admin/user roles, built with FastAPI + React.

## Stack
- **Backend**: FastAPI, SQLAlchemy, SQLite
- **Frontend**: React, Vite, Tailwind CSS

## Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App running at `http://localhost:5173`

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/comments` | List all comments |
| POST | `/comments` | Add a comment (Admin) |
| PATCH | `/comments/{id}` | Edit comment text |
| DELETE | `/comments/{id}` | Delete a comment |

## Features
- List, add, edit, delete comments
- Admin / User role switcher
- Images with fullscreen lightbox
- Responsive layout with mobile drawer
- Optimistic UI updates

## What I'd add with more time
- Reply threading (`parent_id` on Comment model)
- Like/unlike toggle endpoint
- Real authentication (JWT)
- Migrate to PostgreSQL