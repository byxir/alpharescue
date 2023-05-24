/* eslint-disable @next/next/no-img-element */
import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { type ChangeEvent, useState, useRef, useEffect } from "react";
import SidebarLayout from "~/components/SidebarLayout";
import { Search } from "~/design/icons/Search";
import debounce from "lodash.debounce";
import Spinner from "~/components/spinner/Spinner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { type IRaffle } from "../twitterraffle";

interface fetchMyRafflesResponse {
  raffles: IRaffle[];
  nextPage?: number;
}

const RaffleList = () => {
  const router = useRouter();
  const { data } = useSession();
  const [searchText, setSearchText] = useState("");
  const queryClient = useQueryClient();

  const protectionData = api.user.getMyProtectionData.useQuery();

  const fetchMyRaffles = async ({
    _page,
  }: {
    _page: number;
  }): Promise<fetchMyRafflesResponse> => {
    const res = await axios.get(
      `https://alpharescue.online/raffles?discordId=${String(
        protectionData.data?.discordId
      )}&userId=${String(data?.user.id)}&page=${_page}&search=${searchText}`
    );

    if (res.status != 200) {
      throw new Error("network error, try again later");
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.data;
  };

  const queryFn = async ({
    pageParam = 0,
  }): Promise<fetchMyRafflesResponse> => {
    return fetchMyRaffles({
      _page: pageParam,
    });
  };

  const deleteMyRaffleMutation = useMutation(
    ["deleteMyRaffle"],
    async (_id: string) => {
      const res = await axios.post(
        `https://alpharescue.online/deleteMyRaffle`,
        {
          userId: String(data?.user.id),
          discordId: String(protectionData.data?.discordId),
          raffleId: _id,
        },
        {
          headers: {
            Authorization: `Bearer ${String(
              protectionData.data?.sessionToken
            )}`,
          },
        }
      );
      if (res.status != 200) {
        throw new Error("network error, try again later");
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res.data;
    },
    {
      onSuccess: async () => {
        await myraffles.refetch();
      },
    }
  );

  const myraffles = useInfiniteQuery<fetchMyRafflesResponse, Error>(
    ["myraffles"],
    queryFn,
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      getNextPageParam: (lastPage: fetchMyRafflesResponse) => {
        return lastPage.nextPage;
      },
    }
  );

  const allData: IRaffle[] =
    myraffles.data?.pages.flatMap(
      (page: fetchMyRafflesResponse) => page.raffles
    ) || [];

  const loadMore = () => {
    if (!myraffles.isFetchingNextPage && myraffles.hasNextPage) {
      void myraffles.fetchNextPage();
    }
  };

  const handleDeleteMyRaffle = (id: string) => {
    deleteMyRaffleMutation.mutate(id);
  };

  const updateQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer) {
      observer.disconnect();
    }

    const newObserver = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry?.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (sentinelRef.current) {
      newObserver.observe(sentinelRef.current);
    }

    setObserver(newObserver);

    return () => {
      newObserver.disconnect();
    };
  }, [myraffles.hasNextPage]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const debouncedUpdate = debounce(updateQuery, 350);

  const determineColor = (platform = String(router.query.platform)) => {
    if (platform === "Premint" || platform === "Twitter") {
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
            <h1 className="font-benzin text-3xl md:text-4xl">Мои Раффлы</h1>
          </div>
          <div className="mb-10 mt-10 grid justify-items-center">
            <div className="grid grid-cols-[repeat(2,_max-content)] justify-items-center gap-4 font-bold xl:grid-cols-[repeat(3,_max-content)]">
              <div className="flex h-12 w-40 items-center space-x-2 justify-self-start rounded-xl bg-element pl-3 pr-2 text-sm text-subtext md:w-72 md:pl-6 md:text-base">
                <Search />
                <input
                  placeholder="Поиск"
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                  onChange={debouncedUpdate}
                  className="h-full w-full border-none bg-element placeholder-subtext outline-none"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-flow-row grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {allData &&
              allData
                .filter((r) =>
                  r.name.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((r) => (
                  <div className="relative h-full" key={r.id}>
                    <button
                      onClick={() => handleDeleteMyRaffle(r.id)}
                      className="absolute right-0 top-0 z-20 h-10 w-10 text-element"
                    >
                      <XCircleIcon />
                    </button>
                    <Link
                      href={`/rafflebot/myraffles/${r.id}`}
                      className="min-w-104 relative grid h-full grid-rows-[112px_auto] rounded-xl bg-element shadow-md"
                    >
                      <div className="relative h-28">
                        {r.platform != "Twitter" && (
                          <img
                            src={
                              !r.banner ? "../../../../herobg.png" : r.banner
                            }
                            className="h-full w-full rounded-t-xl object-cover"
                            alt=""
                          />
                        )}
                        {r.platform === "Twitter" && (
                          <div className="relative grid h-full w-full items-center justify-items-center rounded-t-xl bg-premint">
                            <img
                              src="../../../../twitterwhite.png"
                              className="w=20 h-20"
                            />
                          </div>
                        )}
                        {!r.banner && r.platform != "Twitter" && (
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
                          <div className="mt-3 h-max overflow-hidden break-words font-benzin text-2xl">
                            {r.name}
                            <div
                              className={`absolute top-18 grid h-20 w-20 items-center justify-items-center rounded-full bg-element`}
                            >
                              {r.platform != "Twitter" && (
                                <img
                                  src={r.profilePicture}
                                  className="h-16 w-16 rounded-full"
                                  alt=""
                                />
                              )}
                              {r.platform === "Twitter" && (
                                <div
                                  className={`grid h-16 w-16 items-center justify-items-center rounded-full bg-premint`}
                                >
                                  <img
                                    src="../../../../twitterwhite.png"
                                    className="h-19 w-11"
                                  />
                                </div>
                              )}
                            </div>
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
                  </div>
                ))}
          </div>
        </div>
        <div ref={sentinelRef}></div>
        {(myraffles.isFetchingNextPage || myraffles.isFetching) && (
          <div className="grid w-full justify-items-center">
            <Spinner />
          </div>
        )}
      </div>
    </SidebarLayout>
  );
};

export default RaffleList;
