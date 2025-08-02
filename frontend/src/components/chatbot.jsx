"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, X, Send, Paperclip, Smile, Search, Trash2 } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Kim Jenny loves reading fictions, learning languages and having fun.",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      // Mock AI response - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: "Thank You :)",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
            <MessageCircle className="h-4 w-4" />
          </div>
          <CardTitle className="text-lg">Chatbot</CardTitle>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:bg-white/20">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:bg-white/20">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 text-primary-foreground hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-32 bg-primary/10 border-r flex flex-col">
          <div className="p-2 space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8">
              New Chat
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8 bg-primary/20">
              Recent Chats
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8">
              Rephrase text...
            </Button>
          </div>

          <div className="mt-auto p-2">
            <div className="flex items-center gap-2 p-2 bg-white rounded text-xs">
              <Avatar className="h-6 w-6">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xs">{user?.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <span className="truncate">{user?.name || "User"}</span>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "bot" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">AI</AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`max-w-[80%] rounded-lg p-3 text-sm ${
                    message.sender === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>

                {message.sender === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">{user?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">AI</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 text-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="Type a new message here"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pr-20"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Paperclip className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Smile className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Button
                onClick={sendMessage}
                size="icon"
                disabled={!inputMessage.trim() || isLoading}
                className="h-10 w-10"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
