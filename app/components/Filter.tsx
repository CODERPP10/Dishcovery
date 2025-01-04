'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterProps {
  categories: string[]
  onFilter: (category: string) => void
}

export default function Filter({ categories, onFilter }: FilterProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    onFilter(value === 'all' ? '' : value)
  }

  return (
    <div className="w-full max-w-xs mx-auto mb-8">
      <Select onValueChange={handleCategoryChange} value={selectedCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

