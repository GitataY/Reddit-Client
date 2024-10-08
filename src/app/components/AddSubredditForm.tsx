import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function AddSubredditForm({
  onAdd,
}: {
  onAdd: (subreddit: string) => void;
}) {
  const [newSubreddit, setNewSubreddit] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!newSubreddit.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.reddit.com/r/${newSubreddit}.json`
      );
      if (!response.ok) throw new Error("Subreddit not found");
      const data = await response.json();
      if (data && data.data && data.data.children.length > 0) {
        onAdd(newSubreddit);
        setNewSubreddit("");
      } else {
        throw new Error("Subreddit exists but has no posts");
      }
    } catch (error) {
      setError;
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={newSubreddit}
        onChange={(e) => setNewSubreddit(e.target.value)}
        placeholder="Enter subreddit name"
        disabled={loading}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Lane"}
      </Button>
      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
