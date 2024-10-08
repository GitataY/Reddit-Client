import { RedditClient } from "./components/RedditClient";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Reddit Scope</h1>
      <RedditClient />
    </div>
  );
}
