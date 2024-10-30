import { Providers } from "@/app/providers";

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <Providers locale={locale}>
      {children}
    </Providers>
  );
}
