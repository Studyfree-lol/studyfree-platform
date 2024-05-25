import CourseForm from "@/components/course-form";
import Typography from "@/components/typography";

export default function CreateCourse() {
  return (
    <div>
      <Typography.H1>Create Course</Typography.H1>
      <div className="container mx-auto mt-7">
        <CourseForm />
      </div>
    </div>
  );
}
