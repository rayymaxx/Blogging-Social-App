import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share, Bookmark } from "lucide-react"
import Link from "next/link"

export function BlogCard({ post }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video overflow-hidden">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>

      <CardContent className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{post.author.name}</span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">{post.date}</span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">{post.readTime}</span>
        </div>

        <h3 className="mb-2 line-clamp-2 text-lg font-semibold">
          <Link href={`/post/${post.id}`} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>

        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{post.summary}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
              <Heart className="h-4 w-4" />
              <span className="text-xs">{post.likes}</span>
            </Button>

            <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{post.comments}</span>
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
