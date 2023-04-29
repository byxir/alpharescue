/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { KeyIcon } from "@heroicons/react/24/outline";
import localFont from "next/font/local";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import Spinner from "../spinner/Spinner";

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
  discordId,
  sessionToken,
  refetchFunction,
}: {
  open: boolean;
  closeFunction: () => void;
  discordId: string | undefined;
  sessionToken: string | undefined;
  refetchFunction: () => Promise<void>;
}) {
  const { data, status } = useSession();

  const captchaMutation = useMutation({
    mutationFn: () => {
      return axios.post(
        "https://alpharescue.online/accounts",
        {
          discordId: discordId,
          userId: data?.user.id,
          type: "CaptchaKey",
          proxyType: "",
          accounts: captchaKeyString,
        },
        {
          headers: { Authorization: `Bearer ${String(sessionToken)}` },
        }
      );
    },
    onSuccess: async () => await refetchFunction(),
  });

  const myCaptchaKey = useQuery<{
    captchaKey: string;
    message: string;
    status: string;
  }>(
    ["captchaKey"],
    async () => {
      const res = await axios.get(
        `https://alpharescue.online/getCaptchaKey?discordId=${String(
          discordId
        )}&userId=${String(data?.user.id)}`,
        {
          headers: {
            Authorization: `Bearer ${String(sessionToken)}`,
          },
        }
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      setCaptchaKeyString(res.data.captchaKey);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res.data;
    },
    {
      enabled: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  const [captchaKeyString, setCaptchaKeyString] = useState<
    string | undefined | null
  >(myCaptchaKey.data?.captchaKey);

  useEffect(() => {
    if (data?.user.id && discordId && sessionToken) {
      void myCaptchaKey.refetch();
    }
  }, [discordId, sessionToken, data?.user.id]);

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
                  {!myCaptchaKey.data ? (
                    <div className="grid w-full justify-items-center">
                      <Spinner />
                    </div>
                  ) : (
                    <>
                      <div className="flex w-full items-center space-x-4 rounded-xl bg-element py-4 pl-6 pr-2 text-subtext shadow-md">
                        <div className="h-6 w-6">
                          <KeyIcon />
                        </div>
                        <div className="h-6 w-full">
                          <input
                            type="text"
                            value={captchaKeyString ? captchaKeyString : ""}
                            onChange={(e) =>
                              setCaptchaKeyString(e.target.value)
                            }
                            className="h-6 w-full bg-transparent font-montserratRegular text-lg placeholder-subtext outline-none"
                            placeholder="Вставьте ключ от капчи"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (
                            discordId &&
                            sessionToken &&
                            data?.user &&
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
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
