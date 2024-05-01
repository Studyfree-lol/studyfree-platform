"use client";
import {
  BookType,
  MoreVerticalIcon,
  PinIcon,
  PinOffIcon,
  PlusIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useStore } from "@/hooks/useStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Navigation() {
  const { pinnedCourses, removePinnedCourse } = useStore();
  return (
    <nav className="pr-2 pl-4 text-sm font-medium relative">
      <div className="flex justify-between items-center text-xs gap-3 rounded-lg px-3 py-2 text-muted-foreground cursor-default">
        <div className="flex gap-3 items-center">
          <PinIcon className="h-3 w-3" />
          Pinned Courses
        </div>
        <Button size="sm" variant="ghost">
          <PlusIcon className="h-3 w-3" />
        </Button>
      </div>

      {pinnedCourses.map((course) => (
        <Link
          key={course.courseId}
          className="w-full"
          href={`/uni/${course.universityId}/${course.courseId}`}
        >
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <BookType className="h-4 w-4 flex-shrink-0" />
            <div className="flex-grow whitespace-nowrap overflow-hidden text-ellipsis">
              {course.title}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                  <MoreVerticalIcon className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => removePinnedCourse(course.courseId)}
                >
                  <PinOffIcon className="mr-2 h-4 w-4" />
                  <span>Unpin</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Link>
      ))}
    </nav>
  );
}
