import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cooking Club | Recipe Manager",
  description: "A modern recipe management app for cooking enthusiasts to store and organize their favorite recipes",
  keywords: ["cooking", "recipes", "food", "ingredients", "cooking club", "recipe manager"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1 pt-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
