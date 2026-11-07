import {
  Bricolage_Grotesque,
  Readex_Pro,
  IBM_Plex_Sans_Arabic,
} from 'next/font/google';
import './globals.css';
import RootShell from '@/components/layout/RootShell';
export { rootMetadata as metadata } from '@/config/pageMetadata';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  weight: ['500', '700', '800'],
  display: 'swap',
});

const readex = Readex_Pro({
  subsets: ['arabic', 'latin'],
  variable: '--font-readex',
  weight: ['500', '700'],
  display: 'swap',
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  variable: '--font-plex-arabic',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${bricolage.variable} ${readex.variable} ${plexArabic.variable}`}
      suppressHydrationWarning
    >
      <body>
        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}
