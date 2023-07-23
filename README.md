## T3 Stack Todo Application

### Built using:

- NextJS 13
- tRPC
- Prisma
- Mongo DB
- TypeScript
- Tailwind CSS

### Features:

- Utilizing NextAuth for Sign Up and Login of User Accounts
- Google as NextAuth Provider
- Able to comment on todos, as well as update and delete comments
- Serverless Application
- Deployed in Vercel

### Guide

1. Clone the app

2. Open the project in your favorite text editor

3. Run `npm install` to install dependencies

4. Create `.env` in the root folder with the following environment variables.

Your own mongodb uri for your project

> DATABASE_URL

This is a required field for deploying the application set up by the T3 Stack Devs

> NEXTAUTH_SECRET

This is the base url of your domain or localhost if being run locally

> NEXTAUTH_URL

Your own google client id that you can get in google console.

> GOOGLE_CLIENT_ID

Your own google client secret that you can get in google console.

> GOOGLE_CLIENT_SECRET

5. Save the .env file. And run `npm run dev` to start the development mode

### Features with images

- Utilizing NextAuth for Sign Up and Login of User Accounts

![Next Auth](./ReadMe%20Assets/nextAuth.png)

- Google as NextAuth Provider

![Next Auth](./ReadMe%20Assets/googleProvider.jpg)

- Able to add, update and delete todos

![Next Auth](./ReadMe%20Assets/Add%20Todo.jpg)

- Able to comment on todos, as well as update and delete comments

![Next Auth](./ReadMe%20Assets/AddComment.jpg)

## - Deployed in Vercel [DEMO](https://tristan-john-girao-todo-app-t3.vercel.app/)
