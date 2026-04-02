import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AppProgressProvider } from "@/context/AppProgressProvider";

export const metadata: Metadata = {
  title: {
    default: "Sex-Bibel | Sexstellungen & Intimität – Bildungsressource",
    template: "%s | Sex-Bibel",
  },
  description:
    "Entdecke Sexstellungen, Tipps für mehr Intimität und Paar-Challenges. Bildungsressource für sexuelle Gesundheit – auf Deutsch.",
  keywords: ["Sexstellungen", "Intimität", "Paare", "Sex-Tipps", "Sexualität"],
  openGraph: {
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-slate-50 font-sans antialiased">
        <AppProgressProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AppProgressProvider>
      </body>
    </html>
  );
}
