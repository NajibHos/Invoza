# Invoza

Invoza is a modern web application for individuals to manage projects, invoices, and tasks all in one place. It comes with real-time database support, authentication, PDF invoice generation, and a clean dashboard for insights.

---

## Features 🚀

### Project Management 📂
- CRUD operations for projects
- Status-based filtering (New, Pending, In Progress, Completed)
- Overview of projects in the dashboard (cards + pie chart)

### Invoice Management 🧾
- CRUD operations for invoices
- Download invoices as PDF
- Manage pending & completed payments
- Dashboard shows recent invoices and 6-month income bar chart

### Task Management ✅
- CRUD operations for tasks
- Status tracking (New, Pending, In Progress, Done)
- Task priority levels (Low, Medium, High)
- Card-based UI for better visualization

### Dashboard Highlights 📊
- Recent invoices
- Total income this month
- Pending payments
- Completed vs. pending projects (cards)
- Income trends (last 6 months bar chart)
- Project status breakdown (pie chart)

### Authentication & Database 🔒
- **Better Auth** for secure authentication
- **Prisma + Neon** for real-time database

### UI & Experience 🎨
- Dark/Light theme toggle
- Clean, responsive design with modern dashboard layout
- Built on **Next.js**

---

## Tech Stack 🛠️

- **Frontend:** Next.js
- **Auth:** Better Auth
- **Database:** Prisma + Neon (Postgres)
- **UI:** Tailwind CSS + shadcn ui
- **Charts:** Recharts
- **PDF Generation:** jsPDF

---

## Getting Started ⚡

```bash

# Clone repo
git clone https://github.com/NajibHos/Invoza.git

cd Invoza

# Install dependencies
npm install

# head over to better-auth get better auth secret key and update your env
Better_AUTH_SECRET=""
Better_AUTH_URL="" // add localhost:3000 or your website address

# create a project in neon, get database url and update your env
DATABASE_URL=""

# migrate your schema to db
npx prisma migrate dev --name init

# all set, now run locally
npm run dev

