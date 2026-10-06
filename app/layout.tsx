import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'BAYMOTION — Belajar PJOK Interaktif',
  description:
    'Platform pembelajaran interaktif dan gamifikasi untuk Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK).',
  keywords: 'BAYMOTION, Sport Education, PJOK, olahraga, pembelajaran, interaktif',
  openGraph: {
    title: 'BAYMOTION',
    description: 'Jelajahi dunia olahraga dengan cara yang lebih seru, interaktif, dan menyenangkan.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen" style={{ background: '#171717', color: '#FFFFFF' }}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
