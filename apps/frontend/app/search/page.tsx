"use client";
import { SearchInput } from "@/components/search-input";
import { TypographyH1 } from "@/components/typographie";

export default function Search() {
  return (
    <div>
      <TypographyH1>Search Courses</TypographyH1>
      <div className="py-4">
        <SearchInput />
      </div>
    </div>
  );
}
