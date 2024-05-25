import { components } from "@/lib/api/api";
import Loader from "./loader";
import CourseTable from "./course-table";
import Typography from "./typography";

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
        <Typography.H1>Not Found</Typography.H1>
      </div>
    );
  }

  return (
    <div>
      <Typography.H1>{university.name}</Typography.H1>
      <div className="mt-7">
        <div className="mb-4">
          <Typography.H2>Courses</Typography.H2>
        </div>
        <CourseTable university={university} />
      </div>
    </div>
  );
}
