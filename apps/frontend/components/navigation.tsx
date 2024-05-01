"use client";
import { BookType, MoreVerticalIcon, PinIcon, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useStore } from "@/hooks/useStore";

export default function Navigation() {
  const { pinnedCourses } = useStore();
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
        <Link key={course.id} className="w-full" href="/course/eidi">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <BookType className="h-4 w-4 flex-shrink-0" />
            <div className="flex-grow whitespace-nowrap overflow-hidden text-ellipsis">
              {course.title}
            </div>
            <Button size="sm" variant="ghost">
              <MoreVerticalIcon className="h-3 w-3" />
            </Button>
          </div>
        </Link>
      ))}
    </nav>
  );
}
