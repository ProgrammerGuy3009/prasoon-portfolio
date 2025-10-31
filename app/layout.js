import "./globals.css";
import { Metadata } from "next";

export const metadata = {
  title: "Prasoon Tripathi | Full-Stack Developer & Data Analyst",
  description: "Portfolio of Prasoon Tripathi showcasing projects and skills",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
