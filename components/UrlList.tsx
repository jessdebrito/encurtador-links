"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Check, CopyIcon, EyeIcon } from "lucide-react";

type Url = {
  id: string;
  shortCode: string;
  originUrl: string;
  visits: number;
};

export default function UrlList() {
  const [urls, setUrls] = useState<Url[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [copyUrl, setCopyUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const shortenerUrl = (code: string) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/${code}}`;

  const fetchUrls = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/urls");
      const data = await response.json();
      setUrls(data);
    } catch (error) {
      console.error("Error fetching URLs", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyUrl = (code: string) => {
    const fullUrl = `${shortenerUrl(code)}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setCopyUrl(code);

      setTimeout(() => {
        setCopied(false);
        setCopyUrl("");
      }, 3000);
    });
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <ul className="space-y-2">
          {[1, 2, 3].map((num) => (
            <li
            key={num}
            className="flex items-center gap-2 rounded-md border bg-card p-4 text-card-foreground justify-between">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 bg-gray-200 rounded"></div>
              </div>
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="h-4 w-10 bg-gray-200 rounded"></div>
              </span>

            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Novos links:</h2>
      <ul className="space-y-2">
        {urls.map((url) => (
          <li
            key={url.id}
            className="flex items-center gap-2 justify-between bg-card rounded-md text-card-foreground border p-3"
          >
            <Link
              className="text-violet-400 hover:text-purple-400"
              target="_blank"
              href={`/${url.shortCode}`}
            >
              {shortenerUrl(url.shortCode)}
            </Link>
            <div className="flex items-center">
              <Button
                onClick={() => handleCopyUrl(url.shortCode)}
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-purple-400 hover:bg-muted"
              >
                {copied && copyUrl === url.shortCode ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <CopyIcon className="w-4 h-4" />
                )}

                <span className="sr-only">Copiar Link</span>
              </Button>
              <span className="flex items-center">
                <EyeIcon className="h-4 w-4 mr-1" />
                {url.visits} Clicks
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
