import { ReactNode } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

type BreadcrumbData = {
  label: string;
  href?: string;
};

type Props = {
  breadcrumbs: BreadcrumbData[];
};

export default function AutoBreadcrumb({ breadcrumbs }: Props) {
  return (
    <Breadcrumb className="pb-7">
      <BreadcrumbList>
        {breadcrumbs.reduce<ReactNode[]>((acc, breadcrumb, index) => {
          if (index < breadcrumbs.length - 1) {
            return [
              ...acc,
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={breadcrumb.href}>
                  {breadcrumb.label}
                </BreadcrumbLink>
              </BreadcrumbItem>,
              <BreadcrumbSeparator key={`${index}-separator`} />,
            ];
          } else {
            return [
              ...acc,
              <BreadcrumbItem key={index}>
                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
              </BreadcrumbItem>,
            ];
          }
        }, [])}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
