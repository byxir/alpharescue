import {
  AtSymbolIcon,
  DocumentIcon,
  DocumentTextIcon,
  KeyIcon,
  NoSymbolIcon,
  ServerStackIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CaptchaModal from "~/components/accounts/CaptchaModal";
import ConfigurationSlideover from "~/components/ConfigurationSlideover";
import DiscordReader from "~/components/accounts/FileReaders/DiscordReader";
import EmailReader from "~/components/accounts/FileReaders/EmailReader";
import SidebarLayout from "~/components/SidebarLayout";
import Spinner from "~/components/spinner/Spinner";
import { Forbidden } from "~/design/icons/Forbidden";
import { Plus } from "~/design/icons/Plus";
import { api } from "~/utils/api";
import ProxyModal from "~/components/accounts/ProxyModal";
import TwitterReader from "~/components/accounts/FileReaders/TwitterReader";
import MetamaskReader from "~/components/accounts/FileReaders/MetamaskReader";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { all } from "axios";
import OnLoadNotification from "~/components/notifications/OnLoadNotification";
import RootReader from "~/components/accounts/FileReaders/RootReader";
import XLSXExporter from "~/components/XLSXExporter";
import ReplaceBannedModal from "~/components/accounts/ReplaceBannedModal";
import Link from "next/link";
import SubscriptionRafflebotModal from "~/components/landing/SubscriptionRafflebotModal";

export type IAccount = {
  DiscordStatus?: string;
  DiscordToken?: string;
  Email?: string;
  MetaMaskAddress?: string;
  MetaMaskPrivateKey?: string;
  ProxyData?: string;
  ProxyStatus?: string;
  ProxyType?: string;
  TwitterAuthToken?: string;
  TwitterCsrf?: string;
  TwitterStatus?: string;
  name: string;
};

/* eslint-disable @next/next/no-img-element */
const Settings = () => {
  const { data, status } = useSession();
  const [slideoverOpen, setSlideoverOpen] = useState(false);
  const [replaceBannedModalOpen, setReplaceBannedModalOpen] = useState(false);
  const [captchaModalOpen, setCaptchaModalOpen] = useState(false);
  const [proxyModalOpen, setProxyModalOpen] = useState(false);
  const [onLoadNotificationShow, setOnLoadNotificationShow] = useState(false);
  const [subscriptionModalRaffleBotOpen, setSubscriptionModalRaffleBotOpen] =
    useState(false);

  const queryClient = useQueryClient();

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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res.data;
    },
    {
      enabled: false,
    }
  );

  const allMyData = api.user.getAllMyData.useQuery(undefined, {
    enabled: false,
  });

  useEffect(() => {
    if (
      allMyData.data?.discordId &&
      allMyData.data?.sessionToken &&
      data?.user.id
    ) {
      void myAccounts.refetch();
    }
  }, [data?.user.id, allMyData.data?.discordId, allMyData.data?.sessionToken]);

  const handleDiscordSignIn = async () => {
    await signIn("discord", {
      callbackUrl: `${window.location.origin}`,
    });
  };

  const handleSubscriptionData = async () => {
    if (status === "authenticated") {
      if (!data.user.raffleBotUser) {
        //whop logic here
      }
    } else {
      await handleDiscordSignIn();
    }
  };

  const refetchFunction = async () => {
    await queryClient.refetchQueries(["accounts"]);
  };

  useEffect(() => {
    if (data && !allMyData.data) {
      void allMyData.refetch();
    }
  }, [data, slideoverOpen]);

  return (
    <SidebarLayout>
      <div className="px-3 md:px-8 xl:px-14 xl:pt-16">
        <div className="mb-12 font-benzin text-3xl">Настройки</div>
        <div className="grid gap-16 xl:grid-cols-[repeat(2,_max-content)] 2xls:grid-cols-[max-content_max-content_max-content] 2xls:justify-start">
          <div className="xl:max-w-xl">
            <div className="rounded-xl border-2 border-subline p-4">
              <div className="grid py-2">
                <div className="mb-8 text-xl text-almostwhite">
                  Данные о подписке
                </div>
                {data?.user.raffleBotUser && status === "authenticated" ? (
                  <div className="grid items-center gap-4 text-xs lg:text-base">
                    {allMyData.data ? (
                      <>
                        <div className="grid grid-cols-[auto_max-content]">
                          <div className="grid w-full grid-cols-[repeat(2,_max-content)] items-center justify-between text-subtext xl:gap-10">
                            <p>Подписка истекает:</p>
                            <div className="flex items-center space-x-4">
                              <p className="text-base text-almostwhite xl:text-xl">
                                {`${Number(
                                  allMyData.data.RaffleBotSubscription?.expires.getDate()
                                )}/${
                                  Number(
                                    allMyData.data.RaffleBotSubscription?.expires.getMonth()
                                  ) + 1
                                }/${Number(
                                  allMyData.data.RaffleBotSubscription?.expires.getFullYear()
                                )}`}
                              </p>
                              <button className="h-9 w-28 rounded-xl border-2 border-green-400 bg-bg px-4 py-2 text-xs transition-all hover:bg-opacity-60 lg:w-28">
                                Продлить
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="grid w-full grid-cols-[repeat(2,_max-content)] items-center justify-between text-subtext xl:gap-10">
                          <p>Раффлов осталось сегодня:</p>
                          <div className="flex items-center space-x-4">
                            <p className="text-lg text-almostwhite xl:text-xl">
                              {
                                allMyData.data.RaffleBotSubscription
                                  ?.rafflesLeft
                              }
                            </p>
                            <button
                              onClick={() =>
                                setSubscriptionModalRaffleBotOpen(true)
                              }
                              className="h-9 w-28 rounded-xl bg-element px-4 py-2 text-xs shadow-md transition-all hover:bg-opacity-60 lg:w-28"
                            >
                              Докупить
                            </button>
                          </div>
                        </div>
                        <div className="grid w-full grid-cols-[repeat(2,_max-content)] items-center justify-between text-subtext xl:gap-10">
                          <p>Всего раффлов в сутки:</p>
                          <div className="flex items-center space-x-4">
                            <p className="text-lg text-almostwhite xl:text-xl">
                              {
                                allMyData.data.RaffleBotSubscription
                                  ?.rafflesPerDay
                              }
                            </p>
                            <button className="h-9 w-28 rounded-xl bg-element px-4 py-2 text-xs shadow-md transition-all hover:bg-opacity-60 lg:w-28">
                              Добавить
                            </button>
                          </div>
                        </div>
                        <div className="grid w-full grid-cols-[repeat(2,_max-content)] items-center justify-between text-subtext xl:gap-10">
                          <p>Макс. кол-во аккаунтов:</p>
                          <div className="flex items-center space-x-4">
                            <p className="text-lg text-almostwhite xl:text-xl">
                              {
                                allMyData.data.RaffleBotSubscription
                                  ?.maxNumAccounts
                              }
                            </p>
                            <button className="h-9 w-28 rounded-xl bg-element px-4 py-2 text-xs shadow-md transition-all hover:bg-opacity-60 lg:w-28">
                              Добавить
                            </button>
                          </div>
                        </div>
                        <div className="mt-4 flex w-full content-center items-center justify-between">
                          <div className="ml-4 grid h-full items-center text-lg">
                            {data.user.name}
                          </div>
                          <button
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            onClick={() => signOut()}
                            className="cursor-pointer rounded-xl bg-red-600 p-3 shadow-md transition-all hover:bg-opacity-60"
                          >
                            Выйти из аккаунта
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="grid h-full items-center justify-items-center">
                        <Spinner />
                      </div>
                    )}
                  </div>
                ) : status === "authenticated" ? (
                  <>
                    <button
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      onClick={() => {
                        setSubscriptionModalRaffleBotOpen(true);
                      }}
                      className="w-full cursor-pointer self-center justify-self-center rounded-xl bg-accent p-6 text-center font-montserratBold text-2xl text-bg shadow-md transition-all hover:bg-opacity-60"
                    >
                      Купить подписку
                    </button>
                    <div className="mt-4 flex w-full content-center items-center justify-between">
                      <div className="ml-4 grid h-full items-center text-lg">
                        {data.user.name}
                      </div>
                      <button
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onClick={() => signOut()}
                        className="cursor-pointer rounded-xl bg-red-600 p-3 shadow-md transition-all hover:bg-opacity-60"
                      >
                        Выйти из аккаунта
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={handleSubscriptionData}
                    className="flex w-5/6 cursor-pointer items-center justify-center space-x-4 self-center justify-self-center rounded-xl bg-indigo-600 p-6 text-center font-montserratBold text-2xl text-almostwhite shadow-md transition-all hover:bg-opacity-60"
                  >
                    <img src="../../../../discordwhite.png" className="w-20" />
                    <div>Log in</div>
                  </button>
                )}
              </div>
            </div>
            <div className="mt-16 grid text-sm xl:text-base">
              <div className="text-xl">Инструкции</div>
              <Link href="/rafflebot#howToUse" className="mt-8">
                <div className="grid cursor-pointer grid-cols-[repeat(2,_max-content)] justify-between rounded-xl border-2 border-subline bg-bg px-8 py-4 text-subtext shadow-md transition-all hover:bg-neutral-900">
                  <p className="mr-3">Как использовать бота?</p>
                  <Plus />
                </div>
              </Link>
              <Link href="/rafflebot#loadAccounts" className="mt-3 space-x-2">
                <div className="grid cursor-pointer grid-cols-[repeat(2,_max-content)] justify-between rounded-xl border-2 border-subline bg-bg px-8 py-4 text-subtext shadow-md transition-all hover:bg-neutral-900">
                  <p className="mr-3">Как загрузить аккаунты?</p>
                  <Plus />
                </div>
              </Link>
              <Link href="/rafflebot#buyAccounts" className="mt-3 space-x-2">
                <div className="grid cursor-pointer grid-cols-[repeat(2,_max-content)] justify-between rounded-xl border-2 border-subline bg-bg px-8 py-4 text-subtext shadow-md transition-all hover:bg-neutral-900">
                  <p className="mr-3">Где купить аккаунты?</p>
                  <Plus />
                </div>
              </Link>
              <Link href="/rafflebot#captchaKey" className="mt-3 space-x-2">
                <div className="grid cursor-pointer grid-cols-[repeat(2,_max-content)] justify-between rounded-xl border-2 border-subline bg-bg px-8 py-4 text-subtext shadow-md transition-all hover:bg-neutral-900">
                  <p className="mr-3">Ключ CapMonster</p>
                  <Plus />
                </div>
              </Link>
              <Link href="/rafflebot#errors" className="mt-3 space-x-2">
                <div className="grid cursor-pointer grid-cols-[repeat(2,_max-content)] justify-between rounded-xl border-2 border-subline bg-bg px-8 py-4 text-subtext shadow-md transition-all hover:bg-neutral-900">
                  <p className="mr-3">Справочник по ошибкам</p>
                  <Plus />
                </div>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-[repeat(4,_max-content)] gap-6 text-center text-sm text-subtext">
            <RootReader
              raffleBotUser={
                data?.user.raffleBotUser ? data?.user.raffleBotUser : false
              }
              discordId={allMyData.data?.discordId}
              sessionToken={allMyData.data?.sessionToken}
              showNotification={() => setOnLoadNotificationShow(true)}
              readerType="twitter"
            />
            <RootReader
              raffleBotUser={
                data?.user.raffleBotUser ? data?.user.raffleBotUser : false
              }
              discordId={allMyData.data?.discordId}
              sessionToken={allMyData.data?.sessionToken}
              showNotification={() => setOnLoadNotificationShow(true)}
              readerType="discord"
            />
            <RootReader
              raffleBotUser={
                data?.user.raffleBotUser ? data?.user.raffleBotUser : false
              }
              discordId={allMyData.data?.discordId}
              sessionToken={allMyData.data?.sessionToken}
              showNotification={() => setOnLoadNotificationShow(true)}
              readerType="metamask"
            />
            <button
              onClick={() => {
                setCaptchaModalOpen(true);
              }}
              className={`grid h-52 min-w-[176px] justify-items-center rounded-xl border-2 border-dashed border-subline p-4 transition-colors ${
                data?.user.raffleBotUser && status === "authenticated"
                  ? "cursor-pointer hover:bg-neutral-900"
                  : "cursor-not-allowed"
              }`}
              disabled={
                !(
                  data?.user.raffleBotUser &&
                  status === "authenticated" &&
                  allMyData.data
                )
              }
            >
              <div className="mb-2 grid h-16 w-16 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-16 w-16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                  />
                </svg>
              </div>
              <p className="">Загрузить</p>
              <p className="">ключ</p>
              <p className="">от капчи</p>
              <div className="mt-4 flex items-center space-x-1 text-subline">
                <div className="h-6 w-6">
                  <KeyIcon />
                </div>
                <div className="text-xs">строка</div>
              </div>
            </button>
            <button
              onClick={() => setProxyModalOpen(true)}
              className={`grid h-52 min-w-[176px] justify-items-center rounded-xl border-2 border-dashed border-subline p-4 transition-colors ${
                data?.user.raffleBotUser && status === "authenticated"
                  ? "cursor-pointer hover:bg-neutral-900"
                  : "cursor-not-allowed"
              }`}
              disabled={
                !(data?.user.raffleBotUser && status === "authenticated")
              }
            >
              <div className="mb-2 grid h-16 w-16 items-center">
                <ServerStackIcon />
              </div>
              <p className="">Загрузить</p>
              <p className="">прокси</p>
              <div className="mt-4 flex items-center space-x-1 text-subline">
                <div className="h-6 w-6">
                  <DocumentTextIcon />
                </div>
                <div className="text-xs">.txt файл</div>
              </div>
            </button>
            <RootReader
              raffleBotUser={
                data?.user.raffleBotUser ? data?.user.raffleBotUser : false
              }
              discordId={allMyData.data?.discordId}
              sessionToken={allMyData.data?.sessionToken}
              showNotification={() => setOnLoadNotificationShow(true)}
              readerType="email"
            />
            <XLSXExporter
              discordId={allMyData.data?.discordId}
              sessionToken={allMyData.data?.sessionToken}
              accounts={myAccounts.data}
            />
          </div>
          <div className="grid h-full w-full grid-rows-[max-content_max-content] justify-self-center">
            <div className="h-max rounded-xl border-2 border-subline px-8 pb-8 pt-8">
              <p className="mb-10 text-xl">Конфигурации</p>
              {allMyData.data?.configurations ? (
                <div className="grid grid-cols-2 grid-rows-[repeat(2,_max-content)] gap-4">
                  <div className="h-52 rounded-xl bg-element p-3 sm:p-4">
                    {allMyData.data?.configurations[0] ? (
                      <>
                        <p className="mt-4 w-full text-center text-5xl">1</p>
                        <div className="mt-6 grid grid-cols-[100px_auto] items-center justify-between text-xs sm:gap-x-2 sm:gap-y-2">
                          <p className="w-max text-subtext">Начальный: </p>
                          <p className="text-end text-base text-almostwhite">
                            {allMyData.data?.configurations[0]?.firstAccount !=
                              null &&
                              allMyData.data?.configurations[0]?.firstAccount +
                                1}
                          </p>
                          <p className="w-max text-subtext">Последний: </p>
                          <p className="text-end text-base text-almostwhite">
                            {allMyData.data?.configurations[0]?.lastAccount &&
                              allMyData.data?.configurations[0]?.lastAccount +
                                1}
                          </p>
                          <p className="w-max text-subtext">Исключения: </p>
                          <p className="text-end text-base text-almostwhite">
                            {allMyData.data?.configurations[0].exceptions
                              ? allMyData.data?.configurations[0]?.exceptions?.split(
                                  ","
                                ).length
                              : 0}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div
                        onClick={() => setSlideoverOpen(true)}
                        className="grid h-full w-full cursor-pointer items-center justify-items-center"
                      >
                        <div className="grid h-max justify-items-center gap-3 text-center text-subtext">
                          <div className="h-12 w-12">
                            <NoSymbolIcon />
                          </div>
                          <div className="text-sm">Нет конфигурации</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="h-52 rounded-xl bg-element p-3 sm:p-4">
                    {allMyData.data?.configurations[1] ? (
                      <>
                        <p className="mt-4 w-full text-center text-5xl">2</p>
                        <div className="mt-6 grid grid-cols-[100px_auto] items-center justify-between text-xs sm:gap-x-2 sm:gap-y-2">
                          <p className="w-max text-subtext">Начальный: </p>
                          <p className="text-end text-base text-almostwhite">
                            {allMyData.data?.configurations[1]?.firstAccount !=
                              null &&
                              allMyData.data?.configurations[1]?.firstAccount +
                                1}
                          </p>
                          <p className="w-max text-subtext">Последний: </p>
                          <p className="text-end text-base text-almostwhite">
                            {allMyData.data?.configurations[1]?.lastAccount &&
                              allMyData.data?.configurations[1]?.lastAccount +
                                1}
                          </p>
                          <p className="w-max text-subtext">Исключения: </p>
                          <p className="text-end text-base text-almostwhite">
                            {allMyData.data?.configurations[1].exceptions
                              ? allMyData.data?.configurations[1]?.exceptions?.split(
                                  ","
                                ).length
                              : 0}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div
                        onClick={() => setSlideoverOpen(true)}
                        className="grid h-full w-full cursor-pointer items-center justify-items-center"
                      >
                        <div className="grid h-max justify-items-center gap-3 text-center text-subtext">
                          <div className="h-12 w-12">
                            <NoSymbolIcon />
                          </div>
                          <div className="text-sm">Нет конфигурации</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="grid h-52 rounded-xl bg-element p-3 sm:p-4">
                    {allMyData.data?.configurations[2] ? (
                      <>
                        <p className="mt-4 w-full text-center text-5xl">3</p>
                        <div className="mt-6 grid grid-cols-[100px_auto] items-center justify-between text-xs sm:gap-x-2 sm:gap-y-2">
                          <p className="w-max text-subtext">Начальный: </p>
                          <p className="text-end text-base text-almostwhite">
                            {allMyData.data?.configurations[2]?.firstAccount !=
                              null &&
                              allMyData.data?.configurations[2]?.firstAccount +
                                1}
                          </p>
                          <p className="w-max text-subtext">Последний: </p>
                          <p className="text-end text-base text-almostwhite">
                            {allMyData.data?.configurations[2]?.lastAccount &&
                              allMyData.data?.configurations[2]?.lastAccount +
                                1}
                          </p>
                          <p className="w-max text-subtext">Исключения: </p>
                          <p className="text-end text-base text-almostwhite">
                            {allMyData.data?.configurations[2].exceptions
                              ? allMyData.data?.configurations[2]?.exceptions?.split(
                                  ","
                                ).length
                              : 0}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div
                        onClick={() => setSlideoverOpen(true)}
                        className="grid h-full w-full cursor-pointer items-center justify-items-center"
                      >
                        <div className="grid h-max justify-items-center gap-3 text-center text-subtext">
                          <div className="h-12 w-12">
                            <NoSymbolIcon />
                          </div>
                          <div className="text-sm">Нет конфигурации</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="grid h-52 rounded-xl bg-element p-3 transition-colors sm:p-4">
                    {allMyData.data?.configurations[3] ? (
                      <>
                        <p className="mt-4 w-full text-center text-5xl">4</p>
                        <div className="mt-6 grid grid-cols-[100px_auto] items-center justify-between text-xs sm:gap-x-2 sm:gap-y-2">
                          <p className="w-max text-subtext">Начальный: </p>
                          <p className="text-end text-base text-almostwhite">
                            {allMyData.data?.configurations[3]?.firstAccount !=
                              null &&
                              allMyData.data?.configurations[3]?.firstAccount +
                                1}
                          </p>
                          <p className="w-max text-subtext">Последний: </p>
                          <p className="text-end text-base text-almostwhite">
                            {allMyData.data?.configurations[3]?.lastAccount &&
                              allMyData.data?.configurations[3]?.lastAccount +
                                1}
                          </p>
                          <p className="w-max text-subtext">Исключения: </p>
                          <p className="text-end text-base text-almostwhite">
                            {allMyData.data?.configurations[3].exceptions
                              ? allMyData.data?.configurations[3]?.exceptions?.split(
                                  ","
                                ).length
                              : 0}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div
                        onClick={() => setSlideoverOpen(true)}
                        className="grid h-full w-full cursor-pointer items-center justify-items-center"
                      >
                        <div className="grid h-max justify-items-center gap-3 text-center text-subtext">
                          <div className="w-12">
                            <NoSymbolIcon />
                          </div>
                          <div className="text-sm">Нет конфигурации</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
              <button
                onClick={() => {
                  setSlideoverOpen(true);
                }}
                disabled={!allMyData.data}
                className="mt-10 grid w-full cursor-pointer justify-items-center rounded-xl bg-accent p-3 text-lg text-bg shadow-md transition-all hover:bg-opacity-60"
              >
                Настроить
              </button>
            </div>
            <button
              onClick={() => setReplaceBannedModalOpen(true)}
              className="mt-9 w-full cursor-pointer rounded-xl bg-element px-6 py-12 text-2xl shadow-md transition-all hover:bg-opacity-60"
            >
              Заменить забаненные аккаунты
            </button>
          </div>
        </div>
      </div>
      <ConfigurationSlideover
        open={slideoverOpen}
        closeFunction={() => setSlideoverOpen(false)}
        configurations={allMyData.data?.configurations}
        discordId={allMyData.data?.discordId}
        sessionToken={allMyData.data?.sessionToken}
        refetchConfigurations={() => allMyData.refetch()}
      />
      <CaptchaModal
        open={captchaModalOpen}
        closeFunction={() => setCaptchaModalOpen(false)}
        discordId={allMyData.data?.discordId}
        sessionToken={allMyData.data?.sessionToken}
        refetchFunction={refetchFunction}
      />
      <ProxyModal
        open={proxyModalOpen}
        closeFunction={() => setProxyModalOpen(false)}
        raffleBotUser={
          data?.user.raffleBotUser ? data?.user.raffleBotUser : false
        }
        discordId={allMyData.data?.discordId}
        sessionToken={allMyData.data?.sessionToken}
        refetchFunction={refetchFunction}
        showNotification={() => setOnLoadNotificationShow(true)}
      />
      <OnLoadNotification
        show={onLoadNotificationShow}
        closeFunction={() => setOnLoadNotificationShow(false)}
      />
      <ReplaceBannedModal
        open={replaceBannedModalOpen}
        closeFunction={() => setReplaceBannedModalOpen(false)}
        raffleBotUser={
          data?.user.raffleBotUser ? data?.user.raffleBotUser : false
        }
        discordId={allMyData.data?.discordId}
        sessionToken={allMyData.data?.sessionToken}
        refetchFunction={refetchFunction}
        showNotification={() => setOnLoadNotificationShow(true)}
      />
      <SubscriptionRafflebotModal
        open={subscriptionModalRaffleBotOpen}
        closeFunction={() => setSubscriptionModalRaffleBotOpen(false)}
        discordId={allMyData.data?.discordId}
        type="community"
      />
    </SidebarLayout>
  );
};

export default Settings;
