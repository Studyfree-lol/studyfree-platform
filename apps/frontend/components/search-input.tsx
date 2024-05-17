"use client";
import { SearchBox } from "react-instantsearch";
export function SearchInput() {
  return (
    <SearchBox
      classNames={{
        root: "bg-gray-100 p-1 border border-gray-200 rounded-lg focus-within:border-black",
        form: "flex items-center",
        submit: "w-6 h-full",
        input:
          "py-2 px-2 grow bg-transparent focus:outline-none transition duration-200 ease-in-outs",
      }}
      placeholder="Search course..."
    />
  );
}
