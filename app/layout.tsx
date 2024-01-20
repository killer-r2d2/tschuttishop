import { Roboto_Flex } from "next/font/google";
import { Metadata } from "next";
import "../app/globals.css";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "./components/Footer";
import { Providers } from "./providers";
import AuthButton from "./components/AuthButton";
import { EdgeStoreProvider } from "@/utils/edgestore/edgestore";

export const metadata: Metadata = {
  metadataBase: new URL("https://tschuttishop.ch"),
  title: "Tschuttishop | Exklusive Fußballshirts kaufen & verkaufen",
  description:
    "Entdecken Sie im Tschuttishop eine umfangreiche Kollektion an Fußballshirts. Ob Klassiker oder aktuelle Designs – kaufen und verkaufen Sie einzigartige Fußballtrikots mit Leidenschaft. Starten Sie jetzt Ihr Fußballerlebnis!",
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: "https://tschuttishop.ch",
    siteName: "Tschuttishop",
    images: [
      {
        url: "https://tschuttishop.ch/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tschuttishop",
      },
    ],
  },
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
    <html
      lang="de"
      className={`${roboto.variable} font-sans scroll-smtooth focus:scroll-auto`}
    >
      <body>
        <Providers>
          <EdgeStoreProvider>
            <div className="flex flex-col min-h-screen">
              <div className="sticky top-0 z-50">
                <AuthButton />
                <Navigation />
              </div>
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </EdgeStoreProvider>
        </Providers>
      </body>
    </html>
  );
}
