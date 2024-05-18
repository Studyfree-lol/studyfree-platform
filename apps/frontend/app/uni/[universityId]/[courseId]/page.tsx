'use client';
import AutoBreadcrumb from '@/components/auto-breadcrumb';
import DocumentCard from '@/components/document-card';
import { FilterDropdown } from '@/components/filter-dropdown';
import PinButton from '@/components/pin-button';
import Typography from '@/components/typography';
import { Button } from '@/components/ui/button';
import { FilterIcon } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function Course() {
  const { universityId } = useParams();
  return (
    <div>
      <AutoBreadcrumb
        breadcrumbs={[
          { label: 'Universities', href: '/uni' },
          {
            label: 'Technische Universität München',
            href: `/uni/${universityId}`,
          },
          { label: 'Einführung in die Informatik' },
        ]}
      />

      <Typography.H1>
        Einführung in die Informatik
        <PinButton
          course={{
            universityId: 'tum123',
            courseId: 'abc',
            title: 'Einführung in die Informatik',
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
