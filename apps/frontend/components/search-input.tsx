"use client";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export function SearchInput() {
  const router = useRouter();

  const search = (formData: FormData) => {
    const query = formData.get("query")?.toString() ?? "";
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form className="w-full relative" action={search}>
      <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        name="query"
        className="left-0 right-0 appearance-none bg-background pl-8 shadow-none"
        placeholder="Search course..."
        type="search"
      />
    </form>
  );
}
