# CiteNest


PaperFlow is a MERN-based web application that helps students create, save and manage research-paper drafts.

Users can choose an IEEE, ACM or SCITEPRESS section guide, start with a blank paper, write using a rich-text editor, save drafts automatically and export papers as PDF.

## Live Demo

- Application: [https://your-stable-vercel-domain.vercel.app](https://paperflow-8s0bgymbn-misba1605s-projects.vercel.app/)
- Backend API: https://paperflow-opfj.onrender.com

> The backend uses Render's free tier, so the first request after inactivity may take a few seconds.

## Features

- User registration and login
- JWT-based authentication
- Protected personal workspace
- IEEE, ACM and SCITEPRESS paper guides
- Blank Paper option
- Rich-text editor
- Autosave after 2 seconds
- Manual save
- Create, open, update and delete papers
- PDF export
- Responsive interface
- User-specific draft ownership

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Axios
- React Quill

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm
- MongoDB Atlas or local MongoDB

### Installation

```bash
git clone <your-repository-url>
cd research-paper-app

npm install
npm run install:all
```

### Environment Variables

Create:

```text
client/.env
server/.env
```

Frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

Backend:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_jwt_secret
CLIENT_URL=http://localhost:5173
```

Do not commit real credentials or `.env` files.

### Run the Project

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

## Disclaimer

The IEEE, ACM and SCITEPRESS options are section-structure guides only. They are not official publisher templates and do not guarantee submission-ready formatting.

## Future Improvements

- Automated testing
- Image and table insertion
- Document version history
- Optional AI-assisted writing support
