import { BookIcon, ChevronRightIcon, UniversityIcon } from "lucide-react";
import { components } from "@/lib/api/api";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export interface UniversityTableProps {
  university: components["schemas"]["model.University"];
}

export default function CourseTable({ university }: UniversityTableProps) {
  const router = useRouter();

  return (
    <div>
      <ul className="container mb-7">
        {university.courses.map((c) => (
          <li key={c.id} className="pb-3 sm:pb-4">
            <Button
              variant="ghost"
              className="w-full py-7 pl-2 pr-4 flex gap-4 items-center justify-start"
              onClick={() => {
                router.push(`/uni/${university.id}/${c.id}`);
              }}
            >
              <div className="flex-shrink-0 flex-grow-0 w-10 h-10 flex justify-center items-center bg-gray-200 rounded-lg dark:bg-gray-700">
                <BookIcon />
              </div>
              <div className="flex-grow text-left">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {c.name}
                </p>
                <p className="text-sm flex items-center text-gray-500 truncate dark:text-gray-400">
                  <UniversityIcon className="h-4 w-4" />
                  &nbsp;{university.name}
                </p>
              </div>
              <ChevronRightIcon />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
