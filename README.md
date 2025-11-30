A simple Todo CRUD application built as a proof of concept using:

- **Next.js App Router**
- **Drizzle ORM**
- **SQLite database**
- **Server Actions for backend logic**
- **Tailwind CSS UI**

This demonstrates how to build a full-stack feature inside a “frontend” framework using Next.js server components and database connectivity without a separate backend server.

---

## 🚀 Features

✔ Add Todo  
✔ Update Todo inline  
✔ Delete Todo  
✔ Type-safe DB queries using Drizzle  
✔ Automatic page revalidation using Server Actions  
✔ Fast + lightweight SQLite local database  
✔ Fully responsive modern UI with Tailwind

---

## 🛠️ Tech Stack

| Layer     | Technology              |
| --------- | ----------------------- |
| Framework | Next.js 14 (App Router) |
| ORM       | Drizzle ORM             |
| Database  | SQLite (Local)          |
| Styling   | Tailwind CSS            |

---

## 📦 Getting Started

Clone the project:

```bash
git clone <your-repo-url>
cd drizzle-todo
```

## Install dependencies:

```bash
npm install
```

## Create the database + run migrations:

```bash
npx drizzle-kit push
```

## Start development server:

```bash
npm run dev
```
