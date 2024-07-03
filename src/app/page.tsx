import Link from "next/link";
// Components
import SearchForm from "@/components/search-form";
import H1 from "@/components/h1";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-3 pt-36">
      <H1>Trouvez des événements autour de vous</H1>

      <p className="mb-12 mt-7 text-2xl lg:text-3xl opacity-75">
        Parcourez plus de{" "}
        <span className="font-bold italic underline text-accent">10,000</span>{" "}
        événements dans le monde
      </p>

      <SearchForm />

      <section className="mt-4 flex gap-x-4 text-sm text-white/50">
        <p>Tendance:</p>
        <div className="space-x-2 font-semibold">
          <Link href="/events/austin">Austin</Link>
          <Link href="/events/seattle">Seattle</Link>
        </div>
      </section>
    </main>
  );
}
