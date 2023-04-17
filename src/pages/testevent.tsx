import { useEffect, useState } from "react";

interface TimeEvent {
  time: string;
}

const parseTimeEvent = (eventData: string): TimeEvent | null => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsedData: TimeEvent = JSON.parse(eventData);
    return parsedData;
  } catch (error) {
    console.error("Error parsing SSE event data:", eventData, error);
    return null;
  }
};

const Home: React.FC = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const eventSource = new EventSource("https://alpharescue.online/events");

    eventSource.onmessage = (event: MessageEvent) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const parsedEvent = parseTimeEvent(event.data);
      if (parsedEvent) {
        console.log("Received SSE event:", parsedEvent);
        setTime(parsedEvent.time);
      }
    };

    eventSource.onerror = (error: Event) => {
      console.error("Error with SSE:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Flask SSE Example with TypeScript and React</h1>
      <p>Current time: {time}</p>
      <button className="bg-white p-3 text-bg">stop</button>
    </div>
  );
};

export default Home;
