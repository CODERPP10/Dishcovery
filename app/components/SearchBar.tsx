'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md mx-auto mb-8">
      <Input
        type="search"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
      />
    </form>
  )
}

