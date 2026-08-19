# 🏥 MediTrack

MediTrack is a web application designed to help manage medication tracking, patient/doctor workflows, and access control with secure authentication and role-based routes.

---

## 🚀 Features & Project Progress

### Completed Features
- **Global 401 Interceptor:** Captures unauthorized requests in `client/src/api/axios.js` via `setUnauthorisedHandler` and re-rejects promises cleanly.
- **User Authentication:** Registration, login, and cookie-based session management.
- **Role-Based Access Control (RBAC):** Protected routes and staff roles configured across client and server.
- **Resource Ownership:** Filters data dynamically based on user ownership.

### Part 9 Security & Optimizations (In Progress)
- [x] **Task 7.4:** Global 401 interceptor in `axios.js`
- [ ] **Task 9.1:** HTTP Header security via `helmet`
- [ ] **Task 9.2:** Rate limiting on `/api/auth`
- [ ] **Task 9.3:** NoSQL injection protection using `express-mongo-sanitize`
- [ ] **Task 9.4:** Production cookie settings (`sameSite: "none"`, `trust proxy`)
- [ ] **Tasks 8.2 / 8.3:** Forgot & reset password workflows (Endpoints currently return `501 Not Implemented`)

---

## 🛠️ Tech Stack

- **Frontend:** React, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Cookie Sessions / JWT

---

## 📦 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB running locally or a cloud URI

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Atibayounus/MediTrack.git](https://github.com/Atibayounus/MediTrack.git)
   cd MediTrack
Install Server Dependencies:

Bash
npm install
Install Client Dependencies:

Bash
cd client
npm install
cd ..
Environment Variables:
Create a .env file in the root folder with:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
NODE_ENV=development
Run the Application:

Bash
# Run server & client concurrently (or start them separately)
npm run dev