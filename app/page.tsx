import ShortenerContainer from "@/components/ShortenerContainer";

export default function Home() {
  return (
    <main className="mx-auto  max-w-[90%] sm:max-w-3xl py-12 md:py-24 space-y-6 ">
      <div className="space-y-2 text-center items-center">
        <h1
          className="text-3xl md:text-4xl font-bold">
          Encurtador de Links
        </h1>
        <p className="md:text-base">
          Transforme seu link e compartilhe mais fácil.
        </p>
      </div>

      <ShortenerContainer />
    </main>
  );
}
