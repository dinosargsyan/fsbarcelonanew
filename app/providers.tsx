"use client";

import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from "next-themes";

export function Providers({
  children,
  locale,
  messages
}: {
  children: React.ReactNode;
  locale: string;
  messages: any;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
