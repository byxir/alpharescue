import LaunchButton from "~/components/LaunchButton/LaunchButton";
import SidebarLayout from "~/components/SidebarLayout";
import { raffles } from "~/utils/tempraffles";

const Raffle = () => {
  const r = raffles[0];
  return (
    <SidebarLayout>
      <div className="grid h-screen w-full grid-cols-[43%_57%] border-subline text-almostwhite">
        {r ? (
          <div className="border-r-2 border-subline">
            <div className="grid border-b-2 border-subline pb-12">
              <div className="h-44 w-full">
                <img
                  src={r.benner}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative px-14">
                <div className={`text-${r.platform} mt-3 ml-40 capitalize`}>
                  {r.platform}
                </div>
                <div className="absolute -top-20 grid h-28 w-28 items-center justify-items-center rounded-xl bg-element">
                  <img
                    src={r.profilePicture}
                    alt=""
                    className="h-24 w-24 rounded-xl"
                  />
                </div>
              </div>
              <div className="px-14">
                <div
                  className={`mt-6 cursor-pointer font-benzin text-4xl hover:underline`}
                >
                  {r.name}
                </div>
                <div className="mt-3 text-subtext">By {r.author}</div>
                <div className="mt-10 grid grid-cols-[repeat(3,_max-content)] gap-6">
                  <div className="grid h-20 grid-rows-[repeat(2,_max-content)]">
                    <div className="h-max text-2xl">{r.hold} ETH</div>
                    <div className="text-md text-sm text-subtext">
                      Сумма холда
                    </div>
                  </div>
                  <div className="grid h-20 grid-rows-[repeat(2,_max-content)]">
                    <div className="text-2xl">
                      {r.subs >= 10000 ? `${r.subs / 1000}K` : r.subs}
                    </div>
                    <div className="text-md text-sm text-subtext">
                      <p>Подписчики в </p>
                      <p>Twitter</p>
                    </div>
                  </div>
                  <div className="grid h-20 grid-rows-[repeat(2,_max-content)]">
                    <div className="h-max text-2xl">{r.deadline}</div>
                    <div className="text-md text-sm text-subtext">Дедлайн</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-rows-[max-content_max-content] overflow-auto px-14">
              <div className="mt-12 mb-8 text-3xl">Требования для входа</div>
              <div className="grid gap-4">
                {r.requirements.map((rq) => (
                  <div
                    className="grid h-12 grid-cols-[50px_70px_auto] gap-4"
                    key={rq.specification}
                  >
                    <div className="grid h-12 w-12 items-center">
                      <img
                        src={`../../../../${rq.platform}.png`}
                        alt=""
                        className="w-full"
                      />
                    </div>
                    <div className="grid items-center text-xl">{rq.action}</div>
                    <div className="grid items-center text-sm">
                      {rq.specification}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
        <div className="p-14">
          <div className="grid grid-cols-[max-content_max-content] items-center justify-between">
            <div className="mb-4">
              <div className="mb-6 text-xl">Выбрать готовую конфигурацию</div>
              <div className="grid grid-cols-[repeat(4,_max-content)] gap-2">
                <div className="grid h-12 w-12 cursor-pointer items-center justify-items-center rounded-lg bg-element text-2xl shadow-md transition-colors hover:bg-neutral-900">
                  1
                </div>
                <div className="grid h-12 w-12 cursor-pointer items-center justify-items-center rounded-lg bg-element text-2xl shadow-md transition-colors hover:bg-neutral-900">
                  2
                </div>
                <div className="grid h-12 w-12 cursor-pointer items-center justify-items-center rounded-lg bg-element text-2xl shadow-md transition-colors hover:bg-neutral-900">
                  3
                </div>
                <div className="grid h-12 w-12 cursor-pointer items-center justify-items-center rounded-lg bg-element text-2xl shadow-md transition-colors hover:bg-neutral-900">
                  4
                </div>
              </div>
            </div>
            <LaunchButton />
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Raffle;
