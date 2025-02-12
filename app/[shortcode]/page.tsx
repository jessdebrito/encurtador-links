import prisma from "@/lib/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

interface RedirectPageProps {
  params: Promise<{ shortcode: string }>;
}
export default async function RedirectPage({ params }: RedirectPageProps) {
  const resolvedParams = await params;
  const { shortcode } = resolvedParams;

  const url = await prisma.url.findUnique({
    where: { shortCode: shortcode },
  });
  if (!url) {
    return (
      <div className="text-center grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <p className="text-medium font-semibold text-violet-400 sm:text-3xl">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
          Página não encontrada
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Desculpe, o URL requerido não foi encontrado em nossos servidores.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="https://linkcurto.vercel.app/"
            className="rounded-md bg-violet-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-purple-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Retornar para a Home
          </a>
          <a href="https://www.linkedin.com/in/jessica-de-brito/" className="text-sm font-semibold text-gray-900">
            Entrar em contato <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    );
  }

  await prisma.url.update({
    where: {
      id: url.id,
    },
    data: { visits: { increment: 1 } },
  });

  redirect(url.originalUrl);
}
