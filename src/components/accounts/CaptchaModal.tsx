/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import localFont from "next/font/local";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

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

export default function CaptchaModal({
  open,
  closeFunction,
}: {
  open: boolean;
  closeFunction: () => void;
}) {
  const [captchaKeyString, setCaptchaKeyString] = useState("");
  const { data, status } = useSession();

  const protectionData = api.user.getMyProtectionData.useQuery();

  console.log(protectionData.data);

  const captchaMutation = useMutation({
    mutationFn: () => {
      console.log(protectionData.data);
      return axios.post("https://alpharescue.online/accounts", {
        discordId: protectionData.data?.discordId,
        userId: data?.user.id,
        sessionToken: protectionData.data?.sessionToken,
        type: "CaptchaKey",
        proxyType: "",
        accounts: captchaKeyString,
      });
    },
  });

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
              <Dialog.Panel className="relative overflow-hidden rounded-xl bg-sidebarBg px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="flex w-full space-x-4 font-montserratBold">
                  <div className="flex w-full items-center space-x-4 rounded-xl bg-element py-4 pl-6 pr-2 text-subtext shadow-md">
                    <div className="h-6 w-6">
                      <MagnifyingGlassIcon />
                    </div>
                    <div className="h-6 w-full">
                      <input
                        type="text"
                        value={captchaKeyString}
                        onChange={(e) => setCaptchaKeyString(e.target.value)}
                        className="h-6 w-full bg-transparent font-montserratRegular text-lg placeholder-subtext outline-none"
                        placeholder="Вставьте ключ от капчи"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (
                        protectionData.data &&
                        data &&
                        status === "authenticated"
                      ) {
                        captchaMutation.mutate();
                      }
                      closeFunction();
                    }}
                    className="rounded-xl bg-element px-6 py-4 font-montserratBold text-lg shadow-md transition-all hover:bg-opacity-60"
                  >
                    Сохранить
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
