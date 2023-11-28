import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

export const futura = localFont({
  src: './futura.ttf',
});

export const inter = Inter({ subsets: ['latin'] });
