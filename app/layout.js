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
  title: "C++ Online Compiler | Modern Web IDE",
  description: "A modern web app to write, compile, and run C++, Python, Java, JavaScript, and C code instantly in your browser. Powered by Next.js, Monaco Editor, and Judge0 API.",
  keywords: "C++, online compiler, web IDE, code editor, Python, Java, JavaScript, C, Next.js, Monaco Editor, Judge0, run code online, programming, coding, developer tools, open source, code runner, code execution, learn programming, code playground"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
