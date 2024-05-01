import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

export default function DocumentCard() {
  return (
    <a
      href="#"
      className="flex flex-col items-center bg-white border overflow-hidden border-gray-200 rounded-lg w-full md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <div className="flex justify-center h-32 w-24 rounded flex-shrink-0 flex-grow-0 bg-slate-300 m-2"></div>
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 flex gap-2 items-center text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          Klausur WS1718 - Lösung
          <Badge variant="default">PDF</Badge>
        </h5>
        <div className="flex gap-2">
          <Badge variant="outline">Exam</Badge>
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
      </div>
    </a>
  );
}
