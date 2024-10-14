import React from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="max-w-3xl mx-auto ">{children}</main>
      </body>
    </html>
  );
}
