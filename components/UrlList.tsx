import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { CopyIcon, EyeIcon } from "lucide-react";

export default function UrlList() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Novos links gerados:</h2>
      <ul className="space-y-2">
        <li className="flex items-center gap-2 justify-between">
          <Link className="text-violet-400 hover:text-purple-400" target="_blank"
          href="https://tailwindcss.com/docs/font-size">
            https://tailwindcss.com/docs/font-size
          </Link>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-purple-400 hover:bg-muted"
            >
              <CopyIcon className="w-4 h-4" />
              <span className="sr-only">Copiar Link</span>
            </Button>
            <span className="flex items-center">
              <EyeIcon className="h-4 w-4" />
              100 visualizações
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}
