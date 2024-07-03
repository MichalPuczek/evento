import "server-only";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import prisma from "./db";
import { capitalize } from "./utils";

// GET EVENTS
export const getEvents = unstable_cache(async (city: string, page = 1) => {
  const events = await prisma.event.findMany({
    where: {
      city: city === "all" ? undefined : capitalize(city),
    },
    orderBy: {
      date: "asc",
    },
    take: 6,
    skip: (page - 1) * 6,
  });

  let totalCount;
  if (city === "all") {
    totalCount = await prisma.event.count();
  } else {
    totalCount = await prisma.event.count({
      where: {
        city: capitalize(city),
      },
    });
  }

  return {
    events,
    totalCount,
  };
});

// GET EVENT
export const getEvent = unstable_cache(async (slug: string) => {
  const event = await prisma.event.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!event) {
    return notFound();
  }

  return event;
});
