import Typography from '@/components/typography';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

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
      <Typography.H1>Technische Universität München</Typography.H1>
    </div>
  );
}
