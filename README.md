# Tschuttishop

## Project for: CAS Frontend Engineering @ Ost
## Project Team: [Roger Killer](https://github.com/killer-r2d2), [Philipp Isaak](https://github.com/codewurstler) 
## Check out the live version: https://tschuttishop.ch

## Tech stack
- [Nextjs](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Prisma](https://www.prisma.io/)
- [Playwright](https://playwright.dev/)
- [Tailwindcss](https://tailwindcss.com/)
- [NextUi](https://nextui.org/)
- [Resend](https://resend.com/)

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


## How I setup prisma in this project:
1. npm install prisma --save-dev
2. npm install @prisma/client
3. npm install typescript ts-node @types/node --save-dev
4. npx prisma init
You get prisma/schema.prisma
5. build your model
6. npx prisma migrate -> the model is now in your database
5. prisma client: https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

## Automated Testing with Playwright

In this project, we use [Playwright](https://playwright.dev/) for automated end-to-end testing to ensure the functionality and reliability of our application. The following tests have been implemented:

- **Basic URL Checks (`multiplePages.spec.ts`)**: This test verifies the accessibility of the main pages of our application to ensure that all essential links are functioning correctly.
  
- **First Product Detail Page Check (`productDetailPage.spec.ts`)**: This test ensures that the detail page of the first product on the homepage loads successfully and that the user can return to the homepage using the 'Back' button.