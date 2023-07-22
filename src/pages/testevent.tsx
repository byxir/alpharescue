import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

interface RaffleEvent {
  status: string;
  accessedAccountsNumber: number;
  totalAccountsNumber: number;
  currentRaffleName: string;
}

const Home: React.FC = () => {
  const [raffleName, setRaffleName] = useState(null);
  const [accessedAccounts, setAccessedAccounts] = useState(0);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [raffleSubscribed, setRaffleSubscribed] = useState(false);

  const { data, status } = useSession();

  const protectionData = api.user.getMyProtectionData.useQuery();

  useEffect(() => {
    // let eventSource: EventSource | undefined;

    const eventSource = new EventSource(
      `https://alpharescue.online:3500/events?userId=clg5dzhmq0000mj08pkwqftop&sessionToken=30fccbe9-cbde-4200-b8de-da2e5567cc97&discordId=460719167738347520`
    );

    eventSource.onmessage = (event: MessageEvent) => {
      if (event) {
        console.log("event -> ", event);
      }
    };

    eventSource.onerror = (error: Event) => {
      console.error("Error with SSE:", error);
      eventSource?.close();
    };

    return () => {
      eventSource?.close();
      setRaffleSubscribed(false);
      setRaffleName(null);
      setAccessedAccounts(0);
      setTotalAccounts(0);
    };
  }, []);

  return (
    <div>
      <button
        onClick={() => setRaffleSubscribed(true)}
        className="bg-white p-3 text-bg"
      >
        запустить абуз
      </button>
    </div>
  );
};

export default Home;
