import React from "react";
import ShortenForm from "./ShortenForm";
import UrlList from "./UrlList";

export default function ShortenerContainer() {
  return (
    <div>
      <ShortenForm />
      <UrlList />
    </div>
  );
}
