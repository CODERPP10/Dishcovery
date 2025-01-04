'use client'

import { useState } from 'react'
import RecipeCard from './components/RecipeCard'
import SearchBar from './components/SearchBar'
import Filter from './components/Filter'

// This would typically come from an API or database
const recipes = [
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    image: '/placeholder.svg?height=300&width=400',
    category: 'Pasta',
    prepTime: '30 mins'
  },
  {
    id: 2,
    title: 'Chicken Stir Fry',
    image: '/placeholder.svg?height=300&width=400',
    category: 'Asian',
    prepTime: '25 mins'
  },
  {
    id: 3,
    title: 'Vegetable Curry',
    image: '/placeholder.svg?height=300&width=400',
    category: 'Vegetarian',
    prepTime: '40 mins'
  }
]

const categories = ['Pasta', 'Asian', 'Vegetarian']

export default function Home() {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes)

  const handleSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    setFilteredRecipes(
      recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(lowercaseQuery) ||
        recipe.category.toLowerCase().includes(lowercaseQuery)
      )
    )
  }

  const handleFilter = (category: string) => {
    if (category === '') {
      setFilteredRecipes(recipes)
    } else {
      setFilteredRecipes(recipes.filter((recipe) => recipe.category === category))
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8 dark:text-gray-100">Recipe Book</h1>
      <SearchBar onSearch={handleSearch} />
      <Filter categories={categories} onFilter={handleFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </div>
    </div>
  )
}

