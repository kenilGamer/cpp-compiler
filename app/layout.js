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

export const metadata = {
  title: " Online Compiler & Modern Web IDE",
  description: "Write, compile, and run C++, Python, Java, JavaScript, and C code instantly in your browser. A fast, modern, open-source web IDE powered by Next.js and Judge0.",
  keywords: [
    "online compiler", "web IDE", "code editor", "C++", "Python", "Java", "JavaScript", "C",
    "Next.js", "Judge0", "run code online", "programming", "coding", "developer tools",
    "open source", "code runner", "code execution", "learn programming", "code playground"
  ].join(", ")
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
