import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

export default function UploadCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>🚀 Upload Docs</CardTitle>
        <CardDescription>
          Upload your document and be a ⭐️ for other Students
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href="/upload">
          <Button className="w-full" size="sm">
            Upload
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
