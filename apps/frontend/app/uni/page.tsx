"use client";

import { TypographyH1 } from "@/components/typographie";
import UniversityTable from "@/components/university-table/university-table";
import { api } from "@/lib/api";
import { components } from "@/lib/api/api";
import { useEffect, useState } from "react";

export default function Uni() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [universities, setUniversities] = useState<
    components["schemas"]["model.UniversityPreview"][]
  >([]);
  const [loading, setLoading] = useState(false);

  const fetchUniversities = async (page: number) => {
    setLoading(true);
    const { error, data } = await api.GET("/universities", {
      params: {
        query: {
          page,
        },
      },
    });

    if (error || !data) {
      console.error(error ?? "Failed to fetch universities");
      setLoading(false);
      return;
    }

    setUniversities(data.items);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    fetchUniversities(page);
  }, [page]);

  return (
    <div>
      <TypographyH1>Universities</TypographyH1>
      <div className="mt-7">
        <UniversityTable
          universities={universities}
          loading={loading}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
