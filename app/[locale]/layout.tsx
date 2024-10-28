import Footer from "@/components/Footer";
import Header from "@/components/Header";
// import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import { Providers } from "../providers"; // Import your Providers component
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import "../../styles/index.css";
import "node_modules/react-modal-video/css/modal-video.css";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Check if the locale is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Fetch the messages on the server
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <head />
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers locale={locale} messages={messages}>
          <Header />
          {children}
          <Footer />
          {/* <ScrollToTop /> */}
        </Providers>
      </body>
    </html>
  );
}
