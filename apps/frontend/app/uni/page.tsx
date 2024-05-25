"use client";

import Typography from "@/components/typography";
import UniversityTable from "@/components/university-table";
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
      <Typography.H1>Universities</Typography.H1>
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
