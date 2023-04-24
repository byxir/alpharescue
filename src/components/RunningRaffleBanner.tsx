import { XMarkIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

export interface EventStreamComponentProps {
  openEventStream: boolean;
  toggleEventStream: () => void;
}

export interface RunningRaffleEventStreamData {
  status: "running" | "success" | "fail";
  currentRaffleName: string;
  totalAccountsNumber: number;
  accessedAccountsNumber: number;
}

const Banner: React.FC<EventStreamComponentProps> = ({
  openEventStream,
  toggleEventStream,
}) => {
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [showLayout, setShowLayout] = useState(false);

  const [runningRaffleName, setRunningRaffleName] = useState<string | null>(
    null
  );
  const [accessedAccounts, setAccessedAccounts] = useState<number | null>(null);
  const [totalAccounts, setTotalAccounts] = useState<number | null>(null);

  const { data, status } = useSession();
  const protectionData = api.user.getMyProtectionData.useQuery();

  useEffect(() => {
    if (protectionData.data) {
      const source = new EventSource(
        `https://alpharescue.online/events?userId=clg5dzhmq0000mj08pkwqftop&sessionToken=30fccbe9-cbde-4200-b8de-da2e5567cc97&discordId=460719167738347520`
      );

      // `https://alpharescue.online/events?userId=${String(
      //     data?.user.id
      //   )}&sessionToken=${String(
      //     protectionData.data?.sessionToken
      //   )}&discordId=${String(protectionData.data?.discordId)}`

      source.onmessage = (event) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
        const data: RunningRaffleEventStreamData = JSON.parse(event.data);

        if (data.status === "running") {
          setShowLayout(true);
          setRunningRaffleName(data.currentRaffleName);
          setAccessedAccounts(data.accessedAccountsNumber);
          setTotalAccounts(data.totalAccountsNumber);
        } else if (data.status === "success") {
          setShowLayout(true);
          setRunningRaffleName(data.currentRaffleName);
          setAccessedAccounts(data.accessedAccountsNumber);
          setTotalAccounts(data.totalAccountsNumber);
          source.close();
        }
      };

      source.onerror = () => {
        console.error("An error occurred with the event stream.");
        setRunningRaffleName(null);
        setAccessedAccounts(null);
        setTotalAccounts(null);
        source.close();
        setEventSource(null);
        setShowLayout(false);
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
      }
    };
  }, [openEventStream, protectionData.data]);

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
          } px-6 py-2.5 sm:px-3.5 sm:before:flex-1`}
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
                  ? "bg-green-500 bg-opacity-30"
                  : "bg-accent"
              }`}
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
              }`}
              style={{
                clipPath:
                  "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
              }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center space-x-6 text-sm leading-6 text-gray-900">
              <strong className="font-benzin">{runningRaffleName}</strong>
              <div className="h-5 w-64 flex-none rounded-full bg-bg p-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
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
                {accessedAccounts} / {totalAccounts} аккаунтов готовы.
              </div>
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