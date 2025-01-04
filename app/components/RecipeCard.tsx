import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RecipeCardProps {
  id: number
  title: string
  image: string
  category: string
  prepTime: string
}

export default function RecipeCard({ id, title, image, category, prepTime }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${id}`}>
      <Card className="overflow-hidden transition-colors duration-300 dark:bg-gray-800">
        <div className="relative h-48">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4 dark:text-gray-200">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <div className="flex justify-between items-center">
            <Badge>{category}</Badge>
            <span className="text-sm text-gray-500 dark:text-gray-400">{prepTime}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

