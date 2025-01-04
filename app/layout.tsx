import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import ThemeToggle from './components/ThemeToggle'
import { IngredientsSidebar } from './components/IngredientsSidebar'
import LoginButton from './components/LoginButton'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Recipe Book',
  description: 'A responsive recipe book with search and filter features',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  )
}

'use client'

import { useState } from 'react'

function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open ingredients menu"
          >
            <Menu className="h-[1.2rem] w-[1.2rem]" />
          </Button>
          <h1 className="text-2xl font-bold">Recipe Book</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/bookmarks">
            <Button variant="outline">Bookmarks</Button>
          </Link>
          <LoginButton />
          <ThemeToggle />
        </div>
      </header>
      <IngredientsSidebar 
        open={sidebarOpen} 
        onOpenChange={setSidebarOpen} 
      />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </>
  )
}

