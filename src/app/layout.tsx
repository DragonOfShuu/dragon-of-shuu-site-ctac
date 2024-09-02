import type { Metadata } from "next";
import { Open_Sans, Libre_Baskerville } from "next/font/google";
import "./globals.sass";
import NavBar from "../components/nav/navBar/NavBar";
import Footer from "@/components/nav/footer/Footer";

const strikingFont = Libre_Baskerville({
    weight: "400",
    subsets: ["latin"],
    variable: "--striking-font",
});

const simpleFont = Open_Sans({
    subsets: ["latin"],
    variable: "--simple-font",
});

export const metadata: Metadata = {
    title: "Dragon of Shuu -- Logan C",
    description:
        "Logan is a hardworking developer who advocates for clean, consistent, and DRY code",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            {/* 
                May the passion of this project
                bring a little more joy to the 
                viewers of this troubled world
            */}
            <body
                className={`${strikingFont.variable} ${simpleFont.variable} ${simpleFont.className}`}
            >
                <NavBar />
                <div className={`min-h-screen`}>
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    );
}
