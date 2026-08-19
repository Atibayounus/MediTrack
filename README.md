# MediTrack — Clinic Appointment Portal (Student Starter)

Week 7 · Session 14 · Authentication End to End — practical assignment starter code.

Stack: MongoDB · Express · React · Redux Toolkit · Vite

---

## What is already done for you

- Full folder structure for both `server/` and `client/`
- Routing, styling, forms and table layouts
- `RegisterForm.jsx` and the `registerUser` thunk, as a worked example to copy from
- `fetchAppointments` thunk and its three reducer cases

## What you must write

Every place you need to type is marked with a comment like:

```js
// TODO (Task 4.1): ...
```

Search the whole project for `TODO (Task` in VS Code (Ctrl+Shift+F) to list them all.
The assignment document explains each task in detail.

---

## Setup

### 1. Backend

```bash
cd server
npm install
cp .env.example .env        # Windows: copy .env.example .env
# open .env and fill in MONGO_URI and a long random JWT_SECRET
npm run dev
```

The API runs on http://localhost:5000 — check http://localhost:5000/api/health

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

The app runs on http://localhost:5173

> Restart the backend after every `.env` edit — `JWT_SECRET` is read at boot.

---

## Creating a staff account

Register normally, then in MongoDB Atlas (or Compass) open the `users`
collection and change that document's `role` from `"patient"` to `"staff"`.
Nobody can register themselves as staff — that is deliberate.

---

## Route map

| Method | Route | Access |
|---|---|---|
| POST | `/api/auth/register` | public |
| POST | `/api/auth/login` | public |
| GET | `/api/auth/me` | logged in |
| POST | `/api/auth/logout` | public |
| GET/POST | `/api/appointments` | logged in, own data only |
| PUT/DELETE | `/api/appointments/:id` | owner only |
| GET | `/api/staff/appointments` | staff only |
| PATCH | `/api/staff/appointments/:id/status` | staff only |

---

## Submitting

Push the code to a GitHub repo. Send the repo link. That is the whole submission.

```bash
git init
git add .
git status            # check: no node_modules, no .env
git commit -m "MediTrack auth assignment"
git branch -M main
git remote add origin https://github.com/<you>/meditrack.git
git push -u origin main
```

Your repo must have:

- The full `server/` and `client/` folders
- `.env.example`, but **not** `.env`
- `.gitignore` with `node_modules` and `.env` in it
- `README.md` saying how to run it, and which Part 9 extras you did
- `REFLECTION.md` with your six answers

Do not upload a zip. Never commit `.env`.
