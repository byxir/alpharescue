/* eslint-disable @next/next/no-img-element */
import LaunchButton from "~/components/LaunchButton/LaunchButton";
import SidebarLayout from "~/components/SidebarLayout";
import { raffles } from "~/utils/tempraffles";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { RangeSlider } from "~/components/RangeSlider";
import { accounts } from "~/utils/tempaccounts";

const Raffle = () => {
  const r = raffles[0];
  const [rangeValue, setRangeValue] = useState<number[]>([0, 1000]);
  const handleChangeRange = (e: Event, newValue: number | number[]) => {
    setRangeValue(newValue as number[]);
  };
  const [activeAccounts, setActiveAccounts] = useState<string[]>([]);

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
  return (
    <SidebarLayout>
      <div className="grid w-full border-subline text-almostwhite 2xl:h-screen 2xl:grid-cols-[43%_57%]">
        {r ? (
          <div className="border-subline 2xl:border-r-2">
            <div className="grid border-b-2 border-subline pb-12">
              <div className="h-32 w-full md:h-44">
                <img
                  src={r.benner}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative px-6 md:px-14">
                <div
                  className={`text-${r.platform} mt-3 ml-28 capitalize md:ml-32`}
                >
                  {r.platform}
                </div>
                <div className="absolute -top-16 grid h-24 w-24 items-center justify-items-center rounded-xl bg-element md:-top-20 md:h-28 md:w-28">
                  <img
                    src={r.profilePicture}
                    alt=""
                    className="h-20 w-20 rounded-xl md:h-24 md:w-24"
                  />
                </div>
              </div>
              <div className="px-6 md:px-14">
                <div
                  className={`mt-6 cursor-pointer font-benzin text-4xl hover:underline`}
                >
                  {r.name}
                </div>
                <div className="mt-3 text-subtext">By {r.author}</div>
                <div className="mt-10 grid grid-cols-[repeat(3,_max-content)] gap-6">
                  <div className="grid h-20 grid-rows-[repeat(2,_max-content)]">
                    <div className="h-max text-2xl">{r.hold} ETH</div>
                    <div className="text-md text-sm text-subtext">
                      Сумма холда
                    </div>
                  </div>
                  <div className="grid h-20 grid-rows-[repeat(2,_max-content)]">
                    <div className="text-2xl">
                      {r.subs >= 10000 ? `${r.subs / 1000}K` : r.subs}
                    </div>
                    <div className="text-md text-sm text-subtext">
                      <p>Подписчики в </p>
                      <p>Twitter</p>
                    </div>
                  </div>
                  <div className="grid h-20 grid-rows-[repeat(2,_max-content)]">
                    <div className="h-max text-2xl">{r.deadline}</div>
                    <div className="text-md text-sm text-subtext">Дедлайн</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-12 grid grid-rows-[max-content_max-content] px-6 md:px-14 2xl:mb-0">
              <div className="mt-12 mb-8 text-3xl">Требования для входа</div>
              <div className="grid gap-4">
                {r.requirements.map((rq) => (
                  <div
                    className="grid h-12 grid-cols-[50px_70px_auto] gap-4"
                    key={rq.specification}
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
                      {rq.specification}
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
                <div className="grid h-12 w-12 cursor-pointer items-center justify-items-center rounded-lg bg-element text-2xl shadow-md transition-colors hover:bg-neutral-900">
                  1
                </div>
                <div className="grid h-12 w-12 cursor-pointer items-center justify-items-center rounded-lg bg-element text-2xl shadow-md transition-colors hover:bg-neutral-900">
                  2
                </div>
                <div className="grid h-12 w-12 cursor-pointer items-center justify-items-center rounded-lg bg-element text-2xl shadow-md transition-colors hover:bg-neutral-900">
                  3
                </div>
                <div className="grid h-12 w-12 cursor-pointer items-center justify-items-center rounded-lg bg-element text-2xl shadow-md transition-colors hover:bg-neutral-900">
                  4
                </div>
              </div>
            </div>
            <LaunchButton />
          </div>
          <div className="mt-16 grid justify-items-center text-center">
            <div className="grid w-5/6 grid-cols-1 items-center justify-center md:w-full md:grid-cols-[max-content_300px] md:justify-between">
              <div className="mb-16 w-full text-xl md:mb-0 lg:text-2xl">
                Настроить конфигурацию
              </div>
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
            </div>
          </div>
          <div className="mt-12">
            <div className="grid grid-cols-[auto_40px] gap-2">
              <div className="mb-6 grid grid-cols-[6%_20%_20%_27%_27%] rounded-xl border-2 border-subtext bg-element py-4 px-6 text-xs text-subtext sm:text-base">
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
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Raffle;
