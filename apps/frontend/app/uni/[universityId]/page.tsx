"use client";
import AutoBreadcrumb from "@/components/auto-breadcrumb";
import Typography from "@/components/typography";
import { Skeleton } from "@/components/ui/skeleton";
import UniversityProfile from "@/components/university-profile";
import { api } from "@/lib/api";
import { components } from "@/lib/api/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const fetchUniversity = (universityId: string) =>
  api.GET("/universities/{universityId}", {
    params: {
      path: {
        universityId,
      },
    },
  });

export default function University() {
  const { universityId } = useParams();
  const [university, setUniversity] = useState<
    components["schemas"]["model.University"] | null
  >(null);
  const [loading, setLoading] = useState(true);

  const updateUniversity = async (universityId: string) => {
    setLoading(true);
    const { error, data } = await fetchUniversity(universityId);

    if (error || !data) {
      console.error(error ?? "Failed to fetch universities");
      setLoading(false);
      return;
    }

    setUniversity(data);
    setLoading(false);
  };

  useEffect(() => {
    updateUniversity(
      Array.isArray(universityId) ? universityId[0] : universityId,
    );
  }, [universityId]);

  if (loading) {
    return (
      <div>
        <Skeleton className="h-6 w-[400px]" />
        <Skeleton className="mt-4 h-12 w-2/3" />
        <Skeleton className="mt-4 h-6 w-[120px]" />
      </div>
    );
  }

  if (!university) {
    return (
      <div>
        <AutoBreadcrumb
          breadcrumbs={[
            { label: "Universities", href: "/uni" },
            { label: "Not Found" },
          ]}
        />
        <Typography.H1>University Not Found</Typography.H1>
      </div>
    );
  }

  return (
    <div>
      <AutoBreadcrumb
        breadcrumbs={[
          { label: "Universities", href: "/uni" },
          { label: university.name },
        ]}
      />
      <UniversityProfile university={university} loading={loading} />
    </div>
  );
}
