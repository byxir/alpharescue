import { AtSymbolIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { api } from "~/utils/api";

interface FileObject {
  name: string;
  content: string;
}

const EmailReader = ({
  raffleBotUser,
  discordId,
  sessionToken,
  refetchFunction,
  showNotification,
}: {
  raffleBotUser: boolean;
  discordId: string | undefined;
  sessionToken: string | undefined;
  refetchFunction: () => Promise<void>;
  showNotification: () => void;
}) => {
  const [files, setFiles] = useState<FileObject[]>([]);
  const queryClient = useQueryClient();
  const { data, status } = useSession();

  const emailMutation = useMutation({
    mutationFn: () => {
      return axios.post(
        "https://alpharescue.online:3500/accounts",
        {
          discordId: discordId,
          userId: data?.user.id,
          type: "email",
          proxyType: "",
          accounts: files[0]?.content.split("\n"),
        },
        {
          headers: { Authorization: `Bearer ${String(sessionToken)}` },
        }
      );
    },
    onSuccess: async () => {
      showNotification();
      queryClient.removeQueries(["accounts"]);
      await refetchFunction();
      setFiles([]);
    },
    onError: () => {
      console.error("emails are not uploaded");
      setFiles([]);
    },
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const loadedFiles = await Promise.all(
      acceptedFiles.map(async (file) => {
        const fileContent = await file.text();
        return { name: file.name, content: fileContent };
      })
    );

    setFiles((prevFiles) => [...prevFiles, ...loadedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onDrop,
    accept: { "text/plain": [] },
  });

  useEffect(() => {
    if (raffleBotUser) {
      if (files.length > 0) {
        emailMutation.mutate();
      }
    } else {
      //error message not authenticated
    }
  }, [files]);

  return (
    <button
      {...getRootProps()}
      className={`grid h-52 justify-items-center rounded-xl border-2 border-dashed border-subline p-4 transition-colors ${
        raffleBotUser
          ? "cursor-pointer hover:bg-neutral-900"
          : "cursor-not-allowed"
      }`}
      disabled={!raffleBotUser}
    >
      <input {...getInputProps()} />
      <div className="mb-2 grid h-16 w-16 items-center">
        <AtSymbolIcon />
      </div>
      <p className="">Загрузить</p>
      <p className="">почты</p>
      <div className="mt-4 flex items-center space-x-1 text-subline">
        {isDragActive ? (
          <>
            <div className="text-xs">Дропайте почты сюда</div>
          </>
        ) : (
          <>
            <div className="h-6 w-6">
              <DocumentTextIcon />
            </div>
            <div className="text-xs">.txt файл</div>
          </>
        )}
      </div>
    </button>
  );
};

export default EmailReader;
