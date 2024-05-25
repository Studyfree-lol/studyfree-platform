import Typography from "@/components/typography";
import UniversityForm from "@/components/university-form";

export default function CreateUniversity() {
  return (
    <div>
      <Typography.H1>Create University</Typography.H1>
      <div className="container mx-auto mt-7">
        <UniversityForm />
      </div>
    </div>
  );
}
