"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function ShortenForm() {
  const [url, setUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(url);
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
        >
          Encurtar
        </Button>
      </div>
    </form>
  );
}
