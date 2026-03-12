# fintrack-backend

REST API for FinTrack — a personal finance tracker. Handles auth, transactions, and budgets.

Built with Node.js, Express, MongoDB, and JWT.

## Setup

Clone the repo and install dependencies:

\```bash
git clone https://github.com/YOUR_USERNAME/fintrack-backend.git
cd fintrack-backend
npm install
\```

Create a `.env` file in the root:

\```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
\```

Start the dev server:

\```bash
npm run dev
\```

## Endpoints

All routes are prefixed with `/api`. Protected routes require an `Authorization: Bearer <token>` header.

**Auth**
- `POST /auth/register` — create account
- `POST /auth/login` — login, returns JWT token
- `GET /auth/me` — get logged in user

**Transactions**
- `GET /transactions` — get all (add `?month=2026-03` to filter)
- `POST /transactions` — add new
- `PUT /transactions/:id` — edit
- `DELETE /transactions/:id` — delete

**Budgets**
- `GET /budgets` — get all (add `?month=2026-03` to filter)
- `POST /budgets` — set or update
- `PUT /budgets/:id` — edit
- `DELETE /budgets/:id` — delete

## Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT + bcryptjs
- Deployed on Railway

## Livelink

fintrack26.vercel.app