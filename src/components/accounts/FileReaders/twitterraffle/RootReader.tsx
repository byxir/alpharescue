/* eslint-disable @next/next/no-img-element */
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const TwitterRootReader = ({
  showNotification,
  readerType,
  setFriends,
  setSentences,
  name,
  setName,
}: {
  showNotification: () => void;
  readerType: "sentences" | "friends";
  setFriends?: (friends: string[] | undefined) => void;
  setSentences?: (sentences: string[] | undefined) => void;
  name: string | null;
  setName: (newname: string) => void;
}) => {
  const { data, status } = useSession();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const loadedFiles = await Promise.all(
      acceptedFiles.map(async (file) => {
        const fileContent = await file.text();
        return { name: file.name, content: fileContent.split("\n") };
      })
    );

    if (readerType === "sentences") {
      localStorage.setItem("sentences", JSON.stringify(loadedFiles));
      if (loadedFiles[0] && loadedFiles[0].content.length && setSentences) {
        setSentences(loadedFiles[0].content);
      }
      if (loadedFiles[0] && loadedFiles[0].name) setName(loadedFiles[0].name);
    } else if (readerType === "friends") {
      localStorage.setItem("friends", JSON.stringify(loadedFiles));
      if (loadedFiles[0] && loadedFiles[0].content.length && setFriends) {
        setFriends(loadedFiles[0].content);
      }
      if (loadedFiles[0] && loadedFiles[0].name) setName(loadedFiles[0].name);
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
      className={`grid h-52 min-w-[160px] justify-items-center rounded-xl border-2 border-dashed border-subline px-2 py-4 transition-colors sm:w-44 sm:p-4 ${
        data?.user.raffleBotUser && status === "authenticated"
          ? "cursor-pointer hover:bg-neutral-900"
          : "cursor-not-allowed"
      }`}
      disabled={!(data?.user.raffleBotUser && status === "authenticated")}
    >
      <input {...getInputProps()} />
      <div className="mb-2 grid h-16 w-16 items-center">
        <DocumentTextIcon />
      </div>
      <p className="">Загрузить</p>
      {readerType === "sentences" && <p className="">фразы</p>}
      {readerType === "friends" && <p className="">друзей</p>}
      <div className="mt-4 flex items-center space-x-1 text-subline">
        {isDragActive ? (
          <>
            <div className="text-xs">Дропайте файл сюда</div>
          </>
        ) : (
          <>
            <div className="h-6 w-6">
              <DocumentTextIcon />
            </div>
            <div className="text-xs">{name ? name : "нет файла"}</div>
          </>
        )}
      </div>
    </button>
  );
};

export default TwitterRootReader;
