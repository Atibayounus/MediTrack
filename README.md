

![MediTrack Banner](https://capsule-render.vercel.app/api?type=waving\&color=0:0052D4,50:4364F7,100:6FB1FC\&height=180\&section=header\&text=🏥MediTrack\&fontSize=60\&fontColor=ffffff\&animation=fadeIn\&fontAlignY=38)

### Full-Stack Healthcare Management System

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge\&logo=express\&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)](https://www.mongodb.com/)

</div>

---

## 📖 About

MediTrack is a MERN based healthcare management system for handling **authentication, patients, staff, and appointments** with role-based access control.

## ✨ Features

* 🔐 User Registration & Login
* 👥 Role-Based Access Control
* 📅 Appointment Booking & Tracking
* 🏥 Patient & Staff Management
* 🍪 Cookie/Session Authentication
* 🔒 Protected API Routes
* 📊 User Data Isolation

## 📸 Application Screenshots

<div align="center">

### 1. Overview & Dashboard

<img src="screenshots/shot1.png" alt="MediTrack Dashboard" width="750">

---

### 2. Create Account

<img src="screenshots/shot2.png" alt="MediTrack Create Account" width="750">

---

### 3. Patient & Staff Management

<img src="screenshots/shot3.png" alt="MediTrack Management" width="750">

---

### 4. Appointment Booking & Tracking

<img src="screenshots/shot4.png" alt="MediTrack Appointment Booking" width="750">

</div>

---

### 🔌 API Testing — Postman

<div align="center">

<img src="screenshots/postman1.png" width="400">
&nbsp;&nbsp;
<img src="screenshots/postman2.png" width="400">

<br><br>

<img src="screenshots/postman3.png" width="400">
&nbsp;&nbsp;
<img src="screenshots/postman4.png" width="400">

</div>
---

## Request Lifecycle

### Login flow

```mermaid
sequenceDiagram
    participant U as Browser (React)
    participant S as Express Server
    participant DB as MongoDB

    U->>S: POST /auth/login (email, password)
    S->>DB: find user + compare password
    DB-->>S: user found, password ok
    S->>S: sign JWT (id, role)
    S-->>U: 200 + Set-Cookie: token (HttpOnly)

    Note over U: Page refresh happens
    U->>S: GET /auth/me (cookie sent automatically)
    S->>S: verify JWT from cookie
    S-->>U: 200 + user (session restored)

    U->>S: POST /auth/logout
    S-->>U: clearCookie("token")
    Note over U: Redux resets, redirected to /login
```

### Every protected request

```mermaid
flowchart TD
    A[Request hits server] --> B{Cookie has token?}
    B -- No --> C[401 Not authorised]
    B -- Yes --> D{jwt.verify valid?}
    D -- No / expired --> C
    D -- Yes --> E[req.user set]
    E --> F{Route needs a role?}
    F -- No --> H[Run route handler]
    F -- Yes --> G{req.user.role allowed?}
    G -- No --> I[403 Forbidden]
    G -- Yes --> H
    H --> J{Route is owner-scoped?}
    J -- No, staff route --> K[Return all matching data]
    J -- Yes --> L{owner == req.user.id?}
    L -- No --> M[404 Not Found]
    L -- Yes --> N[Return / modify the record]
```


## 🛠️ Tech Stack

**Frontend:** React, Axios
**Backend:** Node.js, Express.js
**Database:** MongoDB, Mongoose
**Authentication:** Express Session, Cookies

## 🚀 Run Locally

```bash
git clone https://github.com/Atibayounus/MediTrack.git
cd MediTrack

# Backend
cd server
npm install
npm start

# Frontend
cd ../client
npm install
npm run dev
```

Create a `.env` file in `server` with your MongoDB URI and session secret.

---

## 👨‍💻 Author

**Atiba Younus** — Computer Science Student & Full-Stack Developer

[GitHub](https://github.com/Atibayounus)

---

<div align="center">

⭐ Star the repository if you like it!

</div>
