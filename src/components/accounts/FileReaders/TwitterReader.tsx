/* eslint-disable @next/next/no-img-element */
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileObject {
  name: string;
  content: string;
}

const TwitterReader = ({
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
  const queryClient = useQueryClient();
  const [files, setFiles] = useState<FileObject[]>([]);

  function splitStringInto2DArray(str: string): string[][] {
    const rows = str.split("\n");
    const result: string[][] = [];

    for (const row of rows) {
      result.push(row.split(":"));
    }

    return result;
  }

  const { data, status } = useSession();

  const twitterMutation = useMutation({
    mutationFn: () => {
      return axios.post(
        "https://alpharescue.online:3500/accounts",
        {
          discordId: discordId,
          userId: data?.user.id,
          type: "twitter",
          proxyType: "ACTIVE",
          accounts: splitStringInto2DArray(
            files[0] ? files[0].content : "notFound"
          ),
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
      console.log("twitters are uploaded successfully");
      console.log(
        discordId,
        data?.user.id,
        sessionToken,
        files[0]?.content.split("\n").forEach((s) => s.split(":"))
      );
      setFiles([]);
    },
    onError: () => {
      console.error("twitters are not uploaded");
      console.log(
        discordId,
        data?.user.id,
        sessionToken,
        files[0]?.content.split("\n").forEach((s) => s.split(":"))
      );
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
        twitterMutation.mutate();
      }
    } else {
      //error message not authenticated
    }
  }, [files]);

  return (
    <button
      {...getRootProps()}
      className={`grid h-52 justify-items-center rounded-xl border-2 border-dashed border-subline p-4 transition-colors ${
        data?.user.raffleBotUser && status === "authenticated"
          ? "cursor-pointer hover:bg-neutral-900"
          : "cursor-not-allowed"
      }`}
      disabled={!(data?.user.raffleBotUser && status === "authenticated")}
    >
      <input {...getInputProps()} />
      <div className="mb-2 grid h-16 w-16 items-center">
        <img src="../../../twitter.png" alt="" className="w-16" />
      </div>
      <p className="">Загрузить</p>
      <p className="">твиттеры</p>
      <div className="mt-4 flex items-center space-x-1 text-subline">
        {isDragActive ? (
          <>
            <div className="text-xs">Дропайте твиттеры сюда</div>
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

export default TwitterReader;
