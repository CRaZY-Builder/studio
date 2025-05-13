
import type {Metadata} from 'next';
import { Geist, Geist_Mono } from 'next/font/google'; // Corrected import for Geist
import './globals.css';
import { cn } from '@/lib/utils';

const geistSans = Geist({ // Corrected instantiation
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({ // Corrected instantiation
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SCADA Assistant',
  description: 'Advanced SCADA Reporting and Assistance Tool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> {/* Added suppressHydrationWarning for potential theme/date issues */}
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        geistSans.variable,
        geistMono.variable
      )}>
        {children}
      </body>
    </html>
  );
}
