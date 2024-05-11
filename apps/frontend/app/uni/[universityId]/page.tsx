"use client";
import AutoBreadcrumb from "@/components/auto-breadcrumb";
import { TypographyH1 } from "@/components/typographie";
import UniversityProfile from "@/components/university-profile";
import { api } from "@/lib/api";
import { components } from "@/lib/api/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function University() {
  const { universityId } = useParams();
  const [university, setUniversity] =
    useState<components["schemas"]["model.University"]>();
  const [loading, setLoading] = useState(false);

  const fetchUniversity = async (universityId: string) => {
    setLoading(true);
    const { error, data } = await api.GET("/universities/{universityId}", {
      params: {
        path: {
          universityId,
        },
      },
    });

    if (error || !data) {
      console.error(error ?? "Failed to fetch universities");
      setLoading(false);
      return;
    }

    setUniversity(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUniversity(
      Array.isArray(universityId) ? universityId[0] : universityId,
    );
  }, [universityId]);

  return (
    <div>
      <AutoBreadcrumb
        breadcrumbs={[
          { label: "Universities", href: "/uni" },
          { label: university?.name ?? "..." },
        ]}
      />
      <UniversityProfile university={university} loading={loading} />
    </div>
  );
}
