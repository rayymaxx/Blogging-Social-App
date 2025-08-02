"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (email, password) => {
    // Mock login - replace with actual API call
    const mockUser = {
      id: "1",
      name: "Kim Jenny",
      email: email,
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "I love reading Fictions, Learning Languages and having fun.",
      location: "Soul, South Korea",
      following: 1200,
      followers: 5800,
      likes: 2200000,
    }
    setUser(mockUser)
    setIsAuthenticated(true)
    localStorage.setItem("token", "mock-jwt-token")
  }

  const signup = async (name, email, password) => {
    // Mock signup - replace with actual API call
    const mockUser = {
      id: "1",
      name: name,
      email: email,
      avatar: "/placeholder.svg?height=40&width=40",
      following: 0,
      followers: 0,
      likes: 0,
    }
    setUser(mockUser)
    setIsAuthenticated(true)
    localStorage.setItem("token", "mock-jwt-token")
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("token")
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      // Mock user restoration - replace with actual API call
      setUser({
        id: "1",
        name: "Kim Jenny",
        email: "kim@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        bio: "I love reading Fictions, Learning Languages and having fun.",
        location: "Soul, South Korea",
        following: 1200,
        followers: 5800,
        likes: 2200000,
      })
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
