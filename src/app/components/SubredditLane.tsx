import { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, X, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function SubredditLane({ subreddit }: { subreddit: string }, onRemove: (subreddit: string) => void) {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`)
        if (!response.ok) throw new Error('Failed to fetch subreddit')
        const data = await response.json()
        setPosts(data.data.children)
      } catch (err) {
        setError
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [subreddit])

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h2 className="text-2xl font-bold">r/{subreddit}</h2>
          <Button variant="ghost" size="icon" onClick={() => onRemove(subreddit)}><X className="h-4 w-4" /></Button>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error.toString()}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h2 className="text-2xl font-bold">r/{subreddit}</h2>
        <Button variant="ghost" size="icon" onClick={() => onRemove(subreddit)}><X className="h-4 w-4" /></Button>
      </CardHeader>
      <CardContent>
        {posts.slice(0, 5).map((post) => (
          <div key={post.data.id} className="mb-4 pb-4 border-b last:mb-0 last:pb-0 last:border-b-0">
            <h3 className="font-semibold">{post.data.title}</h3>
            <p className="text-sm text-gray-500">Posted by u/{post.data.author}</p>
            <p className="text-sm">👍 {post.data.ups} | 💬 {post.data.num_comments}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}