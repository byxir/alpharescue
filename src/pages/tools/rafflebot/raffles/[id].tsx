/* eslint-disable @next/next/no-img-element */
import LaunchButton from "~/components/LaunchButton/LaunchButton";
import SidebarLayout from "~/components/SidebarLayout";
import { raffles } from "~/utils/tempraffles";
import { useState } from "react";
import { RangeSlider } from "~/components/RangeSlider";
import { accounts } from "~/utils/tempaccounts";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

type IRaffle = {
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
};

const Raffle = () => {
  const raffleId = useRouter().query.id;
  console.log("raffleId -> ", raffleId);

  const raffle: UseQueryResult<IRaffle> = useQuery<IRaffle>(
    ["raffle"],
    async () => {
      const res = await axios.get(
        `https://alpharescue.online/raffles/c7daef08-419b-48f3-a0da-643eb466baad`
      );
      console.log("response -> ", res);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res.data;
    }
  );

  const r = raffles[0];
  const [rangeValue, setRangeValue] = useState<number[]>([0, 1000]);
  const handleChangeRange = (e: Event, newValue: number | number[]) => {
    setRangeValue(newValue as number[]);
  };
  const [activeAccounts, setActiveAccounts] = useState<string[]>([]);
  const [activeConfiguration, setActiveConfiguration] = useState(0);

  const { data, status } = useSession();

  const handleActive = (account: string) => {
    if (activeAccounts.includes(account)) {
      const newActiveAccounts = activeAccounts.filter((a) => {
        if (a != account) {
          return a;
        }
      });
      setActiveAccounts(newActiveAccounts);
    } else {
      setActiveAccounts((prevAccounts) => [...prevAccounts, account]);
    }
  };
  const handleChangeConfiguration = (newActiveConfiguration: number) => {
    if (data?.user.raffleBotUser && status === "authenticated") {
      setActiveConfiguration(newActiveConfiguration);
    }
  };
  return (
    <SidebarLayout>
      <div className="grid w-full border-subline text-almostwhite 2xl:h-screen 2xl:grid-cols-[43%_57%]">
        {raffle ? (
          <div className="border-subline 2xl:border-r-2">
            <div className="grid border-b-2 border-subline pb-12">
              <div className="h-32 w-full md:h-44">
                <img
                  src={raffle.data?.banner}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative px-6 md:px-14">
                <div
                  className={`text-${String(
                    raffle.data?.platform
                  )} ml-28 mt-3 capitalize md:ml-32`}
                >
                  {raffle.data?.platform}
                </div>
                <div className="absolute -top-16 grid h-24 w-24 items-center justify-items-center rounded-xl bg-element md:-top-20 md:h-28 md:w-28">
                  <img
                    src={raffle.data?.profilePicture}
                    alt=""
                    className="h-20 w-20 rounded-xl md:h-24 md:w-24"
                  />
                </div>
              </div>
              <div className="px-6 md:px-14">
                <div
                  className={`mt-6 cursor-pointer font-benzin text-4xl hover:underline`}
                >
                  {raffle.data?.name}
                </div>
                <div className="mt-3 text-subtext">
                  By {raffle.data?.platform}
                </div>
                <div className="mt-10 grid grid-cols-[repeat(2,_max-content)] gap-3 sm:grid-cols-[repeat(3,_max-content)] sm:gap-6">
                  <div className="grid h-20 grid-rows-[repeat(2,_max-content)]">
                    <div className="h-max text-2xl">
                      {raffle.data?.hold} ETH
                    </div>
                    <div className="text-md text-sm text-subtext">
                      Сумма холда
                    </div>
                  </div>
                  <div className="grid h-20 grid-rows-[repeat(2,_max-content)]">
                    <div className="text-2xl">
                      {raffle.data?.subscribers &&
                      raffle.data.subscribers >= 10000
                        ? `${raffle.data?.subscribers / 1000}K`
                        : raffle.data?.subscribers}
                    </div>
                    <div className="text-md text-sm text-subtext">
                      <p>Подписчики в </p>
                      <p>Twitter</p>
                    </div>
                  </div>
                  <div className="grid h-20 grid-rows-[repeat(2,_max-content)]">
                    <div className="h-max text-2xl">
                      {raffle.data?.deadline}
                    </div>
                    <div className="text-md text-sm text-subtext">Дедлайн</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-12 grid grid-rows-[max-content_max-content] px-6 md:px-14 2xl:mb-0">
              <div className="mb-8 mt-12 text-3xl">Требования для входа</div>
              <div className="grid gap-4">
                {raffle.data?.requirements.map((rq) => (
                  <div
                    className="grid h-12 grid-cols-[50px_70px_auto] gap-4"
                    key={rq.clarification}
                  >
                    <div className="grid h-12 w-12 items-center">
                      <img
                        src={`../../../../${rq.platform}.png`}
                        alt=""
                        className="w-full"
                      />
                    </div>
                    <div className="grid items-center text-xl">{rq.action}</div>
                    <div className="grid items-center text-sm">
                      {rq.clarification}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
        <div className="border-t-2 border-subline px-4 pt-14 md:px-10 2xl:border-none 2xl:pt-11">
          <div className="grid items-center justify-items-center sm:grid-cols-[max-content_max-content] sm:justify-between">
            <div className="mb-14 grid justify-items-center sm:mb-3 sm:justify-items-start md:mb-4">
              <div className="mb-6 text-center text-xl sm:w-48 sm:text-start md:w-auto lg:w-64 lg:text-2xl xl:w-auto 2xl:w-64 2xls:w-auto">
                Выбрать готовую конфигурацию
              </div>
              <div className="grid grid-cols-[repeat(4,_max-content)] gap-2">
                <div
                  onClick={() => handleChangeConfiguration(1)}
                  className={`grid h-12 w-12 cursor-pointer items-center justify-items-center rounded-lg bg-element text-2xl shadow-md transition-colors hover:bg-neutral-900 ${
                    activeConfiguration === 1
                      ? "border-2 border-almostwhite"
                      : ""
                  }`}
                >
                  1
                </div>
                <div
                  onClick={() => handleChangeConfiguration(2)}
                  className={`grid h-12 w-12 cursor-pointer items-center justify-items-center rounded-lg bg-element text-2xl shadow-md transition-colors hover:bg-neutral-900 ${
                    activeConfiguration === 2
                      ? "border-2 border-almostwhite"
                      : ""
                  }`}
                >
                  2
                </div>
                <div
                  onClick={() => handleChangeConfiguration(3)}
                  className={`grid h-12 w-12 cursor-pointer items-center justify-items-center rounded-lg bg-element text-2xl shadow-md transition-colors hover:bg-neutral-900 ${
                    activeConfiguration === 3
                      ? "border-2 border-almostwhite"
                      : ""
                  }`}
                >
                  3
                </div>
                <div
                  onClick={() => handleChangeConfiguration(4)}
                  className={`grid h-12 w-12 cursor-pointer items-center justify-items-center rounded-lg bg-element text-2xl shadow-md transition-colors hover:bg-neutral-900 ${
                    activeConfiguration === 4
                      ? "border-2 border-almostwhite"
                      : ""
                  }`}
                >
                  4
                </div>
              </div>
            </div>
            <LaunchButton
              authorized={
                data?.user.raffleBotUser && status === "authenticated"
              }
            >
              <p className="text-2xl">Запустить</p>
              <p className="text-2xl">абуз</p>
            </LaunchButton>
          </div>
          <div className="mt-16 grid justify-items-center text-center">
            <div className="grid w-5/6 grid-cols-1 items-center justify-center md:w-full md:grid-cols-[max-content_300px] md:justify-between">
              <div className="mb-16 w-full text-xl md:mb-0 lg:text-2xl">
                Настроить конфигурацию
              </div>
              {data?.user.raffleBotUser && status === "authenticated" ? (
                <div className="mr-5 grid w-full grid-cols-[max-content_auto_max-content] items-center">
                  <div className="mr-5">0</div>
                  <RangeSlider
                    getAriaLabel={() => "Account range"}
                    value={rangeValue}
                    onChange={handleChangeRange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                    step={5}
                  />
                  <div className="ml-5">All</div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-12">
            <div className="grid grid-cols-[auto_40px] gap-2">
              <div className="mb-6 grid grid-cols-[6%_20%_20%_27%_27%] rounded-xl border-2 border-subtext bg-element px-6 py-4 text-xs text-subtext sm:text-base">
                <span>#</span>
                <span>Twitter</span>
                <span>Discord</span>
                <span>Metamask</span>
                <span className="">Proxy</span>
              </div>
              <div className="mb-6 h-10 self-center rounded-lg p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-full w-full text-subtext"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
            </div>
            {data?.user.raffleBotUser && status === "authenticated" ? (
              <div className="h-[calc(100vh-440px)] 2xl:overflow-auto">
                {accounts.map((a, index) => (
                  <div
                    className="grid grid-cols-[auto_40px] gap-2"
                    key={a.Twitter}
                  >
                    <div className="mb-4 h-14 w-full rounded-xl border border-subline"></div>
                    <div
                      onClick={() => handleActive(a.id)}
                      className="mb-4 h-10 cursor-pointer self-center rounded-lg border border-subline p-2.5"
                    >
                      {activeAccounts.includes(a.id) ? (
                        <div className="h-full w-full rounded-md bg-accent"></div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 h-full w-full items-center justify-items-center font-montserratRegular text-subtext">
                <p>
                  Вы не можете добавлять аккаунты и запускать абуз без подписки
                  на RaffleBot.
                </p>
                <br></br>
                <div className="flex space-x-1">
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
    </SidebarLayout>
  );
};

export default Raffle;
