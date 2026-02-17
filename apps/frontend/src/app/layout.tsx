import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/providers/providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToasterProvider } from "@/providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Store | Inforce Test Task",
  description: "Modern product management app built with Next.js, Redux, and Nest.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ToasterProvider />
          </div>
        </Providers>
      </body>
    </html>
  );
}
