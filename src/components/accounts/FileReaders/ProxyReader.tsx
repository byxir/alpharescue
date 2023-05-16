/* eslint-disable @next/next/no-img-element */
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileObject {
  name: string;
  content: string;
}

const ProxyReader = ({
  raffleBotUser,
  exportFiles,
  showNotification,
}: {
  raffleBotUser: boolean;
  exportFiles: (_files: FileObject[]) => void;
  showNotification: () => void;
}) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const loadedFiles = await Promise.all(
      acceptedFiles.map(async (file) => {
        const fileContent = await file.text();
        return { name: file.name, content: fileContent };
      })
    );

    if (raffleBotUser) {
      exportFiles(loadedFiles);
      showNotification();
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onDrop,
    accept: { "text/plain": [] },
  });

  return (
    <button
      {...getRootProps()}
      className="grid h-36 w-full cursor-pointer items-center justify-items-center rounded-xl border-2 border-dashed border-subline transition-colors hover:bg-neutral-900"
    >
      <input {...getInputProps()} />
      <div className="flex items-center space-x-2 font-montserratBold text-subline">
        {isDragActive ? (
          <>
            <div className="">Дропайте прокси сюда</div>
          </>
        ) : (
          <>
            <div className="h-10 w-10">
              <DocumentTextIcon />
            </div>
            <div className="">.txt файл</div>
          </>
        )}
      </div>
    </button>
  );
};

export default ProxyReader;
