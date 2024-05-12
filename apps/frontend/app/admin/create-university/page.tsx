import { TypographyH1 } from "@/components/typographie";
import UniversityForm from "@/components/university-form";

export default function CreateUniversity() {
  return (
    <div>
      <TypographyH1>Create University</TypographyH1>
      <div className="container mx-auto mt-7">
        <UniversityForm />
      </div>
    </div>
  );
}
