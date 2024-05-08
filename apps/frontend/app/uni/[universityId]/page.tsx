import AutoBreadcrumb from '@/components/auto-breadcrumb';
import { TypographyH1 } from '@/components/typographie';

export default function Home() {
  return (
    <div>
      <AutoBreadcrumb
        breadcrumbs={[
          { label: 'Universities', href: '/uni' },
          { label: 'Technische Universität München' },
        ]}
      />
      <TypographyH1>Technische Universität München</TypographyH1>
    </div>
  );
}
