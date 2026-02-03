import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chandra Mohan - AI/ML Developer & Mobile App Developer',
  description: 'Third-year CSE student specializing in AI/ML and mobile development with proven experience in Python, Flutter, and deep learning projects.',
  keywords: 'AI/ML Developer, Mobile App Developer, Python, Flutter, Deep Learning, Machine Learning, Computer Science',
  authors: [{ name: 'Chandra Mohan' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
