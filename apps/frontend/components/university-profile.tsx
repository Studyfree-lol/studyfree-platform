import { components } from "@/lib/api/api";
import { TypographyH1 } from "./typographie";
import Loader from "./loader";

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
    </div>
  );
}
