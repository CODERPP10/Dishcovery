'use client'

import { useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface IngredientCategory {
  name: string
  count: string
  ingredients: string[]
}

const categories: IngredientCategory[] = [
  {
    name: "Pantry Essentials",
    count: "1/40",
    ingredients: [
      "butter", "egg", "garlic", "milk", "onion", "sugar", "flour", 
      "olive oil", "garlic powder", "white rice", "cinnamon", 
      "ketchup", "soy sauce", "mayonnaise", "vegetable oil"
    ]
  },
  {
    name: "Vegetables & Greens",
    count: "0/30",
    ingredients: []
  }
]

interface IngredientsSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function IngredientsSidebar({ open, onOpenChange }: IngredientsSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Pantry Essentials"])

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[400px] p-0" aria-describedby="pantry-description">
        <SheetHeader className="p-4 bg-pink-500 text-white">
          <SheetTitle className="text-white">Pantry</SheetTitle>
          <p id="pantry-description" className="text-sm text-white/90">You have 4 ingredients</p>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-white/70" />
            <Input 
              placeholder="add/remove/paste ingredients" 
              className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/70"
            />
          </div>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-120px)]">
          {categories.map((category) => (
            <Collapsible
              key={category.name}
              open={expandedCategories.includes(category.name)}
              onOpenChange={() => toggleCategory(category.name)}
              className="border-b border-gray-200"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-md" />
                  <div className="text-left">
                    <div className="font-medium">{category.name}</div>
                    <div className="text-sm text-gray-500">{category.count} Ingredients</div>
                  </div>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${
                  expandedCategories.includes(category.name) ? 'transform rotate-180' : ''
                }`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0">
                <div className="flex flex-wrap gap-2">
                  {category.ingredients.map((ingredient) => (
                    <Button
                      key={ingredient}
                      variant="secondary"
                      className="bg-gray-100 hover:bg-gray-200"
                    >
                      {ingredient}
                    </Button>
                  ))}
                  {category.ingredients.length > 12 && (
                    <Button
                      variant="secondary"
                      className="bg-gray-100 hover:bg-gray-200"
                    >
                      +30 More
                    </Button>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

