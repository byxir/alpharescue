/* eslint-disable @next/next/no-img-element */
import LaunchButton from "~/components/LaunchButton/LaunchButton";
import SidebarLayout from "~/components/SidebarLayout";
import { useContext, useEffect, useState } from "react";
import { RangeSlider } from "~/components/RangeSlider";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "~/components/spinner/Spinner";
import { api } from "~/utils/api";
import { type IAccount } from "./settings";
import RaffleTimeModal from "~/components/RaffleTimeModal";
import OnNoRafflesNotification from "~/components/notifications/OnNoRafflesNotification";
import { EventStreamStatusContext } from "~/pages/_app";
import TwitterRootReader from "~/components/accounts/FileReaders/twitterraffle/RootReader";
import OnSentencesLoadNotification from "~/components/notifications/OnSentencesLoadNotification";
import OnFriendsLoadNotification from "~/components/notifications/OnFriendsLoadNotification";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

type localStorageData = {
  name: string;
  content: string[];
};

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
  const [showSentencesLoadNotification, setShowSentencesLoadNotification] =
    useState(false);
  const [showFriendsLoadNotification, setShowFriendsLoadNotification] =
    useState(false);

  const { isEventStreamOpen } = useContext(EventStreamStatusContext);

  const [tweetLink, setTweetLink] = useState("");
  const [retweetStatus, setRetweetStatus] = useState(false);
  const [likeStatus, setLikeStatus] = useState(false);
  const [commentStatus, setCommentStatus] = useState(true);
  const [friendStatus, setFriendStatus] = useState(true);
  const [sentenceStatus, setSentenceStatus] = useState(true);
  const [subscriptionText, setSubscriptionText] = useState("");
  const [friendsRangeValue, setFriendsRangeValue] = useState([1, 1]);
  const allMyData = api.user.getAllMyData.useQuery();
  const [followIds, setFollowIds] = useState<string[]>([]);
  const [tweetLinkError, setTweetLinkError] = useState(false);
  const [namePlaceholder, setNamePlaceholder] = useState(false);
  const [friendsName, setFriendsName] = useState<string | null>(null);
  const [sentencesName, setSentencesName] = useState<string | null>(null);

  const [friends, setFriends] = useState<string[] | null | undefined>([]);
  const [sentences, setSentences] = useState<string[] | null | undefined>([]);

  if (typeof window !== "undefined") {
    console.log("client");
  } else {
    console.log("server");
  }

  function getItemFromLocalStorage(key: string): string[] | null {
    if (typeof window === "undefined") return null;
    const item = localStorage.getItem(key);

    if (item === null) {
      console.log("Item not found in local storage");
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsedItem: localStorageData[] = JSON.parse(item);

    if (!Array.isArray(parsedItem) || parsedItem.length !== 1) {
      console.log("Item is not an array or does not have exactly one element");
      return null;
    }

    const obj = parsedItem[0];
    if (!obj) return null;
    const content = obj.content;

    return content;
  }

  useEffect(() => {
    setFriends(getItemFromLocalStorage("friends"));
    setSentences(getItemFromLocalStorage("sentences"));
  }, []);

  const myAccounts = useQuery<IAccount[]>(
    ["twitterAccounts"],
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
      if (res.data) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const filteredAccounts: IAccount[] = res.data.filter(
          (account: IAccount) => {
            if (account.TwitterAuthToken || account.TwitterCsrf) {
              return account;
            }
          }
        );
        setRangeValue([1, Number(filteredAccounts.length)]);

        return filteredAccounts;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return [];
    },
    {
      enabled: false,
    }
  );

  const validateInput = (input: string) => {
    const regex = /^https:\/\/twitter.com\/[A-Za-z0-9_]+\/status\/[^\/]+$/;
    return regex.test(input);
  };

  const testfriends = [
    {
      name: "testfriends",
      content: ["test1", "test2", "test3"],
    },
  ];

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
    const obj = localStorage.getItem("friends");
    if (obj && typeof obj === "string") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const formattedObj: { name: string; content: string[] }[] =
        JSON.parse(obj);
      const newname = String(formattedObj[0]?.name);
      setFriendsName(newname);
      console.log("name name");
    }

    const obj2 = localStorage.getItem("sentences");
    if (obj2 && typeof obj2 === "string") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const formattedObj: { name: string; content: string[] }[] =
        JSON.parse(obj2);
      const newname = String(formattedObj[0]?.name);
      setSentencesName(newname);
      console.log("name name");
    }
  }, []);

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
                onChange={(e) => {
                  setTweetLink(e.target.value);
                  setTweetLinkError(false);
                }}
                className={`w-full rounded-lg bg-element py-2 pl-3 pr-1 font-montserratRegular text-lg text-almostwhite placeholder-subtext outline-none ${
                  tweetLinkError ? "border-2 border-red-500" : ""
                }`}
                placeholder="Вставьте ссылку"
              />
              {tweetLinkError && (
                <div className="text-base text-red-500">Неверная ссылка</div>
              )}
              <br></br>
              <br></br>
              <div className="flex justify-between">
                <div className="">
                  <div className="flex items-center space-x-2">
                    <div className="">Подписка</div>
                    <div className="">
                      <input
                        onChange={(e) => setSubscriptionText(e.target.value)}
                        value={subscriptionText}
                        placeholder="@username"
                        className="w-full rounded-lg bg-element py-2 pl-3 pr-1 font-montserratRegular text-lg text-almostwhite placeholder-subtext outline-none"
                        type="text"
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (
                          !followIds.includes(subscriptionText) &&
                          subscriptionText &&
                          subscriptionText != ""
                        ) {
                          setFollowIds((prev) => [...prev, subscriptionText]);
                          setSubscriptionText("");
                        }
                      }}
                      className="h-10 w-10 cursor-pointer rounded-lg bg-accent text-2xl text-bg shadow-md transition-all hover:bg-opacity-60"
                    >
                      +
                    </button>
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
              <div className="mt-4 grid">
                {followIds.map((id) => (
                  <div
                    key={id}
                    className="ml-24 flex w-52 items-center justify-between space-x-2"
                  >
                    <span>{id}</span>
                    <button
                      onClick={() =>
                        setFollowIds((prev) => prev.filter((_id) => _id != id))
                      }
                      className="h-6 w-6 cursor-pointer text-red-500"
                    >
                      <XMarkIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-rows-[max-content_max-content] px-4 pb-16 md:px-10 2xl:mb-0">
            <div className="mb-6 mt-8 text-3xl">Настройка комментариев</div>
            <div className="flex space-x-6">
              <div className="mb-6 flex items-center space-x-2">
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
                <div className="">Комментарии</div>
              </div>
              {commentStatus && (
                <div className="mb-6 flex items-center space-x-2">
                  <div className="">
                    <button
                      onClick={() => setFriendStatus(!friendStatus)}
                      className="grid h-10 w-10 items-center justify-items-center rounded-lg border border-subline"
                    >
                      {friendStatus && (
                        <div className="h-5 w-5 rounded-md bg-accent"></div>
                      )}
                    </button>
                  </div>
                  <div className="">Тег друзей</div>
                </div>
              )}
              {commentStatus && (
                <div className="mb-6 flex items-center space-x-2">
                  <div className="">
                    <button
                      onClick={() => setSentenceStatus(!sentenceStatus)}
                      className="grid h-10 w-10 items-center justify-items-center rounded-lg border border-subline"
                    >
                      {sentenceStatus && (
                        <div className="h-5 w-5 rounded-md bg-accent"></div>
                      )}
                    </button>
                  </div>
                  <div className="">Предложения</div>
                </div>
              )}
            </div>
            {commentStatus && (
              <div className="grid">
                {friendStatus && (
                  <div className="w-max">
                    <div className="mb-6 text-xl">Выберите диапазон друзей</div>
                    <div className="mb-6 mr-5 grid w-2/3 grid-cols-[max-content_auto_max-content] items-center justify-self-center">
                      <div className="mr-5">1</div>
                      <RangeSlider
                        getAriaLabel={() => "Account range"}
                        value={friendsRangeValue}
                        onChange={(_, newValue) => {
                          setFriendsRangeValue(newValue as number[]);
                        }}
                        valueLabelDisplay="auto"
                        min={1}
                        max={friends?.length || 1}
                        step={1}
                      />
                      <div className="ml-5">Все</div>
                    </div>
                  </div>
                )}
                <div className="flex space-x-20">
                  {friendStatus && (
                    <div className="grid">
                      <TwitterRootReader
                        readerType="friends"
                        showNotification={() =>
                          setShowFriendsLoadNotification(true)
                        }
                        setFriends={(newFriends: string[] | undefined) =>
                          setFriends(newFriends)
                        }
                        name={friendsName}
                        setName={(newname: string) => setFriendsName(newname)}
                      />
                      {friendsName && (
                        <button
                          onClick={() => {
                            if (typeof window != "undefined") {
                              localStorage.removeItem("friends");
                              setFriends([]);
                              setFriendsName(null);
                              console.log("friends friends");
                            }
                          }}
                          className="mt-4 h-12 w-12 justify-self-center text-red-500"
                        >
                          <XCircleIcon />
                        </button>
                      )}
                    </div>
                  )}
                  {sentenceStatus && (
                    <div className="grid">
                      <TwitterRootReader
                        name={sentencesName}
                        setName={(newname: string) => setSentencesName(newname)}
                        readerType="sentences"
                        showNotification={() =>
                          setShowSentencesLoadNotification(true)
                        }
                        setSentences={(newSentences: string[] | undefined) =>
                          setSentences(newSentences)
                        }
                      />
                      {sentencesName && (
                        <button
                          onClick={() => {
                            if (typeof window != "undefined") {
                              localStorage.removeItem("sentences");
                              setSentences([]);
                              setSentencesName(null);
                            }
                          }}
                          className="mt-4 h-12 w-12 justify-self-center text-red-500"
                        >
                          <XCircleIcon />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
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
                openModal={() => {
                  if (validateInput(tweetLink)) {
                    setTimeModalOpen(true);
                    setTweetLinkError(false);
                  } else {
                    setTweetLinkError(true);
                  }
                }}
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
                  <div className="mr-5">1</div>
                  <RangeSlider
                    getAriaLabel={() => "Account range"}
                    value={rangeValue}
                    onChange={handleChangeRange}
                    valueLabelDisplay="auto"
                    min={1}
                    max={myAccounts.data?.length || 1}
                    step={1}
                  />
                  <div className="ml-5">Все</div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-12 block w-full overflow-x-scroll">
            <div className="grid grid-cols-[auto_40px] gap-2">
              <div className="mb-6 grid grid-cols-[30px_150px_200px] rounded-xl border-2 border-subtext bg-element px-4 py-4 font-montserratBold text-xs text-subtext sm:text-base">
                <span>#</span>
                <span>TwitterCsrf</span>
                <span>TwitterAuthToken</span>
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
                        <div className="mb-4 grid w-full grid-cols-[30px_150px_200px] items-center rounded-xl border border-subline px-4 py-4 text-xs text-subtext sm:text-base">
                          <span>{Number(a.name) + 1}</span>
                          <span>{a.TwitterCsrf?.slice(0, 12)}...</span>
                          <span>{a.TwitterAuthToken?.slice(0, 16)}...</span>
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
        _firstAcc={Number(rangeValue[0]) - 1}
        _lastAcc={Number(rangeValue[1]) - 1}
        remainingRaffles={Number(
          allMyData.data?.RaffleBotSubscription?.rafflesLeft
        )}
        twitterRaffleData={{
          Link: tweetLink,
          RetweetStatus: retweetStatus,
          LikeStatus: likeStatus,
          FollowIds: followIds,
          CommentStatus: commentStatus,
          CommentData: {
            Sentences: sentences,
            MaxTags: friendsRangeValue[1],
            MinTags: friendsRangeValue[0],
            Friends: friends,
          },
        }}
        _exceptions={exceptions}
        showNotification={() => setShowNoRafflesNotification(true)}
      />
      <OnNoRafflesNotification
        show={showNoRafflesNotification}
        closeFunction={() => setShowNoRafflesNotification(false)}
      />
      <OnSentencesLoadNotification
        show={showSentencesLoadNotification}
        closeFunction={() => setShowSentencesLoadNotification(false)}
      />
      <OnFriendsLoadNotification
        show={showFriendsLoadNotification}
        closeFunction={() => setShowFriendsLoadNotification(false)}
      />
    </SidebarLayout>
  );
};

export default Raffle;
