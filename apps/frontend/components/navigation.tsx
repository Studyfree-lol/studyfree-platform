"use client";
import {
  BookIcon,
  CirclePlusIcon,
  MoreVerticalIcon,
  PinIcon,
  PinOffIcon,
  PlusIcon,
  ShieldAlertIcon,
  TelescopeIcon,
  UniversityIcon,
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
import { Key, ReactNode } from "react";

export default function Navigation() {
  const { pinnedCourses, removePinnedCourse } = useStore();
  return (
    <nav className="pr-2 pl-4 text-sm font-medium relative">
      <NavigationSection
        title="Moderation"
        icon={<ShieldAlertIcon className="h-3 w-3 flex-shrink-0" />}
      >
        <NavigationItem
          title="Create University"
          icon={<CirclePlusIcon className="h-4 w-4 flex-shrink-0" />}
          href={`/admin/create-university`}
        />
        <NavigationItem
          title="Create Course"
          icon={<CirclePlusIcon className="h-4 w-4 flex-shrink-0" />}
          href={`/admin/create-course`}
        />
      </NavigationSection>

      <NavigationSection
        title="Pinned Courses"
        icon={<PinIcon className="h-3 w-3 flex-shrink-0" />}
        action={
          <Button size="sm" variant="ghost">
            <PlusIcon className="h-3 w-3" />
          </Button>
        }
      >
        {pinnedCourses.map((course) => (
          <NavigationItem
            key={course.courseId}
            title={course.title}
            icon={<BookIcon className="h-4 w-4 flex-shrink-0" />}
            href={`/course/${course.courseId}`}
            trailing={
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
            }
          />
        ))}
      </NavigationSection>
      <NavigationSection
        title="Explore"
        icon={<TelescopeIcon className="h-3 w-3 flex-shrink-0" />}
      >
        <NavigationItem
          title="All Universities"
          icon={<UniversityIcon className="h-4 w-4 flex-shrink-0" />}
          href={`/uni`}
        />
      </NavigationSection>
    </nav>
  );
}

function NavigationSection({
  title,
  icon,
  action,
  children,
}: {
  title: string;
  icon: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mb-4">
      <div className="flex text-gray-400 dark:text-gray-600 justify-between items-center text-xs gap-3 rounded-lg px-3 py-2 text-muted-foreground cursor-default">
        <div className="h-6 flex gap-3 items-center">
          {icon}
          {title}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function NavigationItem({
  key,
  title,
  icon,
  href,
  trailing,
}: {
  key?: Key;
  title: string;
  icon: ReactNode;
  href: string;
  trailing?: ReactNode;
}) {
  return (
    <Link key={key} className="w-full" href={href}>
      <div className="flex h-11 items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
        {icon}
        <div className="flex-grow whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </div>
        {trailing}
      </div>
    </Link>
  );
}
