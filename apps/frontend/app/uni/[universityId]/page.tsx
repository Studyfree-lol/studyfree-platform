import { TypographyH1 } from "@/components/typographie";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Home() {
  return (
    <div>
      <Breadcrumb className="pb-7">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/uni">Universities</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Technische Universität München</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <TypographyH1>Technische Universität München</TypographyH1>
    </div>
  );
}
