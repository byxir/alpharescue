/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import localFont from "next/font/local";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "./spinner/Spinner";
import Link from "next/link";
import { useRouter } from "next/router";
import { Star } from "~/design/icons/Star";

type IRaffleLinkResponse = {
  error: boolean;
  message: string | null;
  raffle: {
    banner: string;
    captcha: string;
    category: string;
    deadline: string;
    hold?: string;
    id: string;
    name: string;
    platform: string;
    platformLink: string;
    profilePicture: string;
    requirements: {
      action: string;
      clarification: string;
      platform: string;
    }[];
    subscribers: number;
    TotalSupply: string;
    NumberOfWinners: string;
  } | null;
};

const benzin = localFont({
  src: [
    {
      path: "../fonts/Benzin-Semibold.ttf",
    },
  ],
  variable: "--font-benzin",
});
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

  const raffle: UseQueryResult<IRaffleLinkResponse> =
    useQuery<IRaffleLinkResponse>(
      ["raffleLinkResponse"],
      async () => {
        const res = await axios.get(
          `https://alpharescue.online/rafflelink?raffleLink=${String(userLink)}`
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return res.data;
      },
      { enabled: false }
    );

  const router = useRouter();

  const determineColor = (platform = String(router.query.platform)) => {
    if (platform === "Premint") {
      return "#2CBBDB";
    } else if (platform === "Alphabot") {
      return "#63FF1E";
    } else if (platform === "Superful") {
      return "#6767AB";
    } else if (platform === "FreeNFT") {
      return "#FFFFFF";
    }
    return "";
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-10 ${montserratRegular.variable} ${benzin.variable} ${montserrat.variable}`}
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
                  <div className="flex w-full items-center space-x-2 rounded-xl bg-element py-4 pl-3 pr-2 text-xs text-subtext shadow-md sm:space-x-4 sm:pl-6 sm:text-base">
                    <div className="h-6 w-6">
                      <MagnifyingGlassIcon />
                    </div>
                    <div className="h-6 w-full">
                      <input
                        type="text"
                        value={userLink}
                        onChange={(e) => setUserLink(e.target.value)}
                        className="h-6 w-full bg-transparent pl-0 font-montserratRegular text-sm placeholder-subtext outline-none sm:text-lg"
                        placeholder="Вставьте ссылку"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => raffle.refetch()}
                    className="rounded-xl bg-element px-6 py-4 font-montserratBold text-lg shadow-md transition-all hover:bg-opacity-60"
                  >
                    Найти
                  </button>
                </div>
                <div className=" grid items-center justify-items-center font-montserratBold">
                  {raffle.isFetching ? (
                    <>
                      <div className="h-8"></div>
                      <Spinner />
                    </>
                  ) : !raffle.data?.error && raffle.data ? (
                    <>
                      <div className="h-12"></div>
                      <Link
                        href={`/rafflebot/raffles/${String(
                          raffle.data?.raffle?.id
                        )}`}
                        className="min-w-104 relative grid grid-rows-[112px_auto] rounded-xl bg-element shadow-md"
                        key={raffle.data?.raffle?.id}
                      >
                        <div className="relative h-28">
                          <img
                            src={
                              raffle.data?.raffle?.banner
                                ? raffle.data?.raffle?.banner
                                : "../../../../herobg.png"
                            }
                            className="h-full w-full rounded-t-xl object-cover"
                            alt=""
                          />
                          {!raffle.data?.raffle?.banner && (
                            <div className="absolute right-8 top-1/3 flex space-x-3 font-benzin text-2xl text-bg 2xl:text-3xl">
                              ALPHA RESCUE
                            </div>
                          )}
                        </div>
                        <div className="mt-3 grid px-6 pb-6">
                          <div
                            className={`justify ml-24`}
                            style={{
                              color: determineColor(
                                raffle.data?.raffle?.platform
                              ),
                            }}
                          >
                            {raffle.data?.raffle?.platform}
                          </div>
                          <div className="grid grid-cols-[auto_48px] items-center justify-between">
                            <div className="mt-3 h-max font-benzin text-2xl">
                              {raffle.data?.raffle?.name}
                              <div className="absolute top-18 grid h-20 w-20 items-center justify-items-center rounded-full bg-element">
                                <img
                                  src={raffle.data?.raffle?.profilePicture}
                                  className="h-16 w-16 rounded-full"
                                  alt=""
                                />
                              </div>
                            </div>

                            <div className="mt-7 grid h-max w-12 justify-items-center">
                              <Star />
                            </div>
                          </div>
                          <div className="mt-2 text-sm font-semibold text-subtext">
                            Дедлайн -{" "}
                            {raffle.data?.raffle?.deadline
                              ? raffle.data?.raffle?.deadline
                              : "Не указано"}
                          </div>
                          <div className="mt-8 grid grid-cols-[max-content_max-content] grid-rows-[max-content_max-content] justify-start gap-6 self-end sm:grid-cols-[repeat(4,_max-content)] md:grid-cols-[max-content_max-content] md:grid-rows-[max-content_max-content] 2xls:grid-cols-[max-content_max-content_max-content_auto] 2xls:grid-rows-1 2xls:justify-evenly">
                            <div className="">
                              <div className=" text-lg text-almostwhite">
                                {raffle.data?.raffle?.hold
                                  ? raffle.data?.raffle?.hold
                                  : 0}{" "}
                                ETH
                              </div>
                              <div className="text-xs font-semibold text-subtext">
                                <p>Сумма холда</p>
                              </div>
                            </div>
                            <div className="ml-8 2xls:ml-0">
                              <div className="text-lg font-bold text-almostwhite">
                                {raffle.data?.raffle?.subscribers
                                  ? raffle.data?.raffle?.subscribers
                                  : "Не указано"}
                              </div>
                              <div className="text-xs font-semibold text-subtext">
                                <p>Подписчики</p>
                                <p>в Twitter</p>
                              </div>
                            </div>
                            <div className="">
                              <div className="text-lg font-bold text-almostwhite">
                                {raffle.data?.raffle?.NumberOfWinners
                                  ? raffle.data?.raffle?.NumberOfWinners
                                  : "Не указано"}
                              </div>
                              <div className="text-xs font-semibold text-subtext">
                                <p>Количество</p>
                                <p>Победителей</p>
                              </div>
                            </div>
                            <div className="ml-7 grid grid-cols-2 grid-rows-2 gap-1 2xls:ml-0">
                              {raffle.data?.raffle?.requirements ? (
                                raffle.data?.raffle?.requirements.filter(
                                  (rq) => rq.platform === "Twitter"
                                ).length > 0 ? (
                                  <div className="grid h-8 w-8 items-center justify-items-center">
                                    <img
                                      src="../../../../twitteraffle.data?.raffle?.png"
                                      alt=""
                                    />
                                  </div>
                                ) : null
                              ) : raffle.data?.raffle?.requirements ? (
                                raffle.data?.raffle?.requirements.filter(
                                  (rq) => rq.platform === "Discord"
                                ).length > 0 ? (
                                  <div className="grid h-8 w-8 items-center justify-items-center">
                                    <img src="../../../../discord.png" alt="" />
                                  </div>
                                ) : null
                              ) : raffle.data?.raffle?.hold ? (
                                <div className="grid h-8 w-8 items-center justify-items-center">
                                  <img src="../../../../metamask.png" alt="" />
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </>
                  ) : (
                    <>
                      {raffle.data ? (
                        <h1 className="mt-6 font-montserratBold text-red-500">
                          {raffle.data?.message}
                        </h1>
                      ) : null}
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
