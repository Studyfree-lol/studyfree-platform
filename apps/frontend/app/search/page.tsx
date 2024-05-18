"use client";
import { SearchInput } from "@/components/search-input";
import Typography from "@/components/typography";

export default function Search() {
  return (
    <div>
      <Typography.H1>Search Courses</Typography.H1>
      <div className="py-4">
        <SearchInput />
      </div>
    </div>
  );
}
