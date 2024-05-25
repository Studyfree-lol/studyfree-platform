"use client";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { components } from "@/lib/api/api";
import { BookIcon, ChevronRightIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";

async function fetchSearchResults(q: string) {
  return await api.POST("/search/courses", {
    params: {
      query: {
        q,
      },
    },
  });
}

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<
    components["schemas"]["model.CourseSearchResult"]
  >({
    hits: [],
    limit: 0,
    processingTimeMs: 0,
    query: "",
  });

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
    <div className="w-full">
      <Typography.H1>Search: {query}</Typography.H1>
      <div className="mt-8">
        {loading ? (
          <div className="space-y-8">
            {Array.from({ length: 4 }, (_, n) => (
              <div key={n} className="flex gap-2">
                <Skeleton className="h-10 w-10" />
                <div key={n} className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {results.hits.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full py-7 pl-2 pr-4 flex gap-4 items-center justify-start"
                onClick={() => {
                  router.push(`/uni/${item.universityId}/${item.id}`);
                }}
              >
                <div className="flex-shrink-0 flex-grow-0 w-10 h-10 flex justify-center items-center bg-gray-200 rounded-lg dark:bg-gray-700">
                  <BookIcon />
                </div>
                <div className="flex-grow text-left">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    <ReactCountryFlag countryCode={item.universityCountry} />
                    &nbsp;{item.universityName}
                  </p>
                </div>
                <ChevronRightIcon />
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
