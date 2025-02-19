// src/app/layout.js (Server Component)

export const viewport = {
  themeColor: '#ffffff',
};

// Metadata for SEO and PWA
export const metadata = {
  title: 'My PWA',
  description: 'Progressive Web App with Next.js',
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        {/* Include the Client Layout */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

// Import the client layout from below
import ClientLayout from './client-layout';
