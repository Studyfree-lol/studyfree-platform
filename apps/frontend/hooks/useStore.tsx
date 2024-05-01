import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  pinnedCourses: PinnedCourse[];
  addPinnedCourse: (course: PinnedCourse) => void;
  removePinnedCourse: (id: string) => void;
};

export interface PinnedCourse {
  courseId: string;
  universityId: string;
  title: string;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      pinnedCourses: [],
      addPinnedCourse: (course) =>
        set((state) => ({
          pinnedCourses: [...state.pinnedCourses, course],
        })),
      removePinnedCourse: (id) =>
        set((state) => ({
          pinnedCourses: state.pinnedCourses.filter(
            (course) => course.courseId !== id,
          ),
        })),
    }),
    {
      name: "store",
    },
  ),
);
