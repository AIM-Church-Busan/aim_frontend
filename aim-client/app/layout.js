import { Anonymous_Pro, Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import {Navbar} from "@/components/layout/Navbar";
import Providers from "./providers";


const anonymousPro = Anonymous_Pro({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-anonymous-pro',
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-be-vietnam-pro',
});


export const metadata = {
  title: {
    default: 'AIM Church',
    template: '%s | AIM Church',
  },
  description: 'Antioch International Ministry in Busan',
  keywords: ['International Church', 'International Ministry', 'South Korea Church', 'Busan Church', 'International Ministry in Busan'],
  authors: [{ name: 'AIM Church' }],
  creator: 'AIM Church',
  publisher: 'AIM Church',

  openGraph: {
    title: 'AIM Church',
    description: 'Antioch International Ministry in Busan',
    url: 'https://your-domain.com',
    siteName: 'AIM Church',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AIM Church',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'Hello, welcome to AIM.',
    title: 'AIM Church',
    description: 'Antioch international ministry in Busan',
    images: ['/images/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${anonymousPro.variable} ${beVietnamPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
      <Providers>
        <Navbar />
        {children}
      </Providers>
      </body>
    </html>
  );
}
