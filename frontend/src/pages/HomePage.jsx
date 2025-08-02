"use client"

import { useState } from "react"
import { Header } from "../components/header"
import { AppSidebar } from "../components/app-sidebar"
import { BlogCard } from "../components/blog-card"
import { Button } from "../components/ui/button"

const mockPosts = [
  {
    id: "1",
    title: "Cultural Obsession: The Global Fascination with Anime",
    summary:
      "Explore how anime has captivated audiences worldwide, influencing fashion, beauty, and social connections.",
    image: "/placeholder.svg?height=200&width=300&text=Anime+Culture",
    author: {
      name: "Yara Samson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "01 August 2023",
    readTime: "5 min read",
    likes: 124,
    comments: 23,
    views: 1500,
  },
  // ... other posts
]

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <AppSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">Welcome to our Blog Platform</h1>
            <p className="text-muted-foreground">
              Discover amazing stories, insights, and ideas from our community of writers.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="outline">Load More Posts</Button>
          </div>
        </main>
      </div>
    </div>
  )
}
