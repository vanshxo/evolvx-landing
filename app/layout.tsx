import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from "@/components/ui/sonner"
export const metadata: Metadata = {
  title: 'EvolvX',
  description: 'Transform ideas into impactful ventures while developing confidence, leadership, and real-world problem-solving abilities.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" richColors />

      </body>
    </html>
  )
}
