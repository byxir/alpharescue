import localFont from "next/font/local";
import { useState } from "react";
import SidebarLayout from "~/components/SidebarLayout";
import { Filter } from "~/design/icons/Filter";
import { Search } from "~/design/icons/Search";
import { YourLink } from "~/design/icons/YourLink";
import { raffles } from "~/utils/tempraffles";

/* eslint-disable @next/next/no-img-element */
const RaffleList = () => {
  const [current, setCurrent] = useState(1);

  return (
    <SidebarLayout>
      <div className="py-6">
        <div className="px-4 md:p-10 2xl:p-14">
          <div
            className={`grid grid-cols-1 justify-between font-sans 2xl:grid-cols-[max-content_max-content]`}
          >
            <h1 className="font-benzin text-3xl md:text-4xl">Список Раффлов</h1>
            <div className="mt-10 grid w-max grid-cols-2 grid-rows-2 gap-4 justify-self-center font-montserratBold md:grid-cols-4 md:grid-rows-1 2xl:mt-0">
              <div
                onClick={() => setCurrent(1)}
                className={`grid h-10 cursor-pointer items-center justify-items-center rounded-xl border-2 px-4 text-xs font-bold transition-colors md:text-base xl:px-6  ${
                  current === 1 ? "border-accent" : "border-subline"
                }`}
              >
                Подборка
              </div>
              <div
                onClick={() => setCurrent(2)}
                className={`grid h-10 cursor-pointer items-center justify-items-center rounded-xl border-2 px-4 text-xs font-bold transition-colors md:text-base xl:px-6  ${
                  current === 2 ? "border-accent" : "border-subline"
                }`}
              >
                Топ за день
              </div>
              <div
                onClick={() => setCurrent(3)}
                className={`grid h-10 cursor-pointer items-center justify-items-center rounded-xl border-2 px-4 text-xs font-bold transition-colors md:text-base xl:px-6  ${
                  current === 3 ? "border-accent" : "border-subline"
                }`}
              >
                Топ за неделю
              </div>
              <div
                onClick={() => setCurrent(4)}
                className={`grid h-10 cursor-pointer items-center justify-items-center rounded-xl border-2 px-4 text-xs font-bold transition-colors md:text-base xl:px-6  ${
                  current === 4 ? "border-accent" : "border-subline"
                }`}
              >
                Новые
              </div>
            </div>
            <p className="row-start-2 ml-3 mt-1 font-bold text-premint">
              Premint
            </p>
          </div>
          <div className="mt-10 mb-10 grid justify-items-center">
            <div className="grid grid-cols-[repeat(2,_max-content)] justify-center gap-4 font-bold xl:grid-cols-[repeat(3,_max-content)]">
              <div className="flex h-12 w-40 items-center space-x-1 rounded-xl bg-element pl-6 pr-2 text-sm text-subtext md:w-72 md:text-base">
                <Search />
                <input
                  placeholder="Поиск"
                  className="h-full w-full border-none bg-element placeholder-subtext outline-none"
                />
              </div>
              <div className="flex h-12 w-max cursor-pointer items-center space-x-1 rounded-xl bg-element px-6 text-subtext transition-colors hover:bg-neutral-900">
                <Filter />
                <p className="hidden md:block">Фильтр</p>
              </div>
              <div className="col-span-2 flex h-12 w-max cursor-pointer items-center space-x-2 justify-self-center rounded-xl bg-element px-6 text-xs text-subtext transition-colors hover:bg-neutral-900 md:text-base xl:col-span-1">
                <YourLink />
                <p>Загрузить свою ссылку</p>
              </div>
            </div>
          </div>
          <div className="grid grid-flow-row grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {raffles.map((r) => (
              <div
                className="min-w-104 grid rounded-xl bg-element shadow-md"
                key={r.id}
              >
                <div className="h-28">
                  <img
                    src={r.benner}
                    className="h-full w-full rounded-t-xl object-cover"
                    alt=""
                  />
                </div>
                <div className="mt-3 px-6 pb-6">
                  <div className="grid grid-cols-[auto_48px] items-center justify-between">
                    <div className="relative mt-8 h-max font-benzin text-2xl">
                      {r.name}
                      <div className="absolute -top-24 grid h-20 w-20 items-center justify-items-center rounded-xl bg-element shadow-md">
                        <img
                          src={r.profilePicture}
                          className="h-16 w-16 rounded-xl"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="mt-7 grid h-max w-12 justify-items-center">
                      <img
                        src="../../../../star.png"
                        className="h-6 w-6"
                        alt="favorite"
                      />
                    </div>
                  </div>
                  <div className="mt-2 font-semibold text-subtext">
                    By {r.author}
                  </div>
                  <div className="mt-10 grid grid-cols-[max-content_max-content] grid-rows-[max-content_max-content] justify-evenly gap-6 sm:grid-cols-[repeat(4,_max-content)] md:grid-cols-[max-content_max-content] md:grid-rows-[max-content_max-content] 2xls:grid-cols-[max-content_max-content_max-content_auto] 2xls:grid-rows-1">
                    <div className="">
                      <div className="text-lg font-bold text-almostwhite">
                        0.34 ETH
                      </div>
                      <div className="text-xs font-semibold text-subtext">
                        <p>Сумма холда</p>
                      </div>
                    </div>
                    <div className="">
                      <div className="text-lg font-bold text-almostwhite">
                        66K
                      </div>
                      <div className="text-xs font-semibold text-subtext">
                        <p>Подписчики</p>
                        <p>в Twitter</p>
                      </div>
                    </div>
                    <div className="">
                      <div className="text-lg font-bold text-almostwhite">
                        10/06/2003
                      </div>
                      <div className="text-xs font-semibold text-subtext">
                        <p>Дедлайн</p>
                      </div>
                    </div>
                    <div className="grid w-full grid-cols-[max-content_max-content] grid-rows-2 justify-end gap-1">
                      <div className="h-8 w-8">
                        <img src="../../../../metamask.png" alt="" />
                      </div>
                      <div className="h-8 w-8">
                        <img src="../../../../twitter.png" alt="" />
                      </div>
                      <div className="h-8 w-8">
                        <img src="../../../../discord.png" alt="" />
                      </div>
                      <div className="h-8 w-8">
                        <img src="../../../../nfticon.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default RaffleList;
