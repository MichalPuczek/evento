import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Components
import Header from "@/components/header";
import Footer from "@/components/footer";
import Container from "@/components/container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Evento - Trouvez des événements autour de vous",
  description: "Parcourez plus de 10,000 événements dans le monde",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-950 text-white overflow-y-scroll`}
      >
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
      </body>
    </html>
  );
}
