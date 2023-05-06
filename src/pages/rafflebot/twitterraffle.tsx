/* eslint-disable @next/next/no-img-element */
import LaunchButton from "~/components/LaunchButton/LaunchButton";
import SidebarLayout from "~/components/SidebarLayout";
import { useContext, useEffect, useState } from "react";
import { RangeSlider } from "~/components/RangeSlider";
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
import { type IAccount } from "./settings";
import RaffleTimeModal from "~/components/RaffleTimeModal";
import OnNoRafflesNotification from "~/components/notifications/OnNoRafflesNotification";
import { EventStreamStatusContext } from "~/pages/_app";
import Image from "next/image";

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
  const { data, status } = useSession();

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

  const { isEventStreamOpen } = useContext(EventStreamStatusContext);

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

  const stopRaffleMutation = useMutation(["stopRaffle"], async () => {
    return axios.post(
      "https://alpharescue.online/stopraffle",
      {
        discordId: allMyData.data?.discordId,
        userId: data?.user.id,
      },
      {
        headers: {
          Authorization: `Bearer ${String(allMyData.data?.sessionToken)}`,
        },
      }
    );
  });

  const stopRaffle = () => {
    if (
      data?.user.id &&
      allMyData.data?.discordId &&
      allMyData.data?.sessionToken
    ) {
      stopRaffleMutation.mutate();
    }
  };

  useEffect(() => {
    if (
      allMyData.data &&
      data?.user &&
      (!myAccounts.data || myAccounts.isStale)
    ) {
      void myAccounts.refetch();
    }
  }, [allMyData.data, data?.user, myAccounts.data, myAccounts.isStale]);

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

  const [tweetLink, setTweetLink] = useState("");
  const [retweetStatus, setRetweetStatus] = useState(false);
  const [likeStatus, setLikeStatus] = useState(false);
  const [commentStatus, setCommentStatus] = useState(false);
  const [friendTag, setFriendTag] = useState(false);
  const [phraseStatus, setPhraseStatus] = useState(false);
  const [subscriptionText, setSubscriptionText] = useState("");
  return (
    <SidebarLayout>
      <div className="grid w-full border-subline text-almostwhite 2xl:h-screen 2xl:grid-cols-[43%_57%]">
        <div className="border-subline 2xl:border-r-2">
          <div className="grid border-b-2 border-subline pb-14 pl-8 pt-16 font-benzin text-5xl">
            Twitter Raffle
          </div>
          <div className="grid grid-rows-[max-content_max-content] border-b-2 border-subline px-4 pb-16 md:px-10 2xl:mb-0">
            <div className="mb-12 mt-8 text-3xl">Основная настройка</div>
            <div className="">
              <input
                type="text"
                value={tweetLink}
                onChange={(e) => setTweetLink(e.target.value)}
                className="w-full rounded-lg bg-element py-2 pl-3 pr-1 font-montserratRegular text-lg text-almostwhite placeholder-subtext outline-none"
                placeholder="Вставьте ссылку"
              />
              <br></br>
              <br></br>
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <div className="">Подписка</div>
                  <div className="">
                    <input
                      onChange={(e) => setSubscriptionText(e.target.value)}
                      value={subscriptionText}
                      className="w-full rounded-lg bg-element py-2 pl-3 pr-1 font-montserratRegular text-lg text-almostwhite placeholder-subtext outline-none"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="">Ретвит</div>
                    <div className="">
                      <button
                        onClick={() => setRetweetStatus(!retweetStatus)}
                        className="grid h-10 w-10 items-center justify-items-center rounded-lg border border-subline"
                      >
                        {retweetStatus && (
                          <div className="h-5 w-5 rounded-md bg-accent"></div>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="">Лайк</div>
                    <div className="">
                      <button
                        onClick={() => setLikeStatus(!likeStatus)}
                        className="grid h-10 w-10 items-center justify-items-center rounded-lg border border-subline"
                      >
                        {likeStatus && (
                          <div className="h-5 w-5 rounded-md bg-accent"></div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-[max-content_max-content] px-4 pb-16 md:px-10 2xl:mb-0">
            <div className="mb-12 mt-8 text-3xl">Настройка комментариев</div>
            <div className="">
              <div className="flex justify-between">
                <div className="grid grid-cols-[repeat(2,_max-content)] grid-rows-2 gap-x-8 gap-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="">
                      <button
                        onClick={() => setCommentStatus(!commentStatus)}
                        className="grid h-10 w-10 items-center justify-items-center rounded-lg border border-subline"
                      >
                        {commentStatus && (
                          <div className="h-5 w-5 rounded-md bg-accent"></div>
                        )}
                      </button>
                    </div>
                    <div className="">Писать коммент</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="">
                      <button
                        onClick={() => setPhraseStatus(!phraseStatus)}
                        className="grid h-10 w-10 items-center justify-items-center rounded-lg border border-subline"
                      >
                        {phraseStatus && (
                          <div className="h-5 w-5 rounded-md bg-accent"></div>
                        )}
                      </button>
                    </div>
                    <div className="">Список фраз</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="">
                      <button
                        onClick={() => setFriendTag(!friendTag)}
                        className="grid h-10 w-10 items-center justify-items-center rounded-lg border border-subline"
                      >
                        {friendTag && (
                          <div className="h-5 w-5 rounded-md bg-accent"></div>
                        )}
                      </button>
                    </div>
                    <div className="">Тег друзей</div>
                  </div>
                </div>
              </div>
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
                                  allMyData.data.configurations[0]?.firstAccount
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
                                allMyData.data.configurations[1].firstAccount +
                                1)
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
                                allMyData.data.configurations[2].firstAccount +
                                1)
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
                                allMyData.data.configurations[3].firstAccount +
                                1)
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
            {!isEventStreamOpen && (
              <LaunchButton
                authorized={
                  data?.user.raffleBotUser && status === "authenticated"
                }
                openModal={() => setTimeModalOpen(true)}
              >
                <p className="text-2xl">Запустить</p>
                <p className="text-2xl">абуз</p>
              </LaunchButton>
            )}

            {isEventStreamOpen && (
              <LaunchButton
                authorized={
                  data?.user.raffleBotUser && status === "authenticated"
                }
                executeScript={stopRaffle}
              >
                <p className="text-2xl">Отменить</p>
                <p className="text-2xl">заход</p>
              </LaunchButton>
            )}
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
                <span className="hidden sm:block">Metamask</span>
                <span className="block sm:hidden">M-Mask</span>
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
                        <div className="mb-4 grid w-full grid-cols-[5%_17%_18%_20%_20%_20%] items-center rounded-xl border border-subline px-4 py-4 text-xs text-subtext sm:text-base">
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
                  Вы не можете добавлять аккаунты и запускать абуз без подписки
                  на RaffleBot.
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
