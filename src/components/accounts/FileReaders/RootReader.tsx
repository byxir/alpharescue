/* eslint-disable @next/next/no-img-element */
import {
  AtSymbolIcon,
  DocumentTextIcon,
  ServerStackIcon,
} from "@heroicons/react/24/outline";
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

const RootReader = ({
  raffleBotUser,
  discordId,
  sessionToken,
  showNotification,
  readerType,
}: {
  raffleBotUser: boolean;
  discordId: string | undefined;
  sessionToken: string | undefined;
  showNotification: () => void;
  readerType: "discord" | "twitter" | "metamask" | "proxy" | "email";
}) => {
  const [files, setFiles] = useState<FileObject[]>([]);

  const queryClient = useQueryClient();

  function splitStringInto2DArray(str: string): string[][] {
    const rows = str.split("\n");
    const result: string[][] = [];

    for (const row of rows) {
      result.push(row.split(":"));
    }

    return result;
  }

  const { data, status } = useSession();

  const addAccountsMutation = useMutation({
    mutationFn: () => {
      showNotification();
      return axios.post(
        "https://alpharescue.online/accounts",
        {
          discordId: discordId,
          userId: data?.user.id,
          type: readerType,
          proxyType: "",
          accounts: files[0]?.content.split("\n"),
        },
        {
          headers: { Authorization: `Bearer ${String(sessionToken)}` },
        }
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries(["accounts"]);
      setFiles([]);
    },
    onError: () => {
      console.error("wallets are not uploaded");
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
        addAccountsMutation.mutate();
      }
    } else {
      //error message not authenticated
    }
  }, [files]);

  return (
    <button
      {...getRootProps()}
      className={`grid h-52 w-44 justify-items-center rounded-xl border-2 border-dashed border-subline p-4 transition-colors ${
        data?.user.raffleBotUser && status === "authenticated"
          ? "cursor-pointer hover:bg-neutral-900"
          : "cursor-not-allowed"
      }`}
      disabled={!(data?.user.raffleBotUser && status === "authenticated")}
    >
      <input {...getInputProps()} />
      <div className="mb-2 grid h-16 w-16 items-center">
        {(readerType === "twitter" ||
          readerType === "metamask" ||
          readerType === "discord") && (
          <img src={`../../../${readerType}.png`} alt="" className="w-16" />
        )}
        {readerType === "proxy" && <ServerStackIcon />}
        {readerType === "email" && <AtSymbolIcon />}
      </div>
      <p className="">Загрузить</p>
      {readerType === "twitter" && <p className="">твиттеры</p>}
      {readerType === "discord" && <p className="">дискорды</p>}
      {readerType === "metamask" && <p className="">кошельки</p>}
      {readerType === "proxy" && <p className="">прокси</p>}
      {readerType === "email" && <p className="">почты</p>}
      <div className="mt-4 flex items-center space-x-1 text-subline">
        {isDragActive ? (
          <>
            <div className="text-xs">Дропайте кошельки сюда</div>
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

export default RootReader;
