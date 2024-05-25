"use client";
import AutoBreadcrumb from "@/components/auto-breadcrumb";
import DocumentCard from "@/components/document-card";
import { FilterDropdown } from "@/components/filter-dropdown";
import PinButton from "@/components/pin-button";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { components } from "@/lib/api/api";
import { FilterIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const fetchCourse = (courseId: string) =>
  api.GET("/courses/{courseId}", {
    params: {
      path: {
        courseId,
      },
    },
  });

export default function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<
    components["schemas"]["model.Course"] | null
  >(null);
  const [loading, setLoading] = useState(true);

  const updateCourse = async (courseId: string) => {
    setLoading(true);
    const { error, data } = await fetchCourse(courseId);

    if (error || !data) {
      console.error(error ?? "Failed to fetch universities");
      setLoading(false);
      return;
    }

    setCourse(data);
    setLoading(false);
  };

  useEffect(() => {
    updateCourse(Array.isArray(courseId) ? courseId[0] : courseId);
  }, [courseId]);

  if (loading) {
    return (
      <div>
        <Skeleton className="h-6 w-[400px]" />
        <Skeleton className="mt-4 h-12 w-2/3" />
        <Skeleton className="mt-4 h-6 w-[120px]" />
      </div>
    );
  }

  if (!course) {
    return (
      <div>
        <AutoBreadcrumb
          breadcrumbs={[
            { label: "Universities", href: "/uni" },
            { label: "Not Found" },
          ]}
        />
        <Typography.H1>Course Not Found</Typography.H1>
      </div>
    );
  }

  return (
    <div>
      <AutoBreadcrumb
        breadcrumbs={[
          { label: "Universities", href: "/uni" },
          {
            label: course.university.name,
            href: `/uni/${course.university.id}`,
          },
          { label: course.name },
        ]}
      />

      <Typography.H1>
        {course.name}
        <PinButton
          course={{
            courseId: course.id,
            title: course.name,
          }}
        />
      </Typography.H1>

      <section className="mt-8">
        <div className="flex justify-between items-center border-b-2 pb-2">
          <Typography.H2>Documents</Typography.H2>
          <FilterDropdown>
            <Button variant="outline">
              <FilterIcon className="h-5 w-5 mr-2" />
              Filter
            </Button>
          </FilterDropdown>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4 py-7">
        <DocumentCard />
        <DocumentCard />
        <DocumentCard />
        <DocumentCard />
        <DocumentCard />
      </div>
    </div>
  );
}
