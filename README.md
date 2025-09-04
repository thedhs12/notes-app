

# Notes App (MERN Stack)

A simple Notes Management Application built using the MERN stack. 
Users can register, log in, and manage their notes securely.

## Tech Stack
- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcrypt


## Setup Instructions

### 1. Clone the repository
git clone https://github.com/thedhs12/notes-app.git
cd notes-app

### 2. Setup Backend
cd backend
npm install
npm run dev

Create a ".env" file inside backend folder:
  PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/notes-app
JWT_SECRET=your_jwt_secret

By default, the backend runs at http://localhost:5173

### 3.Setup Frontend
  cd frontend
  npm install
  npm run dev
  By default, the frontend runs at http://localhost:5000

  


