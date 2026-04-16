# Shree Plantation - Deployment Guide

This guide covers the deployment strategy for the three main parts of the Shree Plantation platform: the Node.js Backend, the Frontend User Website, and the Admin Panel.

## 1. MongoDB Setup (Database)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Build a New Cluster (the free tier is perfect).
3. Under "Database Access", create a new database user with a secure password.
4. Under "Network Access", allow access from anywhere (`0.0.0.0/0`) or specific IP ranges.
5. In your cluster, click "Connect" -> "Connect your application".
6. Copy your Connection String (`mongodb+srv://<username>:<password>@cluster...`). This is your **`MONGO_URI`**.

## 2. Deploying Backend to Render

1. Create a free account at [Render](https://render.com/).
2. Click "New" -> "Web Service".
3. Connect your GitHub repository containing this project.
4. Render Configuration:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. **Environment Variables**:
   Under "Advanced", add the following Environment Variables:
   - `MONGO_URI`: (Paste the connection string from MongoDB)
   - `PORT`: `5000` (Render handles this automatically usually, but good to set).
6. Click "Create Web Service".
7. Once deployed, copy the Render URL (e.g., `https://shree-backend.onrender.com`). This is your Backend API URL.

## 3. Deploying User Frontend to Vercel

1. Create an account at [Vercel](https://vercel.com/) and connect your GitHub.
2. Click "Add New" -> "Project" and select your repository.
3. Vercel Configuration:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
4. **Environment Variables**:
   - `VITE_API_URL`: (Paste your deployed Render backend URL, e.g., `https://shree-backend.onrender.com`)
5. Click **Deploy**. Vercel will automatically build the React Vite application and give you a live URL!

## 4. Deploying Admin Panel to Vercel

1. From Vercel Dashboard, click "Add New Project" again and select the same repository.
2. Vercel Configuration:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `admin`
3. **Environment Variables**:
   - `VITE_API_URL`: (Paste your deployed Render backend URL).
4. Click **Deploy**.
5. *Security Note*: The current dashboard uses static credentials (`admin` / `1234`). For production, consider connecting an authentication provider like Firebase Auth or JWT tokens in the Express backend.

## Local Development Execution

To run everything locally at the same time:

**Open Terminal 1 (Backend):**
```bash
cd backend
npm install
npm start (or node server.js)
```

**Open Terminal 2 (User Frontend):**
```bash
cd frontend
npm install
npm run dev
```

**Open Terminal 3 (Admin Panel):**
```bash
cd admin
npm install
npm run dev
```
