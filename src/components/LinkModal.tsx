/* eslint-disable @typescript-eslint/no-misused-promises */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import localFont from "next/font/local";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type IRaffle } from "~/pages/rafflebot/raffles/[id]";
import axios from "axios";

const montserrat = localFont({
  src: [
    {
      path: "../fonts/Montserrat-Bold.ttf",
    },
  ],
  variable: "--font-montserratBold",
});
const montserratRegular = localFont({
  src: [
    {
      path: "../fonts/Montserrat-Regular.ttf",
    },
  ],
  variable: "--font-montserratRegular",
});

export default function LinkModal({
  open,
  closeFunction,
}: {
  open: boolean;
  closeFunction: () => void;
}) {
  const [userLink, setUserLink] = useState("");

  const raffle: UseQueryResult<IRaffle> = useQuery<IRaffle>(
    ["raffle"],
    async () => {
      const res = await axios.get(
        `https://alpharescue.online/rafflelink?raffleLink=${String(userLink)}`
      );
      console.log("raffle link response -> ", res.data);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res.data;
    },
    { enabled: false }
  );

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
              <Dialog.Panel className="relative overflow-hidden rounded-xl bg-element px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="flex w-full space-x-4">
                  <div className="flex w-full items-center space-x-4 rounded-xl bg-subline py-4 pl-6 pr-2 text-subtext shadow-md">
                    <div className="h-6 w-6">
                      <MagnifyingGlassIcon />
                    </div>
                    <div className="h-6 w-full">
                      <input
                        type="text"
                        value={userLink}
                        onChange={(e) => setUserLink(e.target.value)}
                        className="h-6 w-full bg-transparent font-montserratRegular text-lg placeholder-subtext outline-none"
                        placeholder="Вставьте ссылку на раффл"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => raffle.refetch()}
                    className="rounded-xl bg-subline px-6 py-4 font-montserratBold text-lg shadow-md transition-all hover:bg-opacity-60"
                  >
                    Найти
                  </button>
                </div>
                <div className="h-16"></div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
