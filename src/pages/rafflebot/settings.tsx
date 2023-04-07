/* eslint-disable jsx-a11y/alt-text */
import { AtSymbolIcon, ServerStackIcon } from "@heroicons/react/24/outline";
import { signIn, useSession } from "next-auth/react";
import SidebarLayout from "~/components/SidebarLayout";
import { Forbidden } from "~/design/icons/Forbidden";
import { Plus } from "~/design/icons/Plus";
import { ServerIcon } from "~/design/icons/ServerIcon";

/* eslint-disable @next/next/no-img-element */
const RaffleList = () => {
  const { data, status } = useSession();

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

  return (
    <SidebarLayout>
      <div className="px-3 pb-8 pt-10 md:px-8 xl:px-14 xl:pt-16">
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
                    <div className="grid grid-cols-[auto_max-content]">
                      <div className="grid w-full grid-cols-[repeat(2,_max-content)] items-center justify-between text-subtext xl:gap-10">
                        <p>Подписка истекает:</p>
                        <div className="flex items-center space-x-4">
                          <p className="text-base text-almostwhite xl:text-xl">
                            20/12/2023
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
                        <p className="text-lg text-almostwhite xl:text-xl">3</p>
                        <button className="h-9 w-28 rounded-xl bg-element px-4 py-2 text-xs shadow-md transition-all hover:bg-opacity-60 lg:w-28">
                          Докупить
                        </button>
                      </div>
                    </div>
                    <div className="grid w-full grid-cols-[repeat(2,_max-content)] items-center justify-between text-subtext xl:gap-10">
                      <p>Всего раффлов в сутки:</p>
                      <div className="flex items-center space-x-4">
                        <p className="text-lg text-almostwhite xl:text-xl">5</p>
                        <button className="h-9 w-28 rounded-xl bg-element px-4 py-2 text-xs shadow-md transition-all hover:bg-opacity-60 lg:w-28">
                          Добавить
                        </button>
                      </div>
                    </div>
                    <div className="grid w-full grid-cols-[repeat(2,_max-content)] items-center justify-between text-subtext xl:gap-10">
                      <p>Макс. кол-во аккаунтов:</p>
                      <div className="flex items-center space-x-4">
                        <p className="text-lg text-almostwhite xl:text-xl">
                          250
                        </p>
                        <button className="h-9 w-28 rounded-xl bg-element px-4 py-2 text-xs shadow-md transition-all hover:bg-opacity-60 lg:w-28">
                          Добавить
                        </button>
                      </div>
                    </div>
                  </div>
                ) : status === "authenticated" ? (
                  <button
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={() => {
                      console.log("whop logic here");
                    }}
                    className="w-5/6 cursor-pointer self-center justify-self-center rounded-xl bg-raffleBot p-6 text-center font-montserratBold text-2xl text-bg shadow-md transition-all hover:bg-opacity-60"
                  >
                    Купить подписку
                  </button>
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
            <div className="mt-16 text-sm xl:text-base">
              <div className="text-xl">Инструкции</div>
              <div className="mt-8">
                <div className="grid cursor-pointer grid-cols-[repeat(2,_max-content)] justify-between rounded-xl border-2 border-subline bg-bg px-8 py-4 text-subtext shadow-md transition-all hover:bg-opacity-60">
                  <p className="mr-3">Как использовать бота?</p>
                  <Plus />
                </div>
              </div>
              <div className="mt-3 space-x-2">
                <div className="grid cursor-pointer grid-cols-[repeat(2,_max-content)] justify-between rounded-xl border-2 border-subline bg-bg px-8 py-4 text-subtext shadow-md transition-all hover:bg-opacity-60">
                  <p className="mr-3">Как загрузить аккаунты?</p>
                  <Plus />
                </div>
              </div>
              <div className="mt-3 space-x-2">
                <div className="grid cursor-pointer grid-cols-[repeat(2,_max-content)] justify-between rounded-xl border-2 border-subline bg-bg px-8 py-4 text-subtext shadow-md transition-all hover:bg-opacity-60">
                  <p className="mr-3">Как загрузить аккаунты из антика?</p>
                  <Plus />
                </div>
              </div>
              <div className="mt-3 space-x-2">
                <div className="grid cursor-pointer grid-cols-[repeat(2,_max-content)] justify-between rounded-xl border-2 border-subline bg-bg px-8 py-4 text-subtext shadow-md transition-all hover:bg-opacity-60">
                  <p className="mr-3">Где купить аккаунты?</p>
                  <Plus />
                </div>
              </div>
              <div className="mt-3 space-x-2">
                <div className="grid cursor-pointer grid-cols-[repeat(2,_max-content)] justify-between rounded-xl border-2 border-subline bg-bg px-8 py-4 text-subtext shadow-md transition-all hover:bg-opacity-60">
                  <p className="mr-3">Как настраивать конфигурации?</p>
                  <Plus />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-[repeat(4,_max-content)] gap-6 text-center text-sm text-subtext">
            <button
              className={`grid h-52 justify-items-center rounded-xl border-2 border-dashed border-subline p-4 transition-colors ${
                data?.user.raffleBotUser && status === "authenticated"
                  ? "cursor-pointer hover:bg-neutral-900"
                  : "cursor-not-allowed"
              }`}
              disabled={
                !(data?.user.raffleBotUser && status === "authenticated")
              }
            >
              <div className="mb-2 grid h-16 w-16 items-center">
                <img src="../../../twitter.png" alt="" className="w-16" />
              </div>
              <p className="">Загрузить</p>
              <p className="">твиттер</p>
              <div className="mt-4 flex items-center space-x-1 text-subline">
                <Forbidden />
                <div className="text-xs">Файл не выбран</div>
              </div>
            </button>
            <button
              className={`grid h-52 justify-items-center rounded-xl border-2 border-dashed border-subline p-4 transition-colors ${
                data?.user.raffleBotUser && status === "authenticated"
                  ? "cursor-pointer hover:bg-neutral-900"
                  : "cursor-not-allowed"
              }`}
              disabled={
                !(data?.user.raffleBotUser && status === "authenticated")
              }
            >
              <div className="mb-2 grid h-16 w-16 items-center">
                <img src="../../../discord.png" alt="" className="w-16" />
              </div>
              <p className="">Загрузить</p>
              <p className="">дискорд</p>
              <div className="mt-4 flex items-center space-x-1 text-subline">
                <Forbidden />
                <div className="text-xs">Файл не выбран</div>
              </div>
            </button>
            <button
              className={`grid h-52 justify-items-center rounded-xl border-2 border-dashed border-subline p-4 transition-colors ${
                data?.user.raffleBotUser && status === "authenticated"
                  ? "cursor-pointer hover:bg-neutral-900"
                  : "cursor-not-allowed"
              }`}
              disabled={
                !(data?.user.raffleBotUser && status === "authenticated")
              }
            >
              <div className="mb-2 grid h-16 w-16 items-center">
                <img src="../../../metamask.png" alt="" className="w-16" />
              </div>
              <p className="">Загрузить</p>
              <p className="">кошельки</p>
              <div className="mt-4 flex items-center space-x-1 text-subline">
                <Forbidden />
                <div className="text-xs">Файл не выбран</div>
              </div>
            </button>
            <button
              className={`grid h-52 justify-items-center rounded-xl border-2 border-dashed border-subline p-4 transition-colors ${
                data?.user.raffleBotUser && status === "authenticated"
                  ? "cursor-pointer hover:bg-neutral-900"
                  : "cursor-not-allowed"
              }`}
              disabled={
                !(data?.user.raffleBotUser && status === "authenticated")
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
              <p className="">аккаунты</p>
              <p className="">из антика</p>
              <div className="mt-4 flex items-center space-x-1 text-subline">
                <Forbidden />
                <div className="text-xs">Файл не выбран</div>
              </div>
            </button>
            <button
              className={`grid h-52 justify-items-center rounded-xl border-2 border-dashed border-subline p-4 transition-colors ${
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
                <Forbidden />
                <div className="text-xs">Файл не выбран</div>
              </div>
            </button>
            <button
              className={`grid h-52 justify-items-center rounded-xl border-2 border-dashed border-subline p-4 transition-colors ${
                data?.user.raffleBotUser && status === "authenticated"
                  ? "cursor-pointer hover:bg-neutral-900"
                  : "cursor-not-allowed"
              }`}
              disabled={
                !(data?.user.raffleBotUser && status === "authenticated")
              }
            >
              <div className="mb-2 grid h-16 w-16 items-center">
                <AtSymbolIcon />
              </div>
              <p className="">Загрузить</p>
              <p className="">почты</p>
              <div className="mt-4 flex items-center space-x-1 text-subline">
                <Forbidden />
                <div className="text-xs">Файл не выбран</div>
              </div>
            </button>
            <div
              className={`col-span-2 grid h-32 items-center justify-items-center rounded-xl bg-element p-4 text-2xl text-almostwhite transition-colors ${
                data?.user.raffleBotUser && status === "authenticated"
                  ? "cursor-pointer hover:bg-neutral-900"
                  : "cursor-not-allowed"
              }`}
            >
              Изменить аккаунты
            </div>
          </div>
          <div className="grid h-full w-full grid-rows-[max-content_max-content] content-between justify-self-center">
            <div className="h-max rounded-xl border-2 border-subline px-8 pb-20 pt-8">
              <p className="mb-10 text-xl">Настроить конфигурации</p>
              <div className="grid grid-cols-2 grid-rows-[repeat(2,_max-content)] gap-4">
                <div className="h-max rounded-xl bg-element p-3 sm:p-4">
                  <p className="mt-4 w-full text-center text-5xl">1</p>
                  <div className="mt-6 grid grid-cols-[100px_auto] items-center justify-between text-xs sm:gap-x-2 sm:gap-y-2">
                    <p className="w-max text-subtext">Начальный: </p>
                    <p className="text-end text-base text-almostwhite">24</p>
                    <p className="w-max text-subtext">Последний: </p>
                    <p className="text-end text-base text-almostwhite">513</p>
                    <p className="w-max text-subtext">Исключения: </p>
                    <p className="text-end text-base text-almostwhite">17</p>
                  </div>
                </div>
                <div className="h-max rounded-xl bg-element p-3 sm:p-4">
                  <p className="mt-4 w-full text-center text-5xl">2</p>
                  <div className="mt-6 grid grid-cols-[100px_auto] items-center justify-between text-xs sm:gap-x-2 sm:gap-y-2">
                    <p className="w-max text-subtext">Начальный: </p>
                    <p className="text-end text-base text-almostwhite">24</p>
                    <p className="w-max text-subtext">Последний: </p>
                    <p className="text-end text-base text-almostwhite">513</p>
                    <p className="w-max text-subtext">Исключения: </p>
                    <p className="text-end text-base text-almostwhite">17</p>
                  </div>
                </div>
                <div className="h-max rounded-xl bg-element p-3 sm:p-4">
                  <p className="mt-4 w-full text-center text-5xl">3</p>
                  <div className="mt-6 grid grid-cols-[100px_auto] items-center justify-between text-xs sm:gap-x-2 sm:gap-y-2">
                    <p className="w-max text-subtext">Начальный: </p>
                    <p className="text-end text-base text-almostwhite">24</p>
                    <p className="w-max text-subtext">Последний: </p>
                    <p className="text-end text-base text-almostwhite">513</p>
                    <p className="w-max text-subtext">Исключения: </p>
                    <p className="text-end text-base text-almostwhite">17</p>
                  </div>
                </div>
                <div className="h-max rounded-xl bg-element p-3 sm:p-4">
                  <p className="mt-4 w-full text-center text-5xl">4</p>
                  <div className="mt-6 grid grid-cols-[100px_auto] items-center justify-between text-xs sm:gap-x-2 sm:gap-y-2">
                    <p className="w-max text-subtext">Начальный: </p>
                    <p className="text-end text-base text-almostwhite">24</p>
                    <p className="w-max text-subtext">Последний: </p>
                    <p className="text-end text-base text-almostwhite">513</p>
                    <p className="w-max text-subtext">Исключения: </p>
                    <p className="text-end text-base text-almostwhite">17</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`mt-8 grid h-32 items-center justify-items-center rounded-xl bg-element p-4 text-2xl text-almostwhite transition-colors ${
                data?.user.raffleBotUser && status === "authenticated"
                  ? "cursor-pointer hover:bg-neutral-900"
                  : "cursor-not-allowed"
              }`}
            >
              Выгрузить базу аккаунтов
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default RaffleList;
