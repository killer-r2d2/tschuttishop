import { Roboto_Flex } from "@next/font/google";
import { Metadata } from "next";
import '../app/globals.css'
import Navigation from "@/app/components/navigation";

export const metadata: Metadata = {
    title: 'Tschuttishop',
}

const roboto = Roboto_Flex({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto-flex',
})
export default function RootLayout(
    {children,}: { children: React.ReactNode }) {
    return (
        <html lang="de" className={`${roboto.variable} font-sans`}>
            <body>
                <Navigation />
                {children}
            </body>
        </html>
    )
}