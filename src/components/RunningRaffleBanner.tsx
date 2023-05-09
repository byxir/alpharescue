import { XMarkIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { EventStreamStatusContext } from "~/pages/_app";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface EventStreamComponentProps {
  openEventStream: boolean;
  refetchMyRaffles: () => Promise<void>;
}

export interface RunningRaffleEventStreamData {
  status: "running" | "success" | "fail" | "cancelled";
  currentRaffleName: string;
  totalAccountsNumber: number;
  accessedAccountsNumber: number;
  endTime: number;
}

const Banner: React.FC<EventStreamComponentProps> = ({
  openEventStream,
  refetchMyRaffles,
}) => {
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [showLayout, setShowLayout] = useState(false);

  const [runningRaffleName, setRunningRaffleName] = useState<string | null>(
    null
  );
  const [accessedAccounts, setAccessedAccounts] = useState<number | null>(null);
  const [totalAccounts, setTotalAccounts] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const [isCancelled, setIsCancelled] = useState(false);

  const { data, status } = useSession();
  const protectionData = api.user.getMyProtectionData.useQuery();

  const decrementRaffles = api.user.reduceRemainingRaffles.useMutation();

  const { isEventStreamOpen, closeIsEventStreamOpen, openIsEventStreamOpen } =
    useContext(EventStreamStatusContext);

  useEffect(() => {
    if (protectionData.data) {
      const source = new EventSource(
        `https://alpharescue.online/events?userId=${String(
          data?.user.id
        )}&sessionToken=${String(
          protectionData.data?.sessionToken
        )}&discordId=${String(
          protectionData.data?.discordId
        )}&sessionToken=${String(protectionData.data?.sessionToken)}`
      );

      source.onmessage = (event) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
        const data: RunningRaffleEventStreamData = JSON.parse(event.data);

        if (data.status === "running") {
          setShowLayout(true);
          setRunningRaffleName(data.currentRaffleName);
          setAccessedAccounts(data.accessedAccountsNumber);
          setTotalAccounts(data.totalAccountsNumber);
          openIsEventStreamOpen();
          setIsCancelled(false);
          setTimeLeft(data.endTime);
        } else if (data.status === "success") {
          setShowLayout(true);
          setRunningRaffleName(data.currentRaffleName);
          setAccessedAccounts(data.accessedAccountsNumber);
          setTotalAccounts(data.totalAccountsNumber);
          setTimeLeft(null);
          void refetchMyRaffles();
          source.close();
          decrementRaffles.mutate();
          setIsCancelled(false);
          closeIsEventStreamOpen();
        } else if (data.status === "cancelled") {
          setShowLayout(true);
          setIsCancelled(true);
          setRunningRaffleName(data.currentRaffleName);
          setAccessedAccounts(data.accessedAccountsNumber);
          setTotalAccounts(data.totalAccountsNumber);
          void refetchMyRaffles();
          source.close();
          decrementRaffles.mutate();
          closeIsEventStreamOpen();
        }
      };

      source.onerror = () => {
        setRunningRaffleName(null);
        setAccessedAccounts(null);
        setTotalAccounts(null);
        source.close();
        setEventSource(null);
        setShowLayout(false);
        closeIsEventStreamOpen();
        setIsCancelled(false);
      };

      setEventSource(source);
    } else {
      if (eventSource) {
        eventSource.close();
        setEventSource(null);
        setRunningRaffleName(null);
        setAccessedAccounts(null);
        setTotalAccounts(null);
        setShowLayout(false);
        setIsCancelled(false);
        closeIsEventStreamOpen();
      }
    }

    return () => {
      if (eventSource) {
        eventSource.close();
        setEventSource(null);
        setRunningRaffleName(null);
        setAccessedAccounts(null);
        setTotalAccounts(null);
        setShowLayout(false);
        closeIsEventStreamOpen();
        setIsCancelled(false);
      }
    };
  }, [openEventStream, protectionData.data]);

  const stopRaffleMutation = useMutation(["stopRaffle"], async () => {
    return axios.post(
      "https://alpharescue.online/stopraffle",
      {
        discordId: protectionData.data?.discordId,
        userId: data?.user.id,
      },
      {
        headers: {
          Authorization: `Bearer ${String(protectionData.data?.sessionToken)}`,
        },
      }
    );
  });

  const stopRaffle = () => {
    setIsCancelled(true);
    if (
      data?.user.id &&
      protectionData.data?.discordId &&
      protectionData.data?.sessionToken
    ) {
      stopRaffleMutation.mutate();
    }
  };

  return (
    <>
      {showLayout && eventSource != null && (
        <div
          className={`relative isolate flex items-center gap-x-6 overflow-hidden ${
            accessedAccounts === totalAccounts &&
            accessedAccounts &&
            totalAccounts
              ? "bg-green-300"
              : "bg-almostwhite"
          } px-6 py-2.5 sm:px-3.5 sm:before:flex-1 lg:pl-48 2xl:pl-48 ${
            isCancelled ? "bg-red-600" : "bg-almostwhite"
          }`}
        >
          <div
            className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true"
          >
            <div
              className={`aspect-[577/310] w-[36.0625rem] ${
                accessedAccounts === totalAccounts &&
                accessedAccounts &&
                totalAccounts
                  ? "bg-green-500"
                  : "bg-accent"
              } ${isCancelled ? "bg-red-600" : "bg-accent"}`}
              style={{
                clipPath:
                  "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
              }}
            />
          </div>
          <div
            className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true"
          >
            <div
              className={`aspect-[577/310] w-[36.0625rem] ${
                accessedAccounts === totalAccounts &&
                accessedAccounts &&
                totalAccounts
                  ? "bg-green-300 bg-opacity-30"
                  : "bg-accent"
              } ${isCancelled ? "bg-red-600" : "bg-accent"}`}
              style={{
                clipPath:
                  "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
              }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-y-2 sm:gap-x-4">
            <div className="items-center gap-y-1 space-y-3 text-sm leading-6 text-gray-900 sm:grid sm:grid-cols-[repeat(3,_max-content)] sm:grid-rows-2 sm:gap-x-6 sm:space-y-0 2xl:flex 2xl:gap-0 2xl:space-x-6">
              <strong className="font-benzin">{runningRaffleName}</strong>
              <div className="h-5 w-64 flex-none rounded-full bg-bg p-1 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
                <div
                  className={`h-full rounded-full ${
                    accessedAccounts === totalAccounts &&
                    accessedAccounts &&
                    totalAccounts
                      ? "bg-green-300"
                      : "bg-rose-100"
                  }`}
                  style={{
                    width: `${Math.floor(
                      (Number(accessedAccounts) / Number(totalAccounts)) * 100
                    )}%`,
                  }}
                ></div>
              </div>
              <div className="font-montserratBold">
                {!isCancelled && isEventStreamOpen && (
                  <span>
                    {accessedAccounts} / {totalAccounts} аккаунтов готовы.
                  </span>
                )}
                {isCancelled && <span>Заход отменен</span>}
              </div>
              <div className="font-montserratBold">
                {!isCancelled && <span>Осталось {timeLeft} мин.</span>}
              </div>
              {!isCancelled && isEventStreamOpen && (
                <button
                  onClick={stopRaffle}
                  className="w-max cursor-pointer justify-self-center rounded-xl bg-red-600 px-4 py-1 font-montserratBold text-almostwhite shadow-md transition-colors hover:bg-red-700"
                >
                  Отменить заход
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-1 justify-end">
            <button
              type="button"
              onClick={() => {
                if (eventSource) {
                  eventSource.close();
                  setEventSource(null);
                }
              }}
              className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5 text-bg" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
