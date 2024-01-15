<!-- add an image -->

![vintage-hero-wide image](/public/vintage-hero-wide.jpg)



# Tschuttishop

## Project for: CAS Frontend Engineering @ Ost
## Project Team: [Roger Killer](https://github.com/killer-r2d2), [Philipp Isaak](https://github.com/codewurstler) 
## Check out the live version: https://tschuttishop.ch

## Tech stack
- [Nextjs](https://nextjs.org/)
  A React framework that enables server-side rendering and static site generation, enhancing performance and SEO for web applications.
- [Supabase](https://supabase.com/)
An open-source Firebase alternative providing a suite of tools like a database, authentication, real-time subscriptions, and storage, aimed at rapidly building and scaling applications.
- [Prisma](https://www.prisma.io/)
An open-source database toolkit that includes an ORM (Object-Relational Mapping) for Node.js and TypeScript, simplifying database access and management.
- [Playwright](https://playwright.dev/)
A framework for automated end-to-end testing of web applications across multiple browsers, enabling reliable and efficient testing processes.
- [Tailwindcss](https://tailwindcss.com/)
A utility-first CSS framework for rapidly building custom designs without leaving your HTML, promoting faster and more maintainable styling.
- [NextUi](https://nextui.org/)
A React UI library designed for creating modern and responsive interfaces with a collection of customizable and reusable components.
- [Resend](https://resend.com/)
Email solution

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

## Automated Testing with Playwright

In this project, we use [Playwright](https://playwright.dev/) for automated end-to-end testing to ensure the functionality and reliability of our application. The following tests have been implemented:

- Basic URL Checks (`multiplePages.spec.ts`): This test verifies the accessibility of the main pages of our application to ensure that all essential links are functioning correctly.
  
- First Product Detail Page Check (`productDetailPage.spec.ts`): This test ensures that the detail page of the first product on the homepage loads successfully and that the user can return to the homepage using the 'Back' button.

## Usability Testing
For usability testing, we created a questionnaire with a few tasks. The testing was conducted by several individuals on Windows and Mac systems. The surveys with the responses can be found here. [Usability Testing](https://drive.google.com/drive/folders/1aVG5FBLAst57tTYWFlhghE66SeIWbxEz?usp=sharing)
### Adjustments after Usability Testing
- The button on the product page is now immediately disabled after the product is added to the cart, indicating that the product has been successfully added to the cart.
- Cards have been adjusted to show when a product is "Vintage" or "Sold".
- The dashboard has been restructured and expanded with more information about the status of the sale/purchase.

## Prisma
- A key advantage of Prisma is that it eliminates the need for manually writing and executing SQL statements, accelerating development while enhancing security and type safety.