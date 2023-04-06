/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FilterDropdown from "~/components/FilterDropdown";
import SidebarLayout from "~/components/SidebarLayout";
import { Filter } from "~/design/icons/Filter";
import { Search } from "~/design/icons/Search";
import { Star } from "~/design/icons/Star";
import { YourLink } from "~/design/icons/YourLink";

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
  subscribers: string;
  TotalSupply: string;
  NumberOfWinners: string;
};

const RaffleList = () => {
  const [current, setCurrent] = useState(1);
  const router = useRouter();
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  const raffles = useQuery<IRaffle[]>(
    ["raffles"],
    async () => {
      const res = await fetch(
        `https://alpharescue.online/raffles?platform=${String(
          router.query.platform
        )}`
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res.json();
    },
    {
      enabled: false,
    }
  );

  const determineColor = (platform = String(router.query.platform)) => {
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

  useEffect(() => {
    if (!router.isReady) return;
    void raffles.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query.platform]);

  return (
    <SidebarLayout>
      <div className="py-6">
        <div className="px-4 md:p-6 2xl:p-14">
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
            <p
              className={`row-start-2 ml-3 mt-1 font-montserratBold font-bold`}
              style={
                router.query.platform
                  ? {
                      color: determineColor(String(router.query.platform)),
                    }
                  : {}
              }
            >
              {router.query.platform}
            </p>
          </div>
          <div className="mb-10 mt-10 grid justify-items-center">
            <div className="grid grid-cols-[repeat(2,_max-content)] justify-center gap-4 font-bold xl:grid-cols-[repeat(3,_max-content)]">
              <div className="flex h-12 w-40 items-center space-x-1 rounded-xl bg-element pl-6 pr-2 text-sm text-subtext md:w-72 md:text-base">
                <Search />
                <input
                  placeholder="Поиск"
                  className="h-full w-full border-none bg-element placeholder-subtext outline-none"
                />
              </div>
              <FilterDropdown />
              <div className="col-span-2 flex h-12 w-max cursor-pointer items-center space-x-2 justify-self-center rounded-xl bg-element px-6 text-xs text-subtext transition-all hover:bg-opacity-60 md:text-base xl:col-span-1">
                <YourLink />
                <p>Загрузить свою ссылку</p>
              </div>
            </div>
          </div>
          <div className="grid grid-flow-row grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {raffles.data?.map((r) => (
              <Link
                href={`/tools/rafflebot/raffles/${r.id}`}
                className="min-w-104 relative grid grid-rows-[112px_auto] rounded-xl bg-element shadow-md"
                key={r.id}
              >
                <div className="relative h-28">
                  <img
                    src={r.banner ? r.banner : "../../../../herobg.png"}
                    className="h-full w-full rounded-t-xl object-cover"
                    alt=""
                  />
                  {!r.banner && (
                    <div className="absolute right-8 top-1/3 flex space-x-3 font-benzin text-2xl text-bg 2xl:text-3xl">
                      ALPHA RESCUE
                    </div>
                  )}
                </div>
                <div className="mt-3 grid px-6 pb-6">
                  <div
                    className={`justify ml-24`}
                    style={{ color: determineColor(r.platform) }}
                  >
                    {r.platform}
                  </div>
                  <div className="grid grid-cols-[auto_48px] items-center justify-between">
                    <div className="mt-3 h-max font-benzin text-2xl">
                      {r.name}
                      <div className="absolute top-18 grid h-20 w-20 items-center justify-items-center rounded-full bg-element">
                        <img
                          src={r.profilePicture}
                          className="h-16 w-16 rounded-full"
                          alt=""
                        />
                      </div>
                    </div>

                    <div className="mt-7 grid h-max w-12 justify-items-center">
                      <Star />
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-semibold text-subtext">
                    Дедлайн - {r.deadline ? r.deadline : "Не указано"}
                  </div>
                  <div className="mt-8 grid grid-cols-[max-content_max-content] grid-rows-[max-content_max-content] justify-start gap-6 self-end sm:grid-cols-[repeat(4,_max-content)] md:grid-cols-[max-content_max-content] md:grid-rows-[max-content_max-content] 2xls:grid-cols-[max-content_max-content_max-content_auto] 2xls:grid-rows-1 2xls:justify-evenly">
                    <div className="">
                      <div className="text-lg font-bold text-almostwhite">
                        {r.hold ? r.hold : 0} ETH
                      </div>
                      <div className="text-xs font-semibold text-subtext">
                        <p>Сумма холда</p>
                      </div>
                    </div>
                    <div className="ml-8 2xls:ml-0">
                      <div className="text-lg font-bold text-almostwhite">
                        {r.subscribers ? r.subscribers : "Не указано"}
                      </div>
                      <div className="text-xs font-semibold text-subtext">
                        <p>Подписчики</p>
                        <p>в Twitter</p>
                      </div>
                    </div>
                    <div className="">
                      <div className="text-lg font-bold text-almostwhite">
                        {r.NumberOfWinners ? r.NumberOfWinners : "Не указано"}
                      </div>
                      <div className="text-xs font-semibold text-subtext">
                        <p>Количество</p>
                        <p>Победителей</p>
                      </div>
                    </div>
                    <div className="ml-10 grid grid-cols-2 grid-rows-2 gap-1 2xls:ml-0">
                      {r.requirements.filter((rq) => rq.platform === "Twitter")
                        .length > 0 ? (
                        <div className="h-8 w-8">
                          <img src="../../../../twitter.png" alt="" />
                        </div>
                      ) : null}
                      {r.requirements.filter((rq) => rq.platform === "Discord")
                        .length > 0 ? (
                        <div className="h-8 w-8">
                          <img src="../../../../discord.png" alt="" />
                        </div>
                      ) : null}
                      {r.hold ? (
                        <div className="h-8 w-8">
                          <img src="../../../../metamask.png" alt="" />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default RaffleList;
