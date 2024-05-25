"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
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

export function UniversitySelector({
  value,
  onChange,
}: UniversitySelectorProps) {
  const [results, setResults] = useState<
    components["schemas"]["model.UniversitySearchResult"]
  >({
    hits: [],
    limit: 0,
    processingTimeMs: 0,
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const updateSearchResults = async (q: string) => {
    setLoading(true);
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
    if (!query) return;
    console.log("Search query:", query);
    updateSearchResults(query);
  }, [query]);

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
      <PopoverContent className="w-[620px] p-0">
        <Command>
          <CommandInput
            onValueChange={setQuery}
            placeholder="Search university..."
          />
          <CommandEmpty>No university found.</CommandEmpty>
          <CommandGroup>
            {results.hits.map((u) => (
              <CommandItem
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
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
