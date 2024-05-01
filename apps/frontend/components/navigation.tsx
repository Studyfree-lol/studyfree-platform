import { PinIcon, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function Navigation() {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
        <PinIcon className="h-4 w-4" />
        Pinned Courses
        <Button variant="ghost" size="icon">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
}
