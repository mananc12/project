import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wasserstoff IDE",
  description:
    "Wasserstoff IDE is a web-based Integrated Development Environment (IDE) built using Next.js and CSS/Tailwind CSS. It allows users to manage folders and various file types, providing different interfaces based on the file extension for editing and previewing content.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
