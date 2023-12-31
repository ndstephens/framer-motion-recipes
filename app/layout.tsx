import { type Metadata } from 'next';
import { type PropsWithChildren } from 'react';
import { Inter } from 'next/font/google';

import './globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    template: '%s | Framer Motion Recipes',
    default: 'Home Page',
  },
  description: 'Project app for learning Framer Motion',
  // metadataBase: new URL('https://www.siteurl.com'),
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${sans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
