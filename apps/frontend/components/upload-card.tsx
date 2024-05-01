import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export default function UploadCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>🚀 Upload Docs</CardTitle>
        <CardDescription>
          Be a ⭐️ for other Students, Upload your document now
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" size="sm">
          Upload
        </Button>
      </CardContent>
    </Card>
  );
}
