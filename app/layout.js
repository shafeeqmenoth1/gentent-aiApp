import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import ModalProvider from '@/components/modal-provider'
import { ToasterProvider } from '@/components/toaster-provider'
import { CrispProvider } from '@/components/crisp-provider'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gentent',
  description: 'Generate What you want with AI',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <CrispProvider/>
        <ModalProvider/>
        <ToasterProvider/>
        {children}
        </body>
    </html>
    </ClerkProvider>
  )
}
