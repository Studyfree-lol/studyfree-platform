import Typography from '@/components/typography';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { HeartIcon, UploadCloudIcon } from 'lucide-react';

export default function Search() {
  return (
    <div>
      <Typography.H1>Upload Documents</Typography.H1>

      <Alert className="my-7">
        <HeartIcon color="purple" className="h-4 w-4" />
        <AlertTitle>Welcome Friend 👋🏽</AlertTitle>
        <AlertDescription>
          As you might already noticed, this is a non-profit student project.
          <br />
          This means, we will <b>never sell your data or documents</b> and do
          out best to distribute your documents to help as many other students
          as possible ✨
        </AlertDescription>
      </Alert>

      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloudIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-2" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Only PDF files are supported
            </p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>
    </div>
  );
}
