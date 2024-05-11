import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ReactCountryFlag from "react-country-flag";
import { ChevronRightIcon, LucideLoader, UniversityIcon } from "lucide-react";
import { components } from "@/lib/api/api";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Loader from "../loader";

export interface UniversityTableProps {
  universities: components["schemas"]["model.UniversityPreview"][];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  loading: boolean;
}

function pageItems(currentPage: number, totalPages: number): number[] {
  const items = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      items.push(i);
    }
  } else {
    if (currentPage <= 3) {
      items.push(1, 2, 3, 4, 5);
    } else if (currentPage >= totalPages - 2) {
      items.push(
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      items.push(
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      );
    }
  }
  return items;
}

export default function UniversityTable({
  universities,
  currentPage,
  totalPages,
  onPageChange,
  loading,
}: UniversityTableProps) {
  const router = useRouter();
  const pages = pageItems(currentPage, totalPages);
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <ul className="container mb-7 divide-y divide-gray-200 dark:divide-gray-700">
        {universities.map((u) => (
          <li key={u.id} className="pb-3 sm:pb-4">
            <Button
              variant="ghost"
              className="w-full py-7 pl-2 pr-4 flex gap-4 items-center justify-start"
              onClick={() => {
                router.push(`/uni/${u.id}`);
              }}
            >
              <div className="flex-shrink-0 flex-grow-0 w-10 h-10 flex justify-center items-center bg-gray-200 rounded-lg dark:bg-gray-700">
                <UniversityIcon />
              </div>
              <div className="flex-grow text-left">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {u.name}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  <ReactCountryFlag countryCode={u.country} />
                  &nbsp;{u.city}, {u.country}
                </p>
              </div>
              <ChevronRightIcon />
            </Button>
          </li>
        ))}
      </ul>
      <Pagination>
        <PaginationContent>
          <PaginationItem
            className={canPrev ? "cursor-pointer" : "cursor-not-allowed"}
            onClick={canPrev ? (_) => onPageChange(currentPage - 1) : undefined}
          >
            <PaginationPrevious />
          </PaginationItem>
          {pages.map((p) => (
            <PaginationItem
              className={
                currentPage !== p ? "cursor-pointer" : "pointer-events-none"
              }
              key={p.toString()}
            >
              <PaginationLink
                isActive={currentPage === p}
                onClick={currentPage === p ? (_) => onPageChange(p) : undefined}
              >
                {p.toString()}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem
            className={canNext ? "cursor-pointer" : "cursor-not-allowed"}
            onClick={canNext ? (_) => onPageChange(currentPage + 1) : undefined}
          >
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
