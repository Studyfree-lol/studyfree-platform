"use client";

import * as React from "react";
import { Check, ChevronsUpDown, HeartCrackIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { components } from "@/lib/api/api";

async function fetchSearchResults(q: string) {
  return await api.POST("/search/universities", {
    params: {
      query: {
        q,
      },
    },
  });
}

export interface UniversitySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const emptyResult = {
  hits: [],
  limit: 0,
  processingTimeMs: 0,
  query: "",
};

export function UniversitySelector({
  value,
  onChange,
}: UniversitySelectorProps) {
  const [results, setResults] =
    useState<components["schemas"]["model.UniversitySearchResult"]>(
      emptyResult,
    );
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const updateSearchResults = async (q: string) => {
    setLoading(true);
    setResults(emptyResult);
    const { error, data } = await fetchSearchResults(q);
    if (error || !data) {
      console.error(error ?? "Failed to fetch universities");
      setLoading(false);
      return;
    }
    setResults(data);
    setLoading(false);
  };

  useEffect(() => {
    onChange("");
    if (!query) {
      setResults(emptyResult);
      return;
    }
    updateSearchResults(query);
  }, [onChange, query]);

  console.log(results.hits);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? results.hits.find((u) => u.id === value)?.title ?? value
            : "Select university..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[60vw] max-w-[600px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            value={query}
            onValueChange={(e) => setQuery(e)}
            placeholder="Search university..."
          />
          <CommandGroup
            heading={`Found ${results.hits.length} universities in ${results.processingTimeMs}ms`}
          >
            <CommandList>
              {results.hits.map((u) => (
                <CommandItem
                  className="mb-2"
                  key={u.id}
                  value={u.id}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === u.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {u.title}
                </CommandItem>
              ))}
            </CommandList>
            <CommandEmpty className="pb-2">
              {loading ? (
                <div className="space-y-2">
                  {Array.from({ length: 3 }, (_, n) => (
                    <Skeleton key={n} className="h-8 w-full" />
                  ))}
                </div>
              ) : (
                <div className="py-7 flex flex-col justify-center items-center opacity-50">
                  <HeartCrackIcon />
                  No universities found
                </div>
              )}
            </CommandEmpty>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
