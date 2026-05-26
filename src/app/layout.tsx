import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/site.config';
import { LanguageProvider } from '@/context/LanguageContext';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: `${siteConfig.names.bride} & ${siteConfig.names.groom} | Wedding`,
  description: `Welcome to the wedding website of ${siteConfig.names.bride} and ${siteConfig.names.groom}`,
  icons: {
    icon: '/branding/wedding-logo.png',
    apple: '/branding/wedding-logo.png',
  },
  openGraph: {
    title: `${siteConfig.names.bride} & ${siteConfig.names.groom}`,
    description: `Welcome to the wedding of ${siteConfig.names.bride} and ${siteConfig.names.groom}`,
    images: ['/branding/wedding-logo.png'],
    type: 'website',
  },
};

/**
 * Root layout component for the entire application.
 * @param {Object} props component properties.
 * @return {JSX.Element} The rendered root layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
