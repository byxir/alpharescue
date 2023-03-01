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
      <div className="grid grid-cols-[max-content_max-content] justify-between">
        <h1 className="font-benzin text-4xl">Мои Раффлы</h1>
        <div className="grid grid-cols-5 gap-4 font-montserratBold">
          <div
            onClick={() => setCurrent(1)}
            className={`grid cursor-pointer items-center justify-items-center rounded-xl border-2 px-6 font-bold transition-colors  ${
              current === 1 ? "border-accent" : "border-subline"
            }`}
          >
            All
          </div>
          <div
            onClick={() => setCurrent(2)}
            className={`grid cursor-pointer items-center justify-items-center rounded-xl border-2 px-6 font-bold transition-colors  ${
              current === 2 ? "border-accent" : "border-subline"
            }`}
          >
            Premint
          </div>
          <div
            onClick={() => setCurrent(3)}
            className={`grid cursor-pointer items-center justify-items-center rounded-xl border-2 px-6 font-bold transition-colors  ${
              current === 3 ? "border-accent" : "border-subline"
            }`}
          >
            Alphabot
          </div>
          <div
            onClick={() => setCurrent(4)}
            className={`grid cursor-pointer items-center justify-items-center rounded-xl border-2 px-6 font-bold transition-colors  ${
              current === 4 ? "border-accent" : "border-subline"
            }`}
          >
            Superfull
          </div>
          <div
            onClick={() => setCurrent(5)}
            className={`grid cursor-pointer items-center justify-items-center rounded-xl border-2 px-6 font-bold transition-colors  ${
              current === 5 ? "border-accent" : "border-subline"
            }`}
          >
            FreeNFT
          </div>
        </div>
      </div>
      <div className="mt-14 mb-10 grid justify-items-center">
        <div className="grid grid-cols-[repeat(3,_max-content)] gap-4 font-bold">
          <div className="flex h-12 w-72 items-center space-x-1 rounded-xl bg-element pl-6 pr-2 text-subtext">
            <Search />
            <input
              placeholder="Поиск"
              className="h-full w-full border-none bg-element placeholder-subtext outline-none"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-flow-row grid-cols-3 gap-7">
        {raffles.map((r) => (
          <div className="grid rounded-xl bg-element shadow-md" key={r.id}>
            <div className="h-28">
              <img
                src={r.benner}
                className="h-full w-full rounded-t-xl object-cover"
                alt=""
              />
            </div>
            <div className="mt-3 px-6 pb-6">
              <div
                className={`text-${r.platform} ml-24 mb-1.5 font-bold capitalize`}
              >
                {r.platform}
              </div>
              <div className="grid grid-cols-[80%_48px] items-center justify-between">
                <div className="relative mt-1 h-max font-benzin text-2xl">
                  {r.name}
                  <div className="absolute -top-24 grid h-20 w-20 items-center justify-items-center rounded-lg bg-element shadow-md">
                    <img
                      src={r.profilePicture}
                      className="h-16 w-16 rounded-lg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="grid h-max w-12 justify-items-center">
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
              <div className="mt-10 grid grid-cols-[max-content_max-content_max-content_auto] gap-6">
                <div className="">
                  <div className="text-lg font-bold text-almostwhite">
                    0.34 ETH
                  </div>
                  <div className="text-xs font-semibold text-subtext">
                    <p>Сумма холда</p>
                  </div>
                </div>
                <div className="">
                  <div className="text-lg font-bold text-almostwhite">66K</div>
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
    </SidebarLayout>
  );
};

export default RaffleList;
