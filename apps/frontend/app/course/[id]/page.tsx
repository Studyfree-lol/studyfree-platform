import DocumentCard from "@/components/document-card";
import { FilterDropdown } from "@/components/filter-dropdown";
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
import { FilterIcon, PinIcon, Settings } from "lucide-react";

export default function Course() {
  return (
    <div>
      <Breadcrumb className="pb-7">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Universities</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">
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
        <Button variant="ghost" size="icon" className="ml-3">
          <PinIcon className="h-5 w-5" />
        </Button>
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
