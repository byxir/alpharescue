import { useState } from "react";
import SidebarLayout from "~/components/SidebarLayout";

/* eslint-disable @next/next/no-img-element */
const RaffleList = () => {
  const [current, setCurrent] = useState(1);

  return (
    <SidebarLayout>
      <div className="grid grid-cols-[max-content_max-content] justify-between">
        <h1 className="font-ben text-4xl">Список Раффлов</h1>
        <div className="grid grid-cols-4 gap-4">
          <div
            onClick={() => setCurrent(1)}
            className={`grid cursor-pointer items-center justify-items-center rounded-xl border-2 px-6 font-bold transition-colors  ${
              current === 1 ? "border-accent" : "border-subline"
            }`}
          >
            Подборка
          </div>
          <div
            onClick={() => setCurrent(2)}
            className={`grid cursor-pointer items-center justify-items-center rounded-xl border-2 px-6 font-bold transition-colors  ${
              current === 2 ? "border-accent" : "border-subline"
            }`}
          >
            Топ за день
          </div>
          <div
            onClick={() => setCurrent(3)}
            className={`grid cursor-pointer items-center justify-items-center rounded-xl border-2 px-6 font-bold transition-colors  ${
              current === 3 ? "border-accent" : "border-subline"
            }`}
          >
            Топ за неделю
          </div>
          <div
            onClick={() => setCurrent(4)}
            className={`grid cursor-pointer items-center justify-items-center rounded-xl border-2 px-6 font-bold transition-colors  ${
              current === 4 ? "border-accent" : "border-subline"
            }`}
          >
            Новые
          </div>
        </div>
      </div>
      <p className="ml-3 mt-1 font-bold text-premint">Premint</p>
    </SidebarLayout>
  );
};

export default RaffleList;
