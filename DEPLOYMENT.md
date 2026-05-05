# Deployment Guide - Shree Plantation

Follow these steps to deploy your website live for FREE.

### Automation Added:
- **`render.yaml`**: Automatically configures your Backend on Render.
- **`vercel.json`**: Handles React Router routing on Vercel (prevents 404s).
- **`package.json` (Root)**: Allows you to run `npm run dev` to start everything at once.
- **`.env.example`**: A template for all your secret keys.

---

## 1. Database Setup (MongoDB Atlas)

1. Sign up at [MongoDB Atlas](https://www.mongodb.com/).
2. Create a **Shared Cluster** (Free tier).
3. Under **Network Access**, add `0.0.0.0/0` (Allow access from everywhere).
4. Under **Database Access**, create a user (e.g., `admin`) and save the password.
5. Click **Connect** -> **Drivers** -> Copy the connection string.
   - Example: `mongodb+srv://admin:<password>@cluster0.abcde.mongodb.net/shree_plantation?retryWrites=true&w=majority`
   - *This is your `MONGO_URI`.*

---

## 2. Image Storage (Cloudinary)

1. Sign up at [Cloudinary](https://cloudinary.com/).
2. From your Dashboard, copy these three values:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

---

## 3. Backend Deployment (Render)

1. Sign up at [Render](https://render.com/).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. Settings:
   - **Name**: `shree-plantation-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. **Environment Variables** (Under "Advanced"):
   - `MONGO_URI`: (From Step 1)
   - `CLOUDINARY_CLOUD_NAME`: (From Step 2)
   - `CLOUDINARY_API_KEY`: (From Step 2)
   - `CLOUDINARY_API_SECRET`: (From Step 2)
   - `PORT`: `10000`
6. Click **Create Web Service**. 
7. Once the build finishes, copy the live URL (e.g., `https://shree-backend.onrender.com`).

---

## 4. Frontend & Admin Deployment (Vercel)

1. Sign up at [Vercel](https://vercel.com/).
2. Click **Add New** -> **Project** -> Connect your GitHub.
3. **Deploy the Frontend**:
   - **Project Name**: `shree-plantation`
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
   - **Environment Variables**:
     - `VITE_API_URL`: (Your Render URL from Step 3)
4. **Deploy the Admin**:
   - **Project Name**: `shree-plantation-admin`
   - **Root Directory**: `admin`
   - **Framework Preset**: `Vite`
   - **Environment Variables**:
     - `VITE_API_URL`: (Your Render URL from Step 3)

---

## Success!
Your website should now be live at your Vercel URL. All images will be stored on Cloudinary, and your data will be in MongoDB Atlas.
