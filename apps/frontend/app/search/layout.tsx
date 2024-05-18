"use client";
import { InstantSearch } from "react-instantsearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const { searchClient } = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_URL ?? "",
  process.env.NEXT_PUBLIC_MEILISEARCH_TOKEN,
);

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <InstantSearch indexName="courses" searchClient={searchClient}>
      {children}
    </InstantSearch>
  );
}
