import { TypographyH1 } from "@/components/typographie";
import UniversityForm from "@/components/university-form";

export default function Search() {
  return (
    <div>
      <TypographyH1>Create new University</TypographyH1>
      <div className="container mx-auto mt-7">
        <UniversityForm />
      </div>
    </div>
  );
}
