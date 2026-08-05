import { Anonymous_Pro, Be_Vietnam_Pro, Inter, Google_Sans, Germania_One, Figtree, Dongle } from 'next/font/google';
import './globals.css';
import {Navbar} from "@/components/layout/Navbar";
import Providers from "./providers";
import Banner from "@/components/layout/Banner";
import { BannerProvider } from "@/context/BannerContext"


const anonymousPro = Anonymous_Pro({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-anonymous-pro',
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-be-vietnam-pro',
});

const inter = Inter({
  subsets: [],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal','italic'],
  variable: '--font-inter',
});

const googleSans = Google_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal','italic'],
  variable: '--font-google-sans',
});

const germaniaOne = Germania_One({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
  variable: '--font-germania-one',
});

const figTree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal','italic'],
  variable: '--font-fig-tree',
});

const dongle = Dongle ({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  style: ['normal'],
  variable: '--font-dongle',
})


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
      className={`${anonymousPro.variable} ${beVietnamPro.variable} ${inter.variable} ${googleSans.variable} ${germaniaOne.variable} ${figTree.variable} ${dongle.variable} h-full antialiased font-figtree`}
    >
      <body className="w-full min-h-full flex flex-col">
      <Providers>
        <BannerProvider>
          <Banner />
          <Navbar />
          {children}
        </BannerProvider>
      </Providers>
      </body>
    </html>
  );
}
