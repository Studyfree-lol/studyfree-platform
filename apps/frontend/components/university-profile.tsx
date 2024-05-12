import { components } from "@/lib/api/api";
import { TypographyH1, TypographyH2 } from "./typographie";
import Loader from "./loader";
import CourseTable from "./course-table";

export interface UniversityProfileProps {
  university?: components["schemas"]["model.University"];
  loading: boolean;
}

export default function UniversityProfile({
  university,
  loading,
}: UniversityProfileProps) {
  if (loading) {
    return <Loader />;
  }

  if (!university) {
    return (
      <div>
        <TypographyH1>Not Found</TypographyH1>
      </div>
    );
  }

  return (
    <div>
      <TypographyH1>{university.name}</TypographyH1>
      <div className="mt-7">
        <div className="mb-4">
          <TypographyH2>Courses</TypographyH2>
        </div>
        <CourseTable university={university} />
      </div>
    </div>
  );
}
