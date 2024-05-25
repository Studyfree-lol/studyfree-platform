import { LucideLoader } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-96">
      <LucideLoader className="animate-spin rounded-full h-12 w-12 mb-1" />
      <span className="text-sm">Loading</span>
    </div>
  );
}
