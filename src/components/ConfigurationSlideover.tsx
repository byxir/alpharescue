import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import localFont from "next/font/local";
import { RangeSlider } from "./RangeSlider";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { type Configuration } from "@prisma/client";
import { api } from "~/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { type IAccount } from "~/pages/rafflebot/settings";
import Spinner from "./spinner/Spinner";

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

export default function ConfigurationSlideover({
  open,
  closeFunction,
  configurations,
  discordId,
  sessionToken,
  refetchConfigurations,
}: {
  open: boolean;
  closeFunction: () => void;
  configurations: Configuration[] | undefined;
  discordId: string | undefined;
  sessionToken: string | undefined;
  refetchConfigurations: () => Promise<any>;
}) {
  const { data, status } = useSession();

  const [chosenConfiguration, setChosenConfiguration] = useState<number | null>(
    null
  );
  const [rangeValue, setRangeValue] = useState<number[]>([1, 100]);
  const [exceptions, setExceptions] = useState<string[] | undefined | null>([]);
  const [configurationId, setConfigurationId] = useState("");

  const addConfigurationMutation = api.user.addConfiguration.useMutation({
    onSuccess: async () => {
      await refetchConfigurations();
    },
  });
  const updateConfigurationMutation = api.user.updateConfiguration.useMutation({
    onSuccess: async () => {
      await refetchConfigurations();
    },
  });
  const deleteConfigurationMutation = api.user.deleteConfiguration.useMutation({
    onSuccess: async () => {
      await refetchConfigurations();
    },
  });

  const handleConfigurationProcedure = (action: "update" | "delete") => {
    if (rangeValue[0] != undefined && rangeValue[1] != undefined) {
      if (chosenConfiguration === null) {
        addConfigurationMutation.mutate({
          firstAccount: rangeValue[0] - 1,
          lastAccount: rangeValue[1] - 1,
          exceptions: exceptions ? exceptions : null,
        });
        closeFunction();
      } else if (action === "update") {
        updateConfigurationMutation.mutate({
          firstAccount: rangeValue[0] - 1,
          lastAccount: rangeValue[1] - 1,
          configurationId: configurationId,
          exceptions: exceptions ? exceptions : null,
        });
        closeFunction();
      } else {
        deleteConfigurationMutation.mutate({
          configurationId: configurationId,
        });
        closeFunction();
      }
    }
  };

  const myAccounts = useQuery<IAccount[]>(
    ["accounts"],
    async () => {
      const res = await axios.get(
        `https://alpharescue.online:3500/get_all_accounts?discordId=${String(
          discordId
        )}&userId=${String(data?.user.id)}`,
        {
          headers: { Authorization: `Bearer ${String(sessionToken)}` },
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

  const handleChangeRange = (e: Event, newValue: number[] | number) => {
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

  useEffect(() => {
    if (
      (!myAccounts.data || myAccounts.isStale) &&
      discordId != undefined &&
      sessionToken != undefined &&
      open === true
    ) {
      void myAccounts.refetch();
    }
  }, [sessionToken, discordId, open, myAccounts.data, myAccounts.isStale]);

  console.log(myAccounts.data);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        onClose={closeFunction}
        className={`${montserratRegular.variable} ${montserrat.variable} relative z-10 font-sans`}
      >
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-4xl">
                  <div className="flex flex-col overflow-y-scroll bg-sidebarBg shadow-xl">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="border-b-2 border-subline bg-sidebarBg px-4 py-6 sm:px-6">
                        <div className="flex h-20 items-start justify-between space-x-3">
                          {configurations ? (
                            <div className="flex items-center space-x-4 font-montserratBold">
                              {configurations[0] ? (
                                <div
                                  onClick={() => {
                                    setChosenConfiguration(0);
                                    setConfigurationId(
                                      String(configurations[0]?.id)
                                    );
                                    const newRangeValues: number[] = [];
                                    configurations[0]?.firstAccount
                                      ? (newRangeValues[0] =
                                          configurations[0].firstAccount + 1)
                                      : (newRangeValues[0] = 1);
                                    configurations[0]?.lastAccount
                                      ? (newRangeValues[1] =
                                          configurations[0].lastAccount + 1)
                                      : (newRangeValues[1] = Number(
                                          myAccounts.data?.length
                                        ));
                                    setRangeValue(newRangeValues);
                                    setExceptions(
                                      configurations[0]?.exceptions?.split(",")
                                    );
                                  }}
                                  className={`grid h-20 w-20 cursor-pointer items-center justify-items-center rounded-xl bg-element text-xl shadow-md transition-all hover:bg-opacity-60 ${
                                    chosenConfiguration === 0
                                      ? "border-2 border-almostwhite"
                                      : ""
                                  }`}
                                >
                                  1
                                </div>
                              ) : null}
                              {configurations[1] ? (
                                <button
                                  onClick={() => {
                                    setChosenConfiguration(1);
                                    setConfigurationId(
                                      String(configurations[1]?.id)
                                    );
                                    const newRangeValues: number[] = [];
                                    configurations[1]?.firstAccount
                                      ? (newRangeValues[0] =
                                          configurations[1].firstAccount + 1)
                                      : (newRangeValues[0] = 1);
                                    configurations[1]?.lastAccount
                                      ? (newRangeValues[1] =
                                          configurations[1].lastAccount + 1)
                                      : (newRangeValues[1] = Number(
                                          myAccounts.data?.length
                                        ));
                                    setRangeValue(newRangeValues);
                                    setExceptions(
                                      configurations[1]?.exceptions?.split(",")
                                    );
                                  }}
                                  className={`grid h-20 w-20 cursor-pointer items-center justify-items-center rounded-xl bg-element text-xl shadow-md transition-all hover:bg-opacity-60 ${
                                    chosenConfiguration === 1
                                      ? "border-2 border-almostwhite"
                                      : ""
                                  }`}
                                >
                                  2
                                </button>
                              ) : null}
                              {configurations[2] ? (
                                <button
                                  onClick={() => {
                                    setChosenConfiguration(2);
                                    setConfigurationId(
                                      String(configurations[2]?.id)
                                    );
                                    const newRangeValues: number[] = [];
                                    configurations[2]?.firstAccount
                                      ? (newRangeValues[0] =
                                          configurations[2].firstAccount + 1)
                                      : (newRangeValues[0] = 1);
                                    configurations[2]?.lastAccount
                                      ? (newRangeValues[1] =
                                          configurations[2].lastAccount + 1)
                                      : (newRangeValues[1] = Number(
                                          myAccounts.data?.length
                                        ));
                                    setRangeValue(newRangeValues);
                                    setExceptions(
                                      configurations[2]?.exceptions?.split(",")
                                    );
                                  }}
                                  className={`grid h-20 w-20 cursor-pointer items-center justify-items-center rounded-xl bg-element text-xl shadow-md transition-all hover:bg-opacity-60 ${
                                    chosenConfiguration === 2
                                      ? "border-2 border-almostwhite"
                                      : ""
                                  }`}
                                >
                                  3
                                </button>
                              ) : null}
                              {configurations[3] ? (
                                <button
                                  onClick={() => {
                                    setChosenConfiguration(3);
                                    setConfigurationId(
                                      String(configurations[3]?.id)
                                    );
                                    const newRangeValues: number[] = [];
                                    configurations[3]?.firstAccount
                                      ? (newRangeValues[0] =
                                          configurations[3].firstAccount + 1)
                                      : (newRangeValues[0] = 1);
                                    configurations[3]?.lastAccount
                                      ? (newRangeValues[1] =
                                          configurations[3].lastAccount + 1)
                                      : (newRangeValues[0] = Number(
                                          myAccounts.data?.length
                                        ));
                                    setRangeValue(newRangeValues);
                                    setExceptions(
                                      configurations[3]?.exceptions?.split(",")
                                    );
                                  }}
                                  className={`grid h-20 w-20 cursor-pointer items-center justify-items-center rounded-xl bg-element text-xl shadow-md transition-all hover:bg-opacity-60 ${
                                    chosenConfiguration === 3
                                      ? "border-2 border-almostwhite"
                                      : ""
                                  }`}
                                >
                                  4
                                </button>
                              ) : null}
                              {configurations.length < 4 ? (
                                <button
                                  onClick={() => {
                                    setChosenConfiguration(null);
                                    setExceptions([]);
                                    setRangeValue([
                                      1,
                                      Number(myAccounts.data?.length),
                                    ]);
                                  }}
                                  className={`txt-center grid h-20 w-20 cursor-pointer items-center justify-items-center rounded-xl bg-element text-xs text-subtext shadow-md transition-all hover:bg-opacity-60 ${
                                    chosenConfiguration === null
                                      ? "border-2 border-white"
                                      : ""
                                  }`}
                                >
                                  <div className="w-12">
                                    <PlusIcon />
                                  </div>
                                </button>
                              ) : !configurations.length ? (
                                <button
                                  onClick={() => {
                                    setChosenConfiguration(null);
                                    setExceptions([]);
                                    setRangeValue([
                                      1,
                                      Number(myAccounts.data?.length),
                                    ]);
                                  }}
                                  className={`txt-center grid h-20 w-20 cursor-pointer items-center justify-items-center rounded-xl bg-element text-xs text-subtext shadow-md transition-all hover:bg-opacity-60 ${
                                    chosenConfiguration === null
                                      ? "border-2 border-white"
                                      : ""
                                  }`}
                                >
                                  <div className="w-12">
                                    <PlusIcon />
                                  </div>
                                </button>
                              ) : null}
                            </div>
                          ) : null}
                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-500"
                              onClick={closeFunction}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Divider container */}
                      <div className="sm:divide-b h-[calc(100vh-208px)] overflow-auto px-8 pt-8 sm:divide-subline">
                        <div className="mx-10 grid grid-cols-[max-content_auto_max-content] items-center">
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
                        <div className="mt-12">
                          <div className="grid grid-cols-[auto_40px] gap-2">
                            <div className="mb-6 grid grid-cols-[5%_17%_18%_20%_20%_20%] overflow-x-auto rounded-xl border-2 border-subtext bg-element px-4 py-4 font-montserratBold text-xs text-subtext sm:text-base">
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
                          {data?.user.raffleBotUser &&
                          status === "authenticated" ? (
                            <div className="h-auto font-montserratRegular 2xl:overflow-auto">
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
                                      className="grid w-full grid-cols-[auto_40px] gap-2"
                                      key={a.name}
                                    >
                                      <div className="mb-4 grid h-14 w-full grid-cols-[5%_17%_18%_20%_20%_20%] items-center rounded-xl border border-subline px-4 py-4 text-subtext">
                                        <span>{Number(a.name) + 1}</span>
                                        <span
                                          className={`${
                                            a.TwitterStatus === "ACTIVE"
                                              ? "text-green-500"
                                              : a.TwitterStatus === "BAN"
                                              ? "text-red-600"
                                              : ""
                                          }`}
                                        >
                                          {a.TwitterCsrf ? (
                                            <span>
                                              {a.TwitterCsrf?.slice(0, 8)}...
                                            </span>
                                          ) : null}
                                        </span>
                                        <span
                                          className={`${
                                            a.DiscordStatus === "ACTIVE"
                                              ? "text-green-500"
                                              : a.DiscordStatus === "BAN"
                                              ? "text-red-600"
                                              : ""
                                          }`}
                                        >
                                          {a.DiscordToken ? (
                                            <span>
                                              {a.DiscordToken?.slice(0, 8)}...
                                            </span>
                                          ) : null}
                                        </span>
                                        <span>
                                          {a.MetaMaskAddress ? (
                                            <span>
                                              {a.MetaMaskAddress?.slice(0, 8)}
                                              ...
                                            </span>
                                          ) : null}
                                        </span>
                                        <span
                                          className={`${
                                            a.ProxyStatus === "ACTIVE"
                                              ? "text-green-500"
                                              : a.ProxyStatus === "BAN"
                                              ? "text-red-600"
                                              : ""
                                          }`}
                                        >
                                          {a.ProxyData ? (
                                            <span>
                                              {a.ProxyData?.slice(7, 17)}...
                                            </span>
                                          ) : null}
                                        </span>
                                        <span>
                                          {a.Email ? (
                                            <span>
                                              {a.Email?.slice(0, 12)}...
                                            </span>
                                          ) : null}
                                        </span>
                                      </div>
                                      <div
                                        onClick={() => handleExceptions(a.name)}
                                        className="mb-4 h-10 cursor-pointer self-center rounded-lg border border-subline p-2.5"
                                      >
                                        {!exceptions?.includes(a.name) &&
                                        Number(a.name) >=
                                          Number(rangeValue[0]) - 1 &&
                                        Number(a.name) <=
                                          Number(rangeValue[1]) - 1 ? (
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
                                Вы не можете добавлять аккаунты и запускать абуз
                                без подписки на RaffleBot.
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

                    {/* Action buttons */}
                    <div className="flex-shrink-0 border-t-2 border-subline px-4 py-5 sm:px-6">
                      <div className="flex justify-between font-montserratBold">
                        <button
                          type="button"
                          className="bg justify-self-start rounded-md border border-red-600 bg-transparent px-3 py-2 text-sm font-semibold text-red-600 shadow-sm focus:outline-none"
                          onClick={() => {
                            handleConfigurationProcedure("delete");
                          }}
                        >
                          Удалить конфигурацию
                        </button>
                        <div className="flex space-x-3">
                          <button
                            type="button"
                            className="bg rounded-md bg-element px-3 py-2 text-sm font-semibold text-almostwhite shadow-sm focus:outline-none"
                            onClick={() => {
                              setChosenConfiguration(null);
                              closeFunction();
                            }}
                          >
                            Отмена
                          </button>
                          <button
                            onClick={() => {
                              handleConfigurationProcedure("update");
                            }}
                            className="inline-flex justify-center rounded-md bg-accent px-3 py-2 text-sm font-semibold text-bg shadow-sm transition-all hover:bg-opacity-60"
                          >
                            {chosenConfiguration === null
                              ? "Добавить"
                              : "Сохранить"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
