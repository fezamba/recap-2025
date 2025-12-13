import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retrospectiva 2025 / Visão 2026",
  description: "Wizard de retrospectiva com envio por e-mail + PDF.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
