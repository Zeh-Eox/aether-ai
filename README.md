# AetherAI — Fullstack SaaS Application

A fullstack AI-powered web application that allows authenticated users to generate content, images, and analyze documents using modern AI tools. Built with React + Vite on the frontend and Express + TypeScript on the backend, with secure authentication powered by Clerk.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-Authentication-6C47FF?logo=clerk&logoColor=white)
![Google Generative AI](https://img.shields.io/badge/Google_Generative_AI-Gemini-4285F4?logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?logo=vercel&logoColor=white)


## Features

### Authentication
- Secure authentication using Clerk
- Protected API routes
- User-based content access

### AI Capabilities
- Generate articles
- Generate blog titles
- Generate AI images
- Remove image background
- Remove objects from images
- Resume review and analysis (PDF upload)

### Media & Cloud
- Image upload handling with Multer
- Image storage and processing via Cloudinary

### Security & Performance
- Rate limiting on AI routes
- CORS enabled
- Environment variable protection
- Modular and scalable architecture

## Tech Stack

### Frontend (Client)
- React 19
- Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- Clerk React
- Axios
- Framer Motion

### Backend (Server)
- Node.js
- Express 5
- TypeScript
- Clerk Express
- Cloudinary
- Multer
- Rate Limiting
- Google Generative AI
- OpenAI SDK
- PDF.js

## Project Structure

```
project-root/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   └── package.json
│
├── server/                 # Backend (Express + TypeScript)
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── configs/
│   │   └── server.ts
│   ├── dist/
│   └── package.json
│
└── README.md
```

## Environment Variables

### Backend (`server/.env`)
```env
DATABASE_URL=your_database_url

CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

GEMINI_API_URL=gemini_api_url
GEMINI_API_KEY=your_gemini_api_key
AI_AGENT_MODEL=gemini_ai_agent_model

CLIPDROP_API_URL=clipdrop_api_url
CLIPDROP_API_KEY=your_clipdrop_api_key
```

### Frontend (`client/.env`)
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:3000/api/v1
```

## Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone git@github.com:Zeh-Eox/aether-ai.git
cd aether-ai
```

### 2️⃣ Backend setup
```bash
cd server
npm install
```

**Run in development:**
```bash
npm run dev
```


### 3️⃣ Frontend setup
```bash
cd client
npm install
```

**Run in development:**
```bash
npm run dev
```

## API Routes

### AI Routes (`/api/v1/ai`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/generate-article` | Generate AI article |
| POST | `/generate-blog-title` | Generate blog titles |
| POST | `/generate-image` | Generate image |
| POST | `/remove-image-background` | Remove image background |
| POST | `/remove-image-object` | Remove objects from image |
| POST | `/review-resume` | Analyze resume (PDF) |

### User Routes (`/api/v1/user`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/get-user-creations` | Fetch user creations |


## Author

**Arnold CONVOLBO**  
Fullstack Web Developer | Linux SysAdmin

## License

This project is licensed under the ISC License.