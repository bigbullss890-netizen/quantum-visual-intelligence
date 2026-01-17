import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Quantum Visual Intelligence",
  description: "No-code quantum & hybrid intelligence platform"
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
