/* eslint-disable @next/next/no-img-element */
import LaunchButton from "~/components/LaunchButton/LaunchButton";
import SidebarLayout from "~/components/SidebarLayout";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useMutation,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";
import axios from "axios";
import Spinner from "~/components/spinner/Spinner";
import { api } from "~/utils/api";
import RaffleTimeModal from "~/components/RaffleTimeModal";
import OnNoRafflesNotification from "~/components/notifications/OnNoRafflesNotification";

type IMyRaffle = {
  banner: string;
  captcha: string;
  category: string;
  deadline: string;
  hold: number;
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
  result: {
    address: string;
    data: string;
    name: string;
    status: boolean;
    result?: string;
  }[];
};

const MyRaffle = () => {
  const router = useRouter();
  const [isRaffleModalOpen, setIsRaffleModalOpen] = useState(false);
  const [noRafflesNotification, setNoRafflesNotification] = useState(false);
  const [activeDisplay, setActiveDisplay] = useState("status");

  const allMyData = api.user.getAllMyData.useQuery();

  const myRaffle: UseQueryResult<IMyRaffle> = useQuery<IMyRaffle>(
    ["myRaffle", router.query.id],
    async () => {
      const res = await axios.get(
        `https://alpharescue.online:3500/myRaffle/${String(
          router.query.id
        )}?discordId=${String(allMyData.data?.discordId)}&userId=${String(
          data?.user.id
        )}`,
        {
          headers: {
            Authorization: `Bearer ${String(allMyData.data?.sessionToken)}`,
          },
        }
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res.data;
    },
    {
      enabled: false,
    }
  );

  const restartRaffleMutation = useMutation(["restartRaffle"], async () => {
    const res = await axios.post(
      "https://alpharescue.online:3500/startRaffleAgain",
      {
        discordId: String(allMyData.data?.discordId),
        userId: String(data?.user.id),
        raffleId: String(router.query.id),
        time: Date.now(),
      },
      {
        headers: {
          Authorization: `Bearer ${String(allMyData.data?.sessionToken)}`,
        },
      }
    );
  });

  useEffect(() => {
    if (router.isReady && allMyData.data) {
      void myRaffle.refetch();
    }
  }, [router.isReady, router.query.id, allMyData.data]);

  const { data, status } = useSession();

  const determineColor = (platform: string) => {
    if (platform === "Premint" || platform === "Twitter") {
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
    <SidebarLayout>
      {!myRaffle.data ? (
        <div className="grid h-screen w-full items-center justify-items-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid w-full border-subline text-almostwhite 2xl:h-screen 2xl:grid-cols-[43%_57%]">
          <div className="border-subline 2xl:border-r-2">
            <div className="grid border-b-2 border-subline pb-12">
              <div className="relative h-32 w-full md:h-44">
                {myRaffle.data?.platform != "Twitter" && (
                  <>
                    <img
                      src={
                        myRaffle.data?.banner
                          ? myRaffle.data?.banner
                          : "../../../herobg.png"
                      }
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    {!myRaffle.data?.banner && (
                      <div className="absolute right-8 top-1/3 flex space-x-3 font-benzin text-4xl text-bg 2xl:text-5xl">
                        ALPHA RESCUE
                      </div>
                    )}
                  </>
                )}
                {myRaffle.data?.platform === "Twitter" && (
                  <div className="grid h-full w-full items-center justify-items-center bg-premint">
                    <img
                      src="../../../../twitterwhite.png"
                      alt=""
                      className="h-24"
                    />
                  </div>
                )}
              </div>
              <div className="relative px-4 md:px-10">
                <div
                  className={`ml-28 mt-3 md:ml-32`}
                  style={{
                    color: determineColor(String(myRaffle.data?.platform)),
                  }}
                >
                  {myRaffle.data?.platform}
                </div>
                <div className="absolute -top-12 grid h-24 w-24 items-center justify-items-center rounded-full bg-bg md:-top-16 md:h-28 md:w-28">
                  {myRaffle.data?.platform != "Twitter" && (
                    <img
                      src={myRaffle.data?.profilePicture}
                      alt=""
                      className="grid h-20 w-20 items-center justify-items-center rounded-full md:h-24 md:w-24"
                    />
                  )}
                  {myRaffle.data?.platform === "Twitter" && (
                    <div className="grid h-24 w-24 items-center justify-items-center rounded-full bg-premint">
                      <img
                        src="../../../../twitterwhite.png"
                        alt=""
                        className="h-12"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="px-4 md:px-10 ">
                <div
                  className={`mt-6 cursor-pointer font-benzin text-4xl hover:underline`}
                >
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    href={String(myRaffle.data?.platformLink)}
                  >
                    {myRaffle.data?.name}
                  </Link>
                </div>
                {myRaffle.data?.platform != "Twitter" && (
                  <div className="mt-3 text-subtext">
                    Дедлайн:{" "}
                    {myRaffle.data.deadline
                      ? myRaffle.data.deadline
                      : "не указано"}
                  </div>
                )}
                {myRaffle.data?.platform != "Twitter" && (
                  <div className="mt-10 grid grid-cols-[repeat(2,_max-content)] gap-3 sm:gap-6 2xls:grid-cols-[repeat(4,_max-content)]">
                    <div className="grid h-20 grid-rows-[repeat(2,_max-content)]">
                      <div className="h-max text-2xl">
                        {myRaffle.data?.hold ? myRaffle.data.hold : 0} ETH
                      </div>
                      <div className="text-md text-sm text-subtext">
                        Сумма холда
                      </div>
                    </div>
                    <div className="ml-10 grid h-20 grid-rows-[repeat(2,_max-content)] 2xls:ml-0">
                      <div className="text-2xl">
                        {myRaffle.data?.subscribers
                          ? myRaffle.data?.subscribers
                          : "Не указано"}
                      </div>
                      <div className="text-md text-sm text-subtext">
                        <p>Подписчики в </p>
                        <p>Twitter</p>
                      </div>
                    </div>
                    <div className="grid h-20 grid-rows-[repeat(2,_max-content)]">
                      <div className="h-max text-2xl">
                        {myRaffle.data?.TotalSupply
                          ? myRaffle.data?.TotalSupply
                          : "Не указано"}
                      </div>
                      <div className="text-md text-sm text-subtext">
                        Количество NFT
                      </div>
                    </div>
                    <div className="ml-10 grid h-20 grid-rows-[repeat(2,_max-content)] 2xls:ml-0">
                      <div className="h-max text-2xl">
                        {myRaffle.data?.NumberOfWinners
                          ? myRaffle.data?.NumberOfWinners
                          : "Не указано"}
                      </div>
                      <div className="text-md text-sm text-subtext">
                        <div className="">Количество</div>
                        <div className="">Победителей</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mb-12 grid grid-rows-[max-content_max-content] px-4 md:px-10 2xl:mb-0">
              <div className="mb-8 mt-12 text-3xl">Требования для входа</div>
              <div className="grid gap-4">
                {myRaffle.data?.requirements.map((rq) => (
                  <div
                    className="grid h-12 grid-cols-[50px_120px_auto] gap-4"
                    key={rq.clarification}
                  >
                    <div className="grid h-12 w-12 items-center">
                      <img
                        src={`../../../../${String(
                          rq.platform
                        ).toLowerCase()}.png`}
                        alt=""
                        className="w-full"
                      />
                    </div>
                    <div className="grid items-center text-lg">{rq.action}</div>
                    <div className="grid items-center text-sm">
                      {rq.clarification.split("|")[1] ? (
                        <a
                          href={`https://twitter.com/${String(
                            rq.clarification.split("|")[0]
                          )}`}
                          className="text-blue-400 underline"
                        >
                          {rq.clarification.split("|")[0]}
                        </a>
                      ) : (
                        <a
                          href={
                            rq.platform === "Twitter"
                              ? `https://twitter.com/screenname/status/${rq.clarification}`
                              : rq.clarification
                          }
                          className="text-blue-400 underline"
                        >
                          {rq.platform === "Twitter"
                            ? "Link"
                            : rq.action === "Connect"
                            ? null
                            : "Link"}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="h-100vh overflow-auto border-t-2 border-subline px-4 pt-14 md:px-10 2xl:border-none 2xl:pt-11">
            <div className="grid justify-items-center text-center">
              <div className="grid w-5/6 grid-cols-1 items-center justify-center md:w-full md:grid-cols-[max-content_300px] md:justify-between">
                <div className="mb-16 flex w-full space-x-4 text-lg md:mb-0 lg:text-lg">
                  <button
                    onClick={() => setActiveDisplay("status")}
                    className={`rounded-xl border-2 transition-colors ${
                      activeDisplay === "status"
                        ? "border-accent"
                        : "border-subline"
                    } px-4 py-3`}
                  >
                    Статус захода
                  </button>
                  <button
                    onClick={() => setActiveDisplay("results")}
                    className={`rounded-xl border-2 transition-colors ${
                      activeDisplay === "results"
                        ? "border-accent"
                        : "border-subline"
                    } px-4 py-3`}
                  >
                    Итоги раффла
                  </button>
                </div>
                {myRaffle.data?.platform != "Twitter" && (
                  <div className="justify-self-center">
                    <LaunchButton
                      textSize="base"
                      openModal={() => setIsRaffleModalOpen(true)}
                    >
                      <p className="text-xl">Перезапустить абуз</p>
                    </LaunchButton>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-12">
              <div className="grid grid-cols-[auto] gap-2">
                <div className="mb-6 grid grid-cols-[20px_auto] overflow-x-auto rounded-xl border-2 border-subtext bg-element px-4 py-4 font-montserratBold text-xs text-subtext sm:grid-cols-[40px_200px_auto] sm:text-base">
                  <span>#</span>
                  {myRaffle.data?.platform != "Twitter" && (
                    <span>Metamask адрес</span>
                  )}
                  {activeDisplay === "status" ? (
                    <span>Статус</span>
                  ) : (
                    <span>Итог</span>
                  )}
                </div>
              </div>
              {data?.user.raffleBotUser && status === "authenticated" ? (
                <div className="h-auto font-montserratRegular 2xl:overflow-auto">
                  {myRaffle.data ? (
                    <>
                      {myRaffle.data.result
                        .sort((a, b) => (a.name > b.name ? 1 : -1))
                        .map((a) => (
                          <div
                            className={`grid w-full grid-cols-[auto] gap-2`}
                            key={a.name}
                          >
                            <div
                              className={`mb-4 grid w-full grid-cols-[20px_auto] items-center rounded-xl border text-xs sm:grid-cols-[40px_200px_auto] sm:text-base ${
                                activeDisplay != "status"
                                  ? "border-subline text-subtext"
                                  : a.status === true
                                  ? "border-green-300 text-green-300"
                                  : "border-red-500 text-red-500"
                              } px-4 py-4`}
                            >
                              <span className="justify-self-start">
                                {Number(a.name) + 1}
                              </span>
                              {myRaffle.data?.platform != "Twitter" && (
                                <span className="w-40 justify-self-start">
                                  {a.address?.slice(0, 15)}...
                                </span>
                              )}
                              {activeDisplay === "status" ? (
                                <span className="w-full">{a.data}</span>
                              ) : (
                                <span className="w-full">
                                  {a.result ? a.result : "Нет итога"}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                    </>
                  ) : (
                    <div className="mt-36 grid w-full justify-items-center">
                      <Spinner />
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-6 h-full w-full items-center justify-items-center font-montserratRegular text-subtext">
                  <p>
                    Вы не можете добавлять аккаунты и запускать абуз без
                    подписки на RaffleBot.
                  </p>
                  <br></br>
                  <div className="flex space-x-1 pb-10">
                    <p>Приобрести подписку можно </p>
                    <span>
                      <Link href="/tools" className="underline">
                        здесь.
                      </Link>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <RaffleTimeModal
        open={isRaffleModalOpen}
        closeFunction={() => setIsRaffleModalOpen(false)}
        _raffleId={String(router.query.id)}
        remainingRaffles={Number(
          allMyData.data?.RaffleBotSubscription?.rafflesLeft
        )}
        showNotification={() => setNoRafflesNotification(true)}
        restart={true}
      />
      <OnNoRafflesNotification
        show={noRafflesNotification}
        closeFunction={() => setNoRafflesNotification(false)}
      />
    </SidebarLayout>
  );
};

export default MyRaffle;
