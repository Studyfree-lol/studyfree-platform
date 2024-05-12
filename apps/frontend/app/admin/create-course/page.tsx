import CourseForm from "@/components/course-form";
import { TypographyH1 } from "@/components/typographie";

export default function CreateCourse() {
  return (
    <div>
      <TypographyH1>Create Course</TypographyH1>
      <div className="container mx-auto mt-7">
        <CourseForm />
      </div>
    </div>
  );
}
