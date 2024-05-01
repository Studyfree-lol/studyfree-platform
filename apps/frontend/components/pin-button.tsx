"use client";
import { PinnedCourse, useStore } from "@/hooks/useStore";
import { Button } from "./ui/button";
import { PinIcon, PinOffIcon } from "lucide-react";

export default function PinButton({ course }: { course: PinnedCourse }) {
  const { pinnedCourses, addPinnedCourse, removePinnedCourse } = useStore();

  const isSelected = pinnedCourses.some((c) => c.id === course.id);

  const togglePinned = () => {
    if (isSelected) {
      removePinnedCourse(course.id);
    } else {
      addPinnedCourse(course);
    }
  };

  return (
    <Button onClick={togglePinned} variant="ghost" size="icon" className="ml-3">
      {isSelected ? (
        <PinOffIcon className="h-5 w-5" />
      ) : (
        <PinIcon className="h-5 w-5" />
      )}
    </Button>
  );
}
