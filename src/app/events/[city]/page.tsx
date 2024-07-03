import { Suspense } from "react";
import { Metadata } from "next";
import { capitalize } from "@/lib/utils";
import { z } from "zod";
// Components
import EventsList from "@/components/events-list";
import H1 from "@/components/h1";
import Loading from "./loading";

// TS
type ParamsProps = {
  params: {
    city: string;
  };
};

type SearchParamsProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

type EventsPageProps = ParamsProps & SearchParamsProps;

// Metadada
export function generateMetadata({ params }: ParamsProps): Metadata {
  const city = params.city;
  return {
    title: city === "all" ? "All events" : `Events in ${capitalize(city)}`,
  };
}

// Validation
const pageNumberSchema = z.coerce.number().int().positive().optional();

export default function EventsPage({ params, searchParams }: EventsPageProps) {
  const city = params.city;
  const parsedPage = pageNumberSchema.safeParse(searchParams.page);
  if (!parsedPage.success) {
    throw new Error("Invalid page number");
  }
  const page = searchParams.page || 1;

  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[100vh]">
      <H1 className="mb-28">
        {city === "all" && "Tous les évènements"}
        {city !== "all" && `Événements à ${capitalize(city)}`}
      </H1>

      <Suspense key={city + parsedPage.data} fallback={<Loading />}>
        <EventsList city={city} page={parsedPage.data} />
      </Suspense>
    </main>
  );
}
