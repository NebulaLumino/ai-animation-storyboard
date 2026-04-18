import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Animation Storyboard',
  description: 'Create animation storyboards with style, logline, age group, and runtime.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
