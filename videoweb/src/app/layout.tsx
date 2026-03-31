import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Incognito",
  description: "Web based Random Video chat app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
