"use client"

import { Home, PlusCircle, User, FileText, Bell } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"

const categories = [
  { name: "Fiction", color: "bg-purple-500" },
  { name: "pulp", color: "bg-blue-500" },
  { name: "Gis", color: "bg-green-500" },
  { name: "math", color: "bg-yellow-500" },
  { name: "Kpop", color: "bg-pink-500" },
  { name: "HMI", color: "bg-red-500" },
]

const featuredSections = [
  { name: "Anime", image: "/placeholder.svg?height=100&width=200&text=Anime", color: "bg-green-500" },
  { name: "Music", image: "/placeholder.svg?height=100&width=200&text=Music", color: "bg-green-500" },
  { name: "Games", image: "/placeholder.svg?height=100&width=200&text=Games", color: "bg-green-500" },
  { name: "Books", image: "/placeholder.svg?height=100&width=200&text=Books", color: "bg-green-500" },
]

export function AppSidebar() {
  const { isAuthenticated } = useAuth()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
            <span className="text-sm font-bold text-primary-foreground">B</span>
          </div>
          <span className="text-xl font-bold text-primary">BLOG</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    <span>All Posts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {isAuthenticated && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard">
                        <User className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/create-post">
                        <PlusCircle className="h-4 w-4" />
                        <span>Create Post</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/my-posts">
                        <FileText className="h-4 w-4" />
                        <span>My Posts</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/notifications">
                        <Bell className="h-4 w-4" />
                        <span>Notifications</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex flex-wrap gap-2 px-2">
              {categories.map((category) => (
                <span key={category.name} className={`rounded-full px-3 py-1 text-xs text-white ${category.color}`}>
                  {category.name}
                </span>
              ))}
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs">+</span>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <div className="space-y-2 px-2">
              {featuredSections.map((section) => (
                <div key={section.name} className="relative overflow-hidden rounded-lg" style={{ height: "80px" }}>
                  <img
                    src={section.image || "/placeholder.svg"}
                    alt={section.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-2 left-2">
                    <span className="text-sm font-medium text-white">{section.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
