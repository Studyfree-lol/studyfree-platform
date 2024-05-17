"use client";
import { InstantSearch } from "react-instantsearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const { searchClient } = instantMeiliSearch("http://localhost:7700", "");

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <InstantSearch searchClient={searchClient}>{children}</InstantSearch>;
}
