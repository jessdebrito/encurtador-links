"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface ShortenFormProps {
  handleUrlShortned: () => void;
}

export default function ShortenForm({ handleUrlShortned }: ShortenFormProps) {
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
        }),
      });
      await response.json();
      setUrl("");
      handleUrlShortned();
    } catch (error) {
      console.error("Error shortening URL:", error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="space-y-4">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="h-12"
          type="url"
          placeholder="Colar aqui"
          required
        />
        <Button
          className="w-full p-2
           bg-violet-400 hover:bg-purple-400 uppercase"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Transformando Link...' : 'Encurtar Link'}
        </Button>
      </div>
    </form>
  );
}
