# 🧠 Dump Quiz

Dump Quiz is a modern full-stack application for creating, browsing, and solving quizzes. The project is built as a monorepo using Turborepo, with separate frontend and backend apps. It leverages technologies like React, NestJS, PostgreSQL, Prisma, and Docker.

## 🚀 Getting Started (Development)

1. Install all dependencies:

```bash
npm install
```

2. Navigate to the backend folder and create a `.env` file by copying the existing `.env.example` and replace the placeholder values with your own.

3. Configure values in `docker-compose.yml` and start the Docker containers:

```bash
cd backend
docker-compose up
```

> ⚠️ Keep this terminal open.

4. Open a **new terminal** and run the migrations:

```bash
cd backend
npx prisma migrate dev
```

5. Go back to the root folder and start the **dev** environment:

```bash
cd ..
npm run dev
```

> This will launch both frontend and backend apps.

## 🏁 Running in Production

Place yourself in root folder

1. First build the project:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

## 📦 Technologies Used

- **Frontend**: React, Vite
- **Backend**: NestJS
- **Database**: PostgreSQL 
- **ORM**: Prisma
- **Authentication**: JWT
- **Monorepo**: Turborepo
- **Docker**: for containerized DB


## 🛠️ Useful Commands

- Restart database and seed: `npx prisma migrate reset`



