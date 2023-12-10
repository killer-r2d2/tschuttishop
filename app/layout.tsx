import { Roboto_Flex } from "next/font/google";
import { Metadata } from "next";
import "../app/globals.css";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "./components/Footer";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Tschuttishop",
};

const roboto = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-flex",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${roboto.variable} font-sans`}>
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}