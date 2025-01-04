'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ArrowLeft, Bookmark } from 'lucide-react'
import { Notification } from '../../components/Notification'

const recipes = [
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    image: '/placeholder.svg?height=400&width=600',
    category: 'Pasta',
    prepTime: '30 mins',
    ingredients: [
      '400g spaghetti',
      '200g pancetta',
      '4 large eggs',
      '100g Pecorino cheese',
      '100g Parmesan cheese',
      'Freshly ground black pepper'
    ],
    instructions: [
      'Cook the spaghetti in a large pot of boiling salted water.',
      'In a large pan, cook the pancetta until crispy.',
      'In a bowl, whisk together eggs, Pecorino, and Parmesan.',
      'Drain the pasta, reserving some pasta water.',
      'Add the pasta to the pan with the pancetta, remove from heat.',
      'Quickly stir in the egg and cheese mixture, adding pasta water as needed.',
      'Season with black pepper and serve immediately.'
    ]
  },
  {
    id: 2,
    title: 'Chicken Stir Fry',
    image: '/placeholder.svg?height=400&width=600',
    category: 'Asian',
    prepTime: '25 mins',
    ingredients: [
      '500g chicken breast, sliced',
      '2 tablespoons soy sauce',
      '1 tablespoon sesame oil',
      '2 cups mixed vegetables (e.g., bell peppers, broccoli, carrots)',
      '2 cloves garlic, minced',
      '1 tablespoon cornstarch mixed with 1/4 cup water',
      '1 teaspoon ginger, minced'
    ],
    instructions: [
      'Marinate the chicken with soy sauce and sesame oil for 10 minutes.',
      'Heat a wok or large skillet over high heat and add the chicken. Cook until golden brown.',
      'Remove the chicken and set aside. Add garlic and ginger to the pan and sauté until fragrant.',
      'Add the mixed vegetables and stir-fry for 3-4 minutes.',
      'Return the chicken to the pan and mix well.',
      'Stir in the cornstarch mixture and cook until the sauce thickens.',
      'Serve hot with steamed rice or noodles.'
    ]
  },
  {
    id: 3,
    title: 'Vegetable Curry',
    image: '/placeholder.svg?height=400&width=600',
    category: 'Vegetarian',
    prepTime: '40 mins',
    ingredients: [
      '1 tablespoon vegetable oil',
      '1 onion, finely chopped',
      '2 cloves garlic, minced',
      '1 teaspoon ginger, minced',
      '2 cups mixed vegetables (e.g., potatoes, carrots, peas)',
      '1 can coconut milk',
      '2 tablespoons curry powder',
      '1 teaspoon turmeric',
      'Salt to taste',
      'Fresh cilantro for garnish'
    ],
    instructions: [
      'Heat oil in a large pot and sauté the onion until translucent.',
      'Add garlic and ginger, and cook for another minute.',
      'Stir in the curry powder and turmeric, cooking for 1 minute to release the flavors.',
      'Add the mixed vegetables and toss to coat with the spices.',
      'Pour in the coconut milk and bring to a simmer.',
      'Cook for 20-25 minutes, or until the vegetables are tender.',
      'Season with salt and garnish with fresh cilantro before serving.'
    ]
  }
]

export default function RecipePage({ params }: { params: { id: string } }) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const recipe = recipes.find(r => r.id === parseInt(params.id))

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    setIsBookmarked(bookmarks.includes(parseInt(params.id)))
  }, [params.id])

  if (!recipe) {
    notFound()
  }

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter((id: number) => id !== recipe.id)
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
    } else {
      bookmarks.push(recipe.id)
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
    setIsBookmarked(!isBookmarked)
    setShowNotification(true)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {showNotification && (
        <Notification
          message={isBookmarked ? "Recipe added to bookmarks" : "Recipe removed from bookmarks"}
          onClose={() => setShowNotification(false)}
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to recipes
        </Link>
        <motion.div whileTap={{ scale: 0.9 }}>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleBookmark}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </motion.div>
      </div>
      <div className="relative h-64 mb-8">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <h1 className="text-3xl font-bold mb-4 dark:text-gray-100">{recipe.title}</h1>
      <div className="flex items-center mb-6">
        <Badge className="mr-4">{recipe.category}</Badge>
        <span className="flex items-center text-gray-500 dark:text-gray-400">
          <Clock className="mr-2 h-4 w-4" />
          {recipe.prepTime}
        </span>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">Ingredients</h2>
          <ul className="list-disc list-inside">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="mb-2 dark:text-gray-300">{ingredient}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">Instructions</h2>
          <ol className="list-decimal list-inside">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="mb-4 dark:text-gray-300">{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

