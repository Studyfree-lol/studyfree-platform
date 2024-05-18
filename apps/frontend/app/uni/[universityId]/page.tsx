import AutoBreadcrumb from '@/components/auto-breadcrumb';
import Typography from '@/components/typography';

export default function Home() {
  return (
    <div>
      <AutoBreadcrumb
        breadcrumbs={[
          { label: 'Universities', href: '/uni' },
          { label: 'Technische Universität München' },
        ]}
      />
      <Typography.H1>Technische Universität München</Typography.H1>
    </div>
  );
}
