# 🚀 GigMind AI - Next-Generation AI-Powered Freelancing Platform

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-7.5-47A248?style=for-the-badge&logo=mongodb)
![BetterAuth](https://img.shields.io/badge/BetterAuth-Secure-orange?style=for-the-badge)
![Groq AI](https://img.shields.io/badge/Groq_AI-Powered-purple?style=for-the-badge)

## 📖 Project Overview

**GigMind AI** is a state-of-the-art freelance marketplace designed to bridge the gap between talented freelancers and clients looking for top-tier skills. Unlike traditional platforms, GigMind AI integrates advanced Artificial Intelligence (powered by Groq and Google Generative AI) to streamline job creation, generate detailed job descriptions, and offer an intelligent chat assistant to help users navigate the platform and refine their project requirements.

Built with the latest cutting-edge web technologies (Next.js 16+, React 19, and Tailwind CSS v4), it delivers an incredibly fast, highly responsive, and visually stunning user experience. The application provides dedicated, role-based dashboards for both **Clients** and **Freelancers**, ensuring that each user persona has a tailored, frictionless experience while managing gigs, jobs, and applications.

---

## ✨ Core Features (Deep-Dive)

### 🔐 1. Authentication & Security (Better Auth)
- **Role-Based Access Control (RBAC):** Distinct roles for `freelancer` and `client`.
- **OAuth Integration:** Seamless Google Sign-In via `Better Auth`.
- **Session Management:** Secure JWT tokens and session handling using MongoDB adapter.
- **Protected Routes:** Next.js middleware ensures users can only access their respective dashboards.

### 🧠 2. Artificial Intelligence Integration
- **Smart Job Post Generation:** Clients can input a brief idea, and the AI (Groq API) generates a comprehensive, professional job description automatically.
- **AI Chat Assistant:** A dedicated contextual chatbot to assist users with platform navigation, gig recommendations, and support.

### 💼 3. Client & Freelancer Dashboards
- **Client Dashboard:** Manage posted jobs, review freelancer applications, manage payments, and track ongoing projects.
- **Freelancer Dashboard:** Create and manage Gigs, apply for jobs, track application status, and view earnings.
- **Interactive Analytics:** Data visualization of earnings and profile views using `Recharts`.

### 🎨 4. UI/UX & Styling
- **Premium Design System:** Built using `HeroUI` for accessible, beautifully crafted components.
- **Responsive Layout:** Mobile-first approach using `Tailwind CSS 4.0`.
- **Iconography:** Rich visual cues using `Lucide React`, `React Icons`, and `Gravity UI Icons`.
- **Toast Notifications:** Real-time feedback using `react-toastify`.

### 🔄 5. State Management & Data Fetching
- **TanStack React Query:** Used for highly efficient data fetching, caching, background updates, and state synchronization across components.

---

## 🛠️ Complete Tech Stack & Dependencies

### **Frontend:**
- **Framework:** `Next.js (v16.2.10)` - App Router, SSR, and API routes.
- **Library:** `React (v19.2.4)` - Leveraging the latest React Compiler.
- **Styling:** `Tailwind CSS (v4)`, `HeroUI (@heroui/react)` - For modern, glassmorphism-inspired UI components.
- **State Management:** `@tanstack/react-query` - For robust server-state management.
- **Charts:** `Recharts` - For rendering beautiful analytics dashboards.
- **Icons:** `lucide-react`, `react-icons`, `@gravity-ui/icons`.

### **Backend & Database:**
- **Database Engine:** `MongoDB` (Native Node.js Driver v7.5).
- **Authentication:** `Better Auth` (`better-auth`, `@better-auth/mongo-adapter`) - A modern, highly secure auth solution.
- **AI Integration:** `@google/generative-ai` & Groq REST APIs.

### **Tooling:**
- **Linting:** `ESLint v9`.
- **Compiler:** `babel-plugin-react-compiler`.

---

## 📂 Detailed Project Directory Structure

```text
gigmindai/
│
├── src/
│   ├── app/                    # Next.js App Router root
│   │   ├── (public pages)      # about-us, contact-support, privacy, terms
│   │   ├── api/                # Next.js Backend API Routes
│   │   │   ├── auth/           # BetterAuth endpoints ([...all])
│   │   │   ├── chat-assistant/ # AI Chatbot endpoint
│   │   │   └── generate-job-details/ # AI Job generator endpoint
│   │   ├── auth/               # Login / Signup pages
│   │   ├── client/             # Client-specific dashboard & routes
│   │   ├── freelancer/         # Freelancer-specific dashboard & routes
│   │   ├── explore-jobs/       # Job listing and search pages
│   │   ├── gig/                # Gig details and creation routes
│   │   ├── layout.jsx          # Root application layout
│   │   ├── globals.css         # Global Tailwind & Custom CSS
│   │   └── error.jsx / not-found.jsx # Error handling UI
│   │
│   ├── components/             # Reusable React Components
│   │   ├── ai/                 # Chat UI and AI generators
│   │   ├── auth/               # Auth forms and social login buttons
│   │   ├── explore-jobs/       # Job cards, filters, search bars
│   │   ├── home/               # Landing page sections (Hero, Features)
│   │   ├── reusable-pagination/# Generic pagination component
│   │   └── shared/             # Navbar, Footer, Modals, Buttons
│   │
│   ├── hooks/                  # Custom React Hooks (e.g., useAuth)
│   ├── lib/                    # Core Utilities & Configurations
│   │   ├── auth.js             # Better Auth server configuration
│   │   ├── auth-client.js      # Better Auth client initialization
│   │   ├── getClientJWTToken.js# Client-side token retrieval
│   │   ├── getServerJWTToken.js# Server-side token retrieval
│   │   └── serverUserSession.js# Session validation utility
│   │
│   └── providers/              # Context Providers
│       └── TanstackProvider.jsx# React Query Client Provider
│
├── public/                     # Static assets (images, fonts)
├── .env                        # Environment variables (DO NOT COMMIT)
├── next.config.mjs             # Next.js build configuration
├── tailwind.config.js          # Tailwind styling rules (if applicable)
└── package.json                # Dependencies and project scripts
```

---

## 🗄️ Database Architecture (MongoDB)

The platform utilizes MongoDB. Based on the Better Auth adapter and typical freelance architecture, the core collections include:

1. **Users (`users` collection):**
   - Fields: `_id`, `name`, `email`, `role` (`client` | `freelancer`), `image`, `createdAt`, `updatedAt`.
2. **Sessions (`sessions` collection):**
   - Managed securely by Better Auth for active logins.
3. **Jobs/Gigs:**
   - Fields: `title`, `description`, `budget`, `skillsRequired`, `clientId` (Reference to User), `status`.
4. **Applications:**
   - Links a Freelancer (`userId`) to a Job (`jobId`), including `coverLetter` and `bidAmount`.

---

## 🌐 API Endpoints & Workflows

### Authentication Flow (Better Auth)
- `POST /api/auth/sign-in`: Authenticates user and sets HttpOnly cookies.
- `POST /api/auth/sign-up`: Registers a new user and assigns a role.
- `GET /api/auth/session`: Retrieves current active session data.

### AI Integration Routes
- `POST /api/chat-assistant`: Accepts user messages and returns streamed AI responses via Groq.
- `POST /api/generate-job-details`: Accepts a short prompt (e.g., "Need a React dev for 3 days") and returns a fully formatted markdown job description.

---

## ⚙️ Step-by-Step Environment Setup & Installation Guide

### Prerequisites
- **Node.js**: v18.17.0 or higher.
- **Package Manager**: `npm`, `yarn`, or `pnpm`.
- **Database**: A MongoDB Atlas cluster or local MongoDB instance.

### Step 1: Clone the repository
```bash
git clone https://github.com/your-username/gigmindai.git
cd gigmindai
```

### Step 2: Install dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Environment Variables Setup
Create a `.env` file in the root directory and configure the following:

```env
# Server URL (Update for production)
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Better Auth Keys (Generate secret using: openssl rand -base64 32)
BETTER_AUTH_SECRET=your_super_secret_string
BETTER_AUTH_URL=http://localhost:3000

# Image Upload API Key (e.g., ImgBB)
NEXT_PUBLIC_IMAGE_UPLOAD_API=your_image_api_key

# MongoDB Connection String
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/?appName=Cluster0
MONGODB_DB_NAME=GigMindAI

# Google OAuth Credentials (For Google Sign-In)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Demo Account Credentials (Optional - For testing)
NEXT_PUBLIC_DEMO_EMAIL_FREELANCER=freelancer@gmail.com
NEXT_PUBLIC_DEMO_PASSWORD_FREELANCER=Freelancer123
NEXT_PUBLIC_DEMO_EMAIL_CLIENT=client@gmail.com
NEXT_PUBLIC_DEMO_PASSWORD_CLIENT=Client123

# Groq AI API Key for AI features
GROQ_API_KEY=your_groq_api_key
```

### Step 4: Run the Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000` to view the application.

---

## 🚀 Deployment & Optimization Notes

### Vercel Deployment (Recommended)
1. Push your code to GitHub.
2. Log into [Vercel](https://vercel.com/) and create a new project.
3. Import your GitHub repository.
4. Add all variables from your `.env` file into the Vercel Environment Variables settings.
5. Click **Deploy**.

### Performance Highlights
- **Server Components:** Extensive use of React Server Components (RSC) reduces client-side JavaScript bundles.
- **Image Optimization:** Utilizes `next/image` for automatic WebP conversion and lazy loading.
- **Glassmorphism UI:** CSS backdrops and filters are heavily optimized using Tailwind v4 compiler for lag-free scrolling.

---

## 🤝 Contributing & License

### Contributing
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

### License
This project is licensed under the MIT License.
