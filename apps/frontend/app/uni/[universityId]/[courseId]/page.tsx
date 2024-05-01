"use client";
import DocumentCard from "@/components/document-card";
import { FilterDropdown } from "@/components/filter-dropdown";
import PinButton from "@/components/pin-button";
import { TypographyH1, TypographyH2 } from "@/components/typographie";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { useParams } from "next/navigation";

export default function Course() {
  const { universityId } = useParams();
  return (
    <div>
      <Breadcrumb className="pb-7">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/uni">Universities</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/uni/${universityId}`}>
              Technische Universität München
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Einführung in die Informatik</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <TypographyH1>
        Einführung in die Informatik
        <PinButton
          course={{
            universityId: "tum123",
            courseId: "abc",
            title: "Einführung in die Informatik",
          }}
        />
      </TypographyH1>

      <section className="mt-8">
        <div className="flex justify-between items-center border-b-2 pb-2">
          <TypographyH2>Documents</TypographyH2>
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
