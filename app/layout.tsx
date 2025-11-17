import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Email Studio",
  description: "The quietest, sharpest, most disciplined email storytelling engine ever created.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
