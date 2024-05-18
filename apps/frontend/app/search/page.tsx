"use client";
import { SearchInput } from "@/components/search-input";
import Typography from "@/components/typography";
import { Hits } from "react-instantsearch";

export default function Search() {
  return (
    <div>
      <Typography.H1>Search Courses</Typography.H1>
      <div className="py-4">
        <SearchInput />
        <Hits />
      </div>
    </div>
  );
}
