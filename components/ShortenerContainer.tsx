"use client";

import React, { useState } from "react";
import ShortenForm from "./ShortenForm";
import UrlList from "./UrlList";

export default function ShortenerContainer() {
  const [refreshKey, setRefreshKey] = useState(0);
  const handleUrlShortned = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <ShortenForm handleUrlShortned={handleUrlShortned} />
      <UrlList key={refreshKey}/>
    </div>
  );
}
