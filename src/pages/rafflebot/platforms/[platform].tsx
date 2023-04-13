/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import FilterDropdown from "~/components/FilterDropdown";
import LinkModal from "~/components/LinkModal";
import SidebarLayout from "~/components/SidebarLayout";
import { Search } from "~/design/icons/Search";
import { Star } from "~/design/icons/Star";
import { YourLink } from "~/design/icons/YourLink";
import debounce from "lodash.debounce";
import Spinner from "~/components/spinner/Spinner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

type IRaffle = {
  banner: string;
  captcha: string;
  category: string;
  deadline: string;
  hold: number;
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

const RaffleList = () => {
  const router = useRouter();
  const { data } = useSession();
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [sortingMethod, setSortingMethod] = useState("");
  const [raffleState, setRaffleState] = useState<IRaffle[]>([]);
  const [category, setCategory] = useState("selection");
  const [searchText, setSearchText] = useState("");
  const [favoriteRafflesCopy, setFavoriteRafflesCopy] = useState<string[]>([]);
  const [deletedRafflesCopy, setDeletedRafflesCopy] = useState<string[]>([]);

  const me = api.user.getMeWithFavoriteRaffles.useQuery(undefined, {
    enabled: false,
  });

  const raffles = useQuery<IRaffle[]>(
    ["raffles"],
    async () => {
      const res = await axios.get(
        `https://alpharescue.online/raffles?platform=${String(
          router.query.platform
        )}&category=${
          router.query.platform === "Premint" ? category : "selection"
        }`
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res.data;
    },
    {
      enabled: false,
    }
  );

  const addFavoritesMutation = api.user.addFavorite.useMutation();
  const deleteFavoritesMutation = api.user.deleteFavorite.useMutation();

  const handleAddFavorites = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    raffleId: string
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    e.preventDefault();
    //check if favoriteRaffles query already has the current raffle inside, if so then trigger delete mutation, if not then trigger add mutation
    try {
      if (
        (me.data &&
          me.data.favoriteRaffles &&
          me.data.favoriteRaffles.filter((r) => r.trueRaffleId === raffleId)
            .length > 0) ||
        favoriteRafflesCopy.includes(raffleId)
      ) {
        setDeletedRafflesCopy((prev) => [...prev, raffleId]);
        deleteFavoritesMutation.mutate({ raffleId: raffleId });
        setFavoriteRafflesCopy(
          favoriteRafflesCopy.filter((r) => r != raffleId)
        );
      } else {
        setFavoriteRafflesCopy((prev) => [...prev, raffleId]);
        addFavoritesMutation.mutate({ raffleId: raffleId });
        setDeletedRafflesCopy(deletedRafflesCopy.filter((r) => r != raffleId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sortedRaffles = useMemo(() => {
    if (sortingMethod === "subscribers") {
      console.log("sorting by subscribers");
      return raffles.data?.sort((a, b) =>
        a.subscribers <= b.subscribers ? 1 : -1
      );
    } else if (sortingMethod === "hold") {
      console.log("sorting by hold");
      return raffles.data?.filter((r) => r.hold === 0);
    } else if (sortingMethod === "favorites") {
      console.log("sorting by favorites");
      return raffles.data?.filter((r) => {
        if (
          ((me.data &&
            me.data.favoriteRaffles &&
            me.data.favoriteRaffles.filter((rr) => r.id === rr.trueRaffleId)
              .length > 0) ||
            favoriteRafflesCopy.includes(r.id)) &&
          !deletedRafflesCopy.includes(r.id)
        ) {
          return r;
        }
      });
    } else {
      return raffles.data;
    }
  }, [sortingMethod, raffles.data]);

  useEffect(() => {
    if (sortedRaffles) {
      setRaffleState(sortedRaffles);
    }

    return () => setRaffleState([]);
  }, [sortedRaffles]);

  useEffect(() => {
    if (data?.user.id) {
      void me.refetch();
    }
  }, [data?.user.id]);

  useEffect(() => {
    if (!router.isReady) return;
    void raffles.refetch();
    setSortingMethod("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query.platform, category]);

  const updateQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const debouncedUpdate = debounce(updateQuery, 350);

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

  return (
    <SidebarLayout>
      <div className="py-6">
        <div className="px-4 md:p-6 2xl:p-14">
          <div
            className={`grid grid-cols-1 justify-between font-sans 2xl:grid-cols-[max-content_max-content]`}
          >
            <h1 className="font-benzin text-3xl md:text-4xl">Список Раффлов</h1>
            {router.query.platform === "Premint" ? (
              <div className="mt-10 grid w-full grid-cols-2 grid-rows-2 gap-4 justify-self-center font-montserratBold md:w-max md:grid-cols-4 md:grid-rows-1 2xl:mt-0">
                <div
                  onClick={() => {
                    setSortingMethod("");
                    setCategory("selection");
                  }}
                  className={`grid h-10 cursor-pointer items-center justify-items-center rounded-xl border-2 px-4 text-sm font-bold transition-colors md:text-base xl:px-6  ${
                    category === "selection"
                      ? "border-accent"
                      : "border-subline"
                  }`}
                >
                  Подборка
                </div>
                <div
                  onClick={() => {
                    setSortingMethod("");
                    setCategory("topToday");
                  }}
                  className={`grid h-10 cursor-pointer items-center justify-items-center rounded-xl border-2 px-4 text-sm font-bold transition-colors md:text-base xl:px-6  ${
                    category === "topToday" ? "border-accent" : "border-subline"
                  }`}
                >
                  Топ за день
                </div>
                <div
                  onClick={() => {
                    setSortingMethod("");
                    setCategory("topWeek");
                  }}
                  className={`grid h-10 cursor-pointer items-center justify-items-center rounded-xl border-2 px-4 text-sm font-bold transition-colors md:text-base xl:px-6  ${
                    category === "topWeek" ? "border-accent" : "border-subline"
                  }`}
                >
                  Топ за неделю
                </div>
                <div
                  onClick={() => {
                    setSortingMethod("");
                    setCategory("new");
                  }}
                  className={`grid h-10 cursor-pointer items-center justify-items-center rounded-xl border-2 px-4 text-sm font-bold transition-colors md:text-base xl:px-6  ${
                    category === "new" ? "border-accent" : "border-subline"
                  }`}
                >
                  Новые
                </div>
              </div>
            ) : null}
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
              <div className="flex h-12 w-40 items-center space-x-2 rounded-xl bg-element pl-3 pr-2 text-sm text-subtext md:w-72 md:pl-6 md:text-base">
                <Search />
                <input
                  placeholder="Поиск"
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                  onChange={debouncedUpdate}
                  className="h-full w-full border-none bg-element placeholder-subtext outline-none"
                />
              </div>
              <FilterDropdown
                sortingMethod={sortingMethod}
                setSortingMethod={(newSortingMethod: string) =>
                  setSortingMethod(newSortingMethod)
                }
              />
              <div
                onClick={() => setLinkModalOpen(true)}
                className="col-span-2 flex h-12 w-max cursor-pointer items-center space-x-2 justify-self-center rounded-xl bg-element px-6 text-xs text-subtext shadow-md transition-all hover:bg-opacity-60 md:text-base xl:col-span-1"
              >
                <YourLink />
                <p>Загрузить свою ссылку</p>
              </div>
              <LinkModal
                open={linkModalOpen}
                closeFunction={() => setLinkModalOpen(false)}
              />
            </div>
          </div>
          {raffles.isFetching ? (
            <div className="mt-24 grid justify-items-center">
              <Spinner />
            </div>
          ) : (
            <div className="grid grid-flow-row grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
              {raffleState
                .filter((r) =>
                  r.name.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((r) => (
                  <Link
                    href={`/rafflebot/raffles/${r.id}`}
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

                        <button
                          // eslint-disable-next-line @typescript-eslint/no-misused-promises
                          onClick={(e) => handleAddFavorites(e, r.id)}
                          className="z-10 mt-3 grid h-max w-12 cursor-pointer justify-items-center rounded-xl py-2 transition-colors hover:bg-sidebarBg"
                        >
                          {((me.data &&
                            me.data.favoriteRaffles &&
                            me.data.favoriteRaffles.filter(
                              (rr) => r.id === rr.trueRaffleId
                            ).length > 0) ||
                            favoriteRafflesCopy.includes(r.id)) &&
                          !deletedRafflesCopy.includes(r.id) ? (
                            <div className="grid h-6 w-6 items-center justify-items-center">
                              <img
                                src="../../../starYellow.svg"
                                alt="star icon"
                                className="h-5 w-5"
                              />
                            </div>
                          ) : (
                            <Star />
                          )}
                        </button>
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
                            {r.NumberOfWinners
                              ? r.NumberOfWinners
                              : "Не указано"}
                          </div>
                          <div className="text-xs font-semibold text-subtext">
                            <p>Количество</p>
                            <p>Победителей</p>
                          </div>
                        </div>
                        <div className="ml-7 grid grid-cols-2 grid-rows-2 gap-1 2xls:ml-0">
                          {r.requirements.filter(
                            (rq) => rq.platform === "Twitter"
                          ).length > 0 ? (
                            <div className="grid h-8 w-8 items-center justify-items-center">
                              <img src="../../../../twitter.png" alt="" />
                            </div>
                          ) : null}
                          {r.requirements.filter(
                            (rq) => rq.platform === "Discord"
                          ).length > 0 ? (
                            <div className="grid h-8 w-8 items-center justify-items-center">
                              <img src="../../../../discord.png" alt="" />
                            </div>
                          ) : null}
                          {r.hold && r.hold != 0 ? (
                            <div className="grid h-8 w-8 items-center justify-items-center">
                              <img src="../../../../metamask.png" alt="" />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default RaffleList;
