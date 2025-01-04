'use client'

import { useState, useEffect } from 'react'
import RecipeCard from '../components/RecipeCard'

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

export default function BookmarksPage() {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<typeof recipes>([])

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    const filteredRecipes = recipes.filter(recipe => bookmarks.includes(recipe.id))
    setBookmarkedRecipes(filteredRecipes)
  }, [])

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8 dark:text-gray-100">Bookmarked Recipes</h1>
      {bookmarkedRecipes.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">You haven't bookmarked any recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookmarkedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </div>
      )}
    </div>
  )
}

