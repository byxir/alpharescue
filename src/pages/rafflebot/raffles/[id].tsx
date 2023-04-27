/* eslint-disable @next/next/no-img-element */
import LaunchButton from "~/components/LaunchButton/LaunchButton";
import SidebarLayout from "~/components/SidebarLayout";
import { useEffect, useState } from "react";
import { RangeSlider } from "~/components/RangeSlider";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "~/components/spinner/Spinner";
import { api } from "~/utils/api";
import { type IAccount } from "../settings";
import RaffleTimeModal from "~/components/RaffleTimeModal";
import OnNoRafflesNotification from "~/components/notifications/OnNoRafflesNotification";

export type IRaffle = {
  banner: string;
  captcha: string;
  category: string;
  deadline: string;
  hold?: number;
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
};

const Raffle = () => {
  const router = useRouter();
  const [timeModalOpen, setTimeModalOpen] = useState(false);
  const [exceptions, setExceptions] = useState<string[] | undefined | null>([]);
  const [showNoRafflesNotification, setShowNoRafflesNotification] =
    useState(false);

  const raffle: UseQueryResult<IRaffle> = useQuery<IRaffle>(
    ["raffle", router.query],
    async () => {
      const res = await axios.get(
        `https://alpharescue.online/raffles/${String(router.query.id)}`
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res.data;
    },
    {
      enabled: false,
    }
  );

  const allMyData = api.user.getAllMyData.useQuery();

  const myAccounts = useQuery<IAccount[]>(
    ["accounts"],
    async () => {
      const res = await axios.get(
        `https://alpharescue.online/get_all_accounts?discordId=${String(
          allMyData.data?.discordId
        )}&userId=${String(data?.user.id)}`,
        {
          headers: {
            Authorization: `Bearer ${String(allMyData.data?.sessionToken)}`,
          },
        }
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (res.data) setRangeValue([1, Number(res.data.length)]);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res.data;
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (allMyData.data && (!myAccounts.data || myAccounts.isStale)) {
      void myAccounts.refetch();
    }
  }, [allMyData.data, myAccounts.data, myAccounts.isStale]);

  useEffect(() => {
    if (router.isReady) {
      void raffle.refetch();
    }
  }, [router.isReady, router.query.id]);

  const [rangeValue, setRangeValue] = useState<number[]>([
    1,
    myAccounts.data?.length || 1,
  ]);
  const [chosenConfiguration, setChosenConfiguration] = useState(0);

  const { data, status } = useSession();

  const handleChangeRange = (e: Event, newValue: number[] | number) => {
    setChosenConfiguration(0);
    const newValueArray = newValue as number[];
    if (Number(newValueArray[0]) < Number(rangeValue[0])) {
      const newExceptions = exceptions?.filter(
        (e) => Number(e) != Number(newValueArray[0]) - 1
      );
      setExceptions(newExceptions);
    }
    if (Number(newValueArray[1]) > Number(rangeValue[1])) {
      const newExceptions = exceptions?.filter(
        (e) => Number(e) != Number(newValueArray[1]) - 1
      );
      setExceptions(newExceptions);
    }
    setRangeValue(newValueArray);
  };

  const handleExceptions = (account: string) => {
    if (
      !exceptions?.includes(account) &&
      Number(account) + 1 >= Number(rangeValue[0]) &&
      Number(account) + 1 <= Number(rangeValue[1])
    ) {
      exceptions &&
        setExceptions((prevAccounts) => {
          if (prevAccounts) {
            return [...prevAccounts, account];
          } else {
            return [account];
          }
        });
    } else if (
      Number(account) + 1 >= Number(rangeValue[0]) &&
      Number(account) + 1 <= Number(rangeValue[1])
    ) {
      const newExceptions = exceptions?.filter(
        (e) => Number(account) != Number(e)
      );
      setExceptions(newExceptions);
    } else {
      if (Number(account) === Number(rangeValue[1])) {
        setRangeValue((prev) => [Number(prev[0]), Number(account) + 1]);
      } else if (Number(account) > Number(rangeValue[1])) {
        const prevRangeValue = rangeValue;
        setRangeValue((prev) => [Number(prev[0]), Number(account) + 1]);
        const newExceptions: string[] = [];
        for (let i = Number(prevRangeValue[1]); i < Number(account); i++) {
          newExceptions.push(String(i));
        }
        setExceptions((prev) => {
          if (prev) {
            return [...prev, ...newExceptions];
          } else {
            return [...newExceptions];
          }
        });
      }

      if (Number(account) < Number(rangeValue[0])) {
        const prevRangeValue = rangeValue;
        setRangeValue((prev) => [Number(account) + 1, Number(prev[1])]);
        const newExceptions: string[] = [];
        for (let i = Number(prevRangeValue[0]) - 2; i > Number(account); i--) {
          newExceptions.push(String(i));
        }
        setExceptions((prev) => {
          if (prev) {
            return [...prev, ...newExceptions];
          } else {
            return [...newExceptions];
          }
        });
      }
    }
  };

  const handleChangeConfiguration = (newChosenConfiguration: number) => {
    if (data?.user.raffleBotUser && status === "authenticated") {
      setChosenConfiguration(newChosenConfiguration);
    }
  };
  const determineColor = (platform: string) => {
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
    <SidebarLayout>
      {!raffle.data ? (
        <div className="grid h-screen w-full items-center justify-items-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid w-full border-subline text-almostwhite 2xl:h-screen 2xl:grid-cols-[43%_57%]">
          <div className="border-subline 2xl:border-r-2">
            <div className="grid border-b-2 border-subline pb-12">
              <div className="relative h-32 w-full md:h-44">
                <img
                  src={
                    raffle.data?.banner
                      ? raffle.data?.banner
                      : "../../../herobg.png"
                  }
                  alt=""
                  className="h-full w-full object-cover"
                />
                {!raffle.data?.banner && (
                  <div className="absolute right-8 top-1/3 flex space-x-3 font-benzin text-4xl text-bg 2xl:text-5xl">
                    ALPHA RESCUE
                  </div>
                )}
              </div>
              <div className="relative px-4 md:px-10">
                <div
                  className={`ml-28 mt-3 md:ml-32`}
                  style={{
                    color: determineColor(String(raffle.data?.platform)),
                  }}
                >
                  {raffle.data?.platform}
                </div>
                <div className="absolute -top-12 grid h-24 w-24 items-center justify-items-center rounded-full bg-bg md:-top-16 md:h-28 md:w-28">
                  <img
                    src={raffle.data?.profilePicture}
                    alt=""
                    className="h-20 w-20 rounded-full md:h-24 md:w-24"
                  />
                </div>
              </div>
              <div className="px-4 md:px-10 ">
                <div
                  className={`mt-6 cursor-pointer font-benzin text-4xl hover:underline`}
                >
                  <Link
                    href={String(raffle.data?.platformLink)}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {raffle.data?.name}
                  </Link>
                </div>
                <div className="mt-3 text-subtext">
                  Дедлайн:{" "}
                  {raffle.data.deadline ? raffle.data.deadline : "не указано"}
                </div>
                <div className="mt-10 grid grid-cols-[repeat(2,_max-content)] gap-3 sm:gap-6 2xls:grid-cols-[repeat(4,_max-content)]">
                  <div className="grid h-20 grid-rows-[repeat(2,_max-content)]">
                    <div className="h-max text-2xl">
                      {raffle.data?.hold ? raffle.data.hold : 0} ETH
                    </div>
                    <div className="text-md text-sm text-subtext">
                      Сумма холда
                    </div>
                  </div>
                  <div className="ml-10 grid h-20 grid-rows-[repeat(2,_max-content)] 2xls:ml-0">
                    <div className="text-2xl">
                      {raffle.data?.subscribers
                        ? raffle.data?.subscribers
                        : "Не указано"}
                    </div>
                    <div className="text-md text-sm text-subtext">
                      <p>Подписчики в </p>
                      <p>Twitter</p>
                    </div>
                  </div>
                  <div className="grid h-20 grid-rows-[repeat(2,_max-content)]">
                    <div className="h-max text-2xl">
                      {raffle.data?.TotalSupply
                        ? raffle.data?.TotalSupply
                        : "Не указано"}
                    </div>
                    <div className="text-md text-sm text-subtext">
                      Количество NFT
                    </div>
                  </div>
                  <div className="ml-10 grid h-20 grid-rows-[repeat(2,_max-content)] 2xls:ml-0">
                    <div className="h-max text-2xl">
                      {raffle.data?.NumberOfWinners
                        ? raffle.data?.NumberOfWinners
                        : "Не указано"}
                    </div>
                    <div className="text-md text-sm text-subtext">
                      <div className="">Количество</div>
                      <div className="">Победителей</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-12 grid grid-rows-[max-content_max-content] px-4 md:px-10 2xl:mb-0">
              <div className="mb-8 mt-12 text-3xl">Требования для входа</div>
              <div className="grid gap-4">
                {raffle.data?.requirements.map((rq) => (
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
                            ? "Tweet"
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
          <div className="h-100vh border-t-2 border-subline px-4 pt-14 md:px-10 2xl:overflow-y-auto 2xl:border-none 2xl:pt-11">
            <div className="grid items-center justify-items-center sm:grid-cols-[max-content_max-content] sm:justify-between">
              <div className="mb-14 grid justify-items-center sm:mb-3 sm:justify-items-start md:mb-4">
                <div className="mb-6 text-center text-xl sm:w-48 sm:text-start md:w-auto lg:w-64 lg:text-2xl xl:w-auto 2xl:w-64 2xls:w-auto">
                  Выбрать готовую конфигурацию
                </div>
                <div className="grid grid-cols-[repeat(4,_max-content)] gap-2">
                  {allMyData.data?.configurations ? (
                    <>
                      {allMyData.data?.configurations[0] ? (
                        <div
                          onClick={() => {
                            setChosenConfiguration(1);
                            const newRangeValues: number[] = [];
                            allMyData.data?.configurations &&
                            allMyData.data.configurations[1]?.firstAccount
                              ? (newRangeValues[0] =
                                  Number(
                                    allMyData.data.configurations[0]
                                      ?.firstAccount
                                  ) + 1)
                              : (newRangeValues[0] = 1);
                            allMyData.data?.configurations &&
                            allMyData.data.configurations[0]?.lastAccount
                              ? (newRangeValues[1] =
                                  allMyData.data.configurations[0].lastAccount +
                                  1)
                              : (newRangeValues[1] = Number(
                                  myAccounts.data?.length
                                ));
                            setRangeValue(newRangeValues);
                            setExceptions(
                              allMyData.data?.configurations &&
                                allMyData.data.configurations[0]?.exceptions?.split(
                                  ","
                                )
                            );
                          }}
                          className={`grid h-12 w-12 cursor-pointer items-center justify-items-center rounded-lg bg-element text-2xl shadow-md transition-all hover:bg-opacity-60 ${
                            chosenConfiguration === 1
                              ? "border-2 border-almostwhite"
                              : ""
                          }`}
                        >
                          1
                        </div>
                      ) : null}
                      {allMyData.data?.configurations[1] ? (
                        <div
                          onClick={() => {
                            setChosenConfiguration(2);
                            const newRangeValues: number[] = [];
                            allMyData.data?.configurations &&
                            allMyData.data.configurations[1]?.firstAccount
                              ? (newRangeValues[0] =
                                  allMyData.data.configurations[1]
                                    .firstAccount + 1)
                              : (newRangeValues[0] = 1);
                            allMyData.data?.configurations &&
                            allMyData.data.configurations[1]?.lastAccount
                              ? (newRangeValues[1] =
                                  allMyData.data.configurations[1].lastAccount +
                                  1)
                              : (newRangeValues[1] = Number(
                                  myAccounts.data?.length
                                ));
                            setRangeValue(newRangeValues);
                            setExceptions(
                              allMyData.data?.configurations &&
                                allMyData.data.configurations[1]?.exceptions?.split(
                                  ","
                                )
                            );
                          }}
                          className={`grid h-12 w-12 cursor-pointer items-center justify-items-center rounded-lg bg-element text-2xl shadow-md transition-all hover:bg-opacity-60 ${
                            chosenConfiguration === 2
                              ? "border-2 border-almostwhite"
                              : ""
                          }`}
                        >
                          2
                        </div>
                      ) : null}
                      {allMyData.data?.configurations[2] ? (
                        <div
                          onClick={() => {
                            setChosenConfiguration(3);
                            const newRangeValues: number[] = [];
                            allMyData.data?.configurations &&
                            allMyData.data.configurations[2]?.firstAccount
                              ? (newRangeValues[0] =
                                  allMyData.data.configurations[2]
                                    .firstAccount + 1)
                              : (newRangeValues[0] = 1);
                            allMyData.data?.configurations &&
                            allMyData.data.configurations[2]?.lastAccount
                              ? (newRangeValues[1] =
                                  allMyData.data.configurations[2].lastAccount +
                                  1)
                              : (newRangeValues[1] = Number(
                                  myAccounts.data?.length
                                ));
                            setRangeValue(newRangeValues);
                            setExceptions(
                              allMyData.data?.configurations &&
                                allMyData.data.configurations[2]?.exceptions?.split(
                                  ","
                                )
                            );
                          }}
                          className={`grid h-12 w-12 cursor-pointer items-center justify-items-center rounded-lg bg-element text-2xl shadow-md transition-all hover:bg-opacity-60 ${
                            chosenConfiguration === 3
                              ? "border-2 border-almostwhite"
                              : ""
                          }`}
                        >
                          3
                        </div>
                      ) : null}
                      {allMyData.data?.configurations[3] ? (
                        <div
                          onClick={() => {
                            setChosenConfiguration(4);
                            const newRangeValues: number[] = [];
                            allMyData.data?.configurations &&
                            allMyData.data.configurations[3]?.firstAccount
                              ? (newRangeValues[0] =
                                  allMyData.data.configurations[3]
                                    .firstAccount + 1)
                              : (newRangeValues[0] = 1);
                            allMyData.data?.configurations &&
                            allMyData.data.configurations[3]?.lastAccount
                              ? (newRangeValues[1] =
                                  allMyData.data.configurations[3].lastAccount +
                                  1)
                              : (newRangeValues[1] = Number(
                                  myAccounts.data?.length
                                ));
                            setRangeValue(newRangeValues);
                            setExceptions(
                              allMyData.data?.configurations &&
                                allMyData.data.configurations[3]?.exceptions?.split(
                                  ","
                                )
                            );
                          }}
                          className={`grid h-12 w-12 cursor-pointer items-center justify-items-center rounded-lg bg-element text-2xl shadow-md transition-all hover:bg-opacity-60 ${
                            chosenConfiguration === 4
                              ? "border-2 border-almostwhite"
                              : ""
                          }`}
                        >
                          4
                        </div>
                      ) : null}
                    </>
                  ) : null}
                </div>
              </div>
              <LaunchButton
                authorized={
                  data?.user.raffleBotUser && status === "authenticated"
                }
                openModal={() => setTimeModalOpen(true)}
              >
                <p className="text-2xl">Запустить</p>
                <p className="text-2xl">абуз</p>
              </LaunchButton>
            </div>
            <div className="mt-16 grid justify-items-center text-center">
              <div className="grid w-5/6 grid-cols-1 items-center justify-center md:w-full md:grid-cols-[max-content_300px] md:justify-between">
                <div className="mb-16 w-full text-xl md:mb-0 lg:text-2xl">
                  Используемые аккаунты
                </div>
                {data?.user.raffleBotUser && status === "authenticated" ? (
                  <div className="mr-5 grid w-full grid-cols-[max-content_auto_max-content] items-center">
                    <div className="mr-5">0</div>
                    <RangeSlider
                      getAriaLabel={() => "Account range"}
                      value={rangeValue}
                      onChange={handleChangeRange}
                      valueLabelDisplay="auto"
                      min={1}
                      max={myAccounts.data?.length || 1}
                      step={1}
                    />
                    <div className="ml-5">All</div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mt-12 block w-full overflow-x-scroll">
              <div className="grid grid-cols-[auto_40px] gap-2">
                <div className="mb-6 grid grid-cols-[5%_17%_18%_20%_20%_20%] rounded-xl border-2 border-subtext bg-element px-4 py-4 font-montserratBold text-xs text-subtext sm:text-base">
                  <span>#</span>
                  <span>Twitter</span>
                  <span>Discord</span>
                  <span>Metamask</span>
                  <span>Прокси</span>
                  <span>Почты</span>
                </div>
                <div className="mb-6 h-10 self-center rounded-lg p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-full w-full text-subtext"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
              </div>
              {data?.user.raffleBotUser && status === "authenticated" ? (
                <div className="h-auto font-montserratRegular">
                  {myAccounts.data ? (
                    myAccounts.data
                      .filter((a) => {
                        if (
                          a.DiscordStatus ||
                          a.DiscordToken ||
                          a.Email ||
                          a.MetaMaskAddress ||
                          a.MetaMaskPrivateKey ||
                          a.ProxyData ||
                          a.ProxyStatus ||
                          a.ProxyType ||
                          a.TwitterAuthToken ||
                          a.TwitterCsrf ||
                          a.TwitterStatus
                        ) {
                          return a;
                        }
                      })
                      .map((a) => (
                        <div
                          className="grid w-full grid-cols-[auto_40px] gap-2 overflow-scroll"
                          key={a.name}
                        >
                          <div className="mb-4 grid w-full grid-cols-[5%_17%_18%_20%_20%_20%] items-center rounded-xl border border-subline px-4 py-4 text-subtext">
                            <span>{Number(a.name) + 1}</span>
                            <span>{a.TwitterCsrf?.slice(0, 8)}...</span>
                            <span>{a.DiscordToken?.slice(0, 8)}...</span>
                            <span>{a.MetaMaskAddress?.slice(0, 8)}...</span>
                            <span>{a.ProxyData?.slice(7, 17)}...</span>
                            <span>{a.Email?.slice(0, 12)}...</span>
                          </div>
                          <div
                            onClick={() => handleExceptions(a.name)}
                            className="mb-4 h-10 cursor-pointer self-center rounded-lg border border-subline p-2.5"
                          >
                            {!exceptions?.includes(a.name) &&
                            Number(a.name) >= Number(rangeValue[0]) - 1 &&
                            Number(a.name) <= Number(rangeValue[1]) - 1 ? (
                              <div className="h-full w-full rounded-md bg-accent"></div>
                            ) : null}
                          </div>
                        </div>
                      ))
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
        open={timeModalOpen}
        closeFunction={() => setTimeModalOpen(false)}
        _raffleId={String(router.query.id)}
        _exceptions={exceptions}
        _firstAcc={Number(rangeValue[0]) - 1}
        _lastAcc={Number(rangeValue[1]) - 1}
        remainingRaffles={Number(
          allMyData.data?.RaffleBotSubscription?.rafflesLeft
        )}
        showNotification={() => setShowNoRafflesNotification(true)}
      />
      <OnNoRafflesNotification
        show={showNoRafflesNotification}
        closeFunction={() => setShowNoRafflesNotification(false)}
      />
    </SidebarLayout>
  );
};

export default Raffle;
