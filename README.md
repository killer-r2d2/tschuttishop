# Tschuttishop

## Project for: CAS Frontend Engineering @ Ost
## Project Team: [Roger Killer](https://github.com/killer-r2d2), [Philipp Isaak](https://github.com/codewurstler) 
## Check out the live version: https://tschuttishop.vercel.app/

## Getting Started

### Environment Variables

This project requires certain environment variables to be set up. Follow the steps below to configure the environment variables:

1. **Setting Up Main Environment Variables:**
    - Copy the `example.env` file and rename the copy to `.env`.
        ```bash
        cp example.env .env
        ```
    - Open the `.env` file and set the value for `DATABASE_URL` to your database connection string.

2. **Setting Up Local Environment Variables:**
    - Copy the `example.env.local` file and rename the copy to `.env.local`.
        ```bash
        cp example.env.local .env.local
        ```
    - Open the `.env.local` file and set the values for the following variables:
        - `BASE_URL` (usually this will remain as `http://localhost:3000`)
        - `NEXT_PUBLIC_SUPABASE_URL` (your Supabase URL)
        - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (your Supabase anonymous key)

### Running the Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## How I setup prisma in this project:
1. npm install prisma --save-dev
2. npm install @prisma/client
3. npm install typescript ts-node @types/node --save-dev
4. npx prisma init
You get prisma/schema.prisma
5. build your model
6. npx prisma migrate -> the model is now in your database
5. prisma client: https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

## Setting Up Jest and React Testing Library in Next.js
Package Installation:
Jest and related environments:
"jest": "^29.7.0"
"jest-environment-jsdom": "^29.7.0"
Testing Libraries:
"@testing-library/jest-dom": "^6.1.4"
"@testing-library/react": "^14.1.0"
Type definitions for Jest:
"@types/jest": "^29.5.8"

```bash
npm install --save-dev jest@^29.7.0 jest-environment-jsdom@^29.7.0 @testing-library/jest-dom@^6.1.4 @testing-library/react@^14.1.0 @types/jest@^29.5.8
```
NPM Script Extensions:
For running tests:
"test": "jest --watch"
For Continuous Integration environments:
"test:ci": "jest --ci"

Jest Configuration (jest.config.mjs):

Setting up the test environment as jest-environment-jsdom.

Configuring setupFilesAfterEnv for initializing @testing-library/jest-dom.

Setup File Configuration (jest.setup.ts):

Importing @testing-library/jest-dom for additional Jest matchers.

Writing a Test Case (__tests__/Footer.test.tsx):
Importing React Testing Library and the Footer component.
Writing a test to verify if the Footer component contains the expected text.
With these steps, you've established a solid foundation for unit testing in your Next.js application using Jest and React Testing Library. You can now proceed to write further test cases for your components and functions.

