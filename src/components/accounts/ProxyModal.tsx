/* eslint-disable @next/next/no-img-element*/
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import localFont from "next/font/local";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import ProxyReader from "./FileReaders/ProxyReader";
import { QueryClient } from "@tanstack/react-query";

const montserrat = localFont({
  src: [
    {
      path: "../../fonts/Montserrat-Bold.ttf",
    },
  ],
  variable: "--font-montserratBold",
});
const montserratRegular = localFont({
  src: [
    {
      path: "../../fonts/Montserrat-Regular.ttf",
    },
  ],
  variable: "--font-montserratRegular",
});

interface FileObject {
  name: string;
  content: string;
}

export default function ProxyModal({
  open,
  closeFunction,
  raffleBotUser,
  discordId,
  sessionToken,
  refetchFunction,
  showNotification,
}: {
  open: boolean;
  closeFunction: () => void;
  raffleBotUser: boolean;
  discordId: string | undefined;
  sessionToken: string | undefined;
  refetchFunction: () => Promise<void>;
  showNotification: () => void;
}) {
  const { data, status } = useSession();
  const [files, setFiles] = useState<FileObject[]>([]);
  const [currentProxyType, setCurrentProxyType] = useState("http");

  const queryClient = new QueryClient();

  const proxyMutation = useMutation({
    mutationFn: () => {
      return axios.post(
        "https://alpharescue.online:3500/accounts",
        {
          discordId: discordId,
          userId: data?.user.id,
          type: "proxy",
          proxyType: currentProxyType,
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
      showNotification();
      closeFunction();
    },
    onError: () => {
      setFiles([]);
    },
  });

  useEffect(() => {
    if (raffleBotUser && status === "authenticated") {
      if (files.length > 0) {
        proxyMutation.mutate();
      }
    } else {
      //error message not authenticated
    }
  }, [files]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-10 ${montserratRegular.variable} ${montserrat.variable}`}
        onClose={closeFunction}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-90 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative grid justify-items-center overflow-hidden rounded-xl bg-sidebarBg px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <h1 className="mb-4 font-montserratBold text-xl">Тип прокси</h1>
                <div className="mb-8 grid w-64 grid-cols-2 items-center rounded-xl font-montserratBold">
                  <div
                    onClick={() => setCurrentProxyType("http")}
                    className={`cursor-pointer rounded-l-xl py-4 text-center transition-all ${
                      currentProxyType === "http"
                        ? "border border-accent bg-accent text-bg"
                        : "border border-subline bg-transparent"
                    }`}
                  >
                    http
                  </div>
                  <div
                    onClick={() => setCurrentProxyType("socks5")}
                    className={`cursor-pointer rounded-r-xl py-4 text-center transition-all ${
                      currentProxyType === "socks5"
                        ? "border border-accent bg-accent text-bg"
                        : "border border-subline bg-transparent"
                    }`}
                  >
                    socks5
                  </div>
                </div>
                <ProxyReader
                  raffleBotUser={raffleBotUser}
                  exportFiles={(_files: FileObject[]) => setFiles(_files)}
                  showNotification={() => showNotification()}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
