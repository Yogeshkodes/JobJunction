<h1 align="center">
  <br>
  Job Junction
  <br>
</h1>

<div align="center">
  <a href="https://github.com/yourusername">
    <img src="https://skillicons.dev/icons?i=react,tailwind,nodejs,express,postgres,github" alt="Tech Stack" width="300" style="padding: 15px 0;">
  </a>
</div>

<h3 align="center">
**JobJunction** is a full-featured job portal web application, built to connect **job seekers** with **recruiters** seamlessly. Inspired by platforms like Naukri.com, it provides tools for users to search and apply for jobs, while enabling recruiters to post vacancies, manage applicants, and streamline the hiring process.
</h3>

---

## 🕸️ Live Demo

Experience the live application: [Job Junction](https://job-junction-frontend-chi.vercel.app/)


## 🌟 Key Highlights

- 👩‍💼 **User Roles:** Separate dashboards and functionalities for **Job Seekers** and **Recruiters**
- 🔍 **Advanced Job Search:** Search and filter jobs by title, location, type, and more
- 📄 **Resume Uploads:** Users can upload resumes and apply to jobs in one click
- 📝 **Application Tracking:** Job seekers can view status updates on their applications
- 🧰 **Recruiter Tools:** Post jobs, view applicants, and manage interviews
- 🔐 **Secure Auth:** Role-based login system with protected routing
- ⚡ **Modern Tech Stack:** React + Tailwind + Vite for blazing-fast performance

  
## 🛠 Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js with Express.js
- **Storage**: Cloudinary for image hosting
- **Authentication**: Clerk
- **Database**: MongoDB

---

## 🛠️ Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Yogeshkodes/JobJunction.git
   cd JobJunction
   ```

2. **Frontend Setup**

   ```bash
   cd client
   npm install
   ```

   Create a `.env` file with:

   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_key_here
   VITE_BASE_URL=http://localhost:3000
   ```

3. **Backend Setup**

   ```bash
   cd ../server
   npm install
   ```

   Create a `.env` file with:

PORT=8000

MONGODB_URL=mongodb+srv://<username>:<password>@<cluster-url>.mongodb.net

CLERK_API_KEY=sk_test_your_clerk_api_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here

JWT_SECRET=your_jwt_secret_here

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Clerk Public Key for Auth
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here

# Backend API URL
VITE_BACKEND_URL=http://localhost:8000/api/v1

4. **Running the Application**
   - In one terminal (frontend):
     ```bash
     cd client
     npm run dev
     ```
   - In another terminal (backend):
     ```bash
     cd server
     npm run dev
     ```

---
