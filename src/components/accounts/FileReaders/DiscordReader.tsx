/* eslint-disable @next/next/no-img-element */
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { api } from "~/utils/api";

interface FileObject {
  name: string;
  content: string;
}

const DiscordReader = ({
  raffleBotUser,
  discordId,
  sessionToken,
}: {
  raffleBotUser: boolean;
  discordId: string | undefined;
  sessionToken: string | undefined;
}) => {
  const [files, setFiles] = useState<FileObject[]>([]);

  const { data, status } = useSession();

  const discordMutation = useMutation({
    mutationFn: () => {
      return axios.post("https://alpharescue.online/accounts", {
        discordId: discordId,
        userId: data?.user.id,
        sessionToken: sessionToken,
        type: "discord",
        proxyType: "",
        accounts: files[0]?.content.split("\n"),
      });
    },
    onSuccess: () => {
      console.log("discords are uploaded successfully");
      console.log(
        discordId,
        data?.user.id,
        sessionToken,
        files[0]?.content.split("\n")
      );
      setFiles([]);
    },
    onError: () => {
      console.error("discords are not uploaded");
      console.log(
        discordId,
        data?.user.id,
        sessionToken,
        files[0]?.content.split("\n")
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
        discordMutation.mutate();
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
      disabled={!(data?.user.raffleBotUser && status === "authenticated")}
    >
      <input {...getInputProps()} />
      <div className="mb-2 grid h-16 w-16 items-center">
        <img src="../../../discord.png" alt="" className="w-16" />
      </div>
      <p className="">Загрузить</p>
      <p className="">дискорд</p>
      <div className="mt-4 flex items-center space-x-1 text-subline">
        {isDragActive ? (
          <>
            <div className="text-xs">Дропайте дискорды сюда</div>
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

export default DiscordReader;
