"use client";

import React, { useState, useEffect } from "react";
import { AddSubredditForm } from "./AddSubredditForm";
import { SubredditLane } from "./SubredditLane";

export function RedditClient() {
  const [lanes, setLanes] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("Redditlanes");
      return saved
        ? (JSON.parse(saved) as string[])
        : ["AskReddit", "worldnews"];
    }
    return ["AskReddit", "worldnews"];
  });

  useEffect(() => {
    localStorage.setItem("redditLanes", JSON.stringify(lanes));
  }, [lanes]);

  const addLane = (subreddit: string) => {
    if (subreddit && !lanes.includes(subreddit)) {
      setLanes([...lanes, subreddit]);
    }
  };

  const removeLane = (subreddit: string) => {
    setLanes(lanes.filter((lane) => lane !== subreddit));
  };

  return (
    <div>
      <AddSubredditForm onAdd={addLane} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {lanes.map((lane) => (
          <SubredditLane key={lane} subreddit={lane} />
        ))}
      </div>
    </div>
  );
}
