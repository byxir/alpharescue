/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { Clock } from "~/design/icons/Clock";
import { Robot } from "~/design/icons/Robot";

export default function Tools() {
  return (
    <>
      <Header />
      <div className="grid justify-items-center bg-bg p-4 pb-20 sm:p-6">
        <div className="mb-36 mt-20 text-center font-benzin text-3xl sm:text-4xl lg:text-5xl">
          Инструменты RESCUE
        </div>
        <CommunityPass />
        <RaffleBot />
        <SpeedMint />
      </div>
      <Footer />
    </>
  );
}

const CommunityPass = () => {
  return (
    <div className="mb-36 grid max-w-5xl sm:justify-items-center xl:max-w-7xl">
      <div className="mb-16 bg-gradient-to-r from-community to-almostwhite bg-clip-text font-benzin text-2xl text-transparent sm:text-3xl lg:justify-self-start">
        Rescue Community Pass
      </div>
      <div className="grid w-full grid-cols-1 items-center justify-items-center gap-6 lg:grid-cols-[6fr_5fr] lg:justify-items-start xl:gap-16">
        <div className="mb-8 grid grid-cols-2 grid-rows-2 gap-4 lg:mb-0 xl:gap-8">
          <Link href="tools/utilities">
            <ToolFolder small={true} textSize="lg" mt="6">
              Утилиты
            </ToolFolder>
          </Link>
          <Link href="tools/software">
            <ToolFolder small={true} textSize="lg" mt="6">
              Софт для абуза
            </ToolFolder>
          </Link>
          <Link href="tools/discord">
            <ToolFolder small={true} textSize="lg" mt="6">
              Доступ в Discord
            </ToolFolder>
          </Link>
          <Link href="tools/giveaways">
            <ToolFolder small={true} textSize="lg" mt="6">
              Розыгрыши WL
            </ToolFolder>
          </Link>
        </div>
        <div className="mb-8 grid sm:justify-items-center lg:justify-items-start">
          <div className="w-11/12 max-w-xl font-montserratRegular text-base text-almostwhite sm:text-lg">
            Для тех, кто хочет получать всю актуальную информацию на рынке,
            сигналы на NFT и фьючерсы, а так же доступ к софту и гивам на WL в
            различные проекты.
          </div>
          <div className="mt-10 grid items-center justify-center justify-items-center sm:grid-cols-[repeat(2,_max-content)] sm:flex-row sm:space-x-6 lg:mt-16 lg:flex lg:justify-start">
            <button className="w-max rounded-xl bg-community px-6 py-4 font-montserratBold text-xl text-bg shadow-md">
              Купить подписку
            </button>
            <Link href="https://alpharescue.notion.site/Alpha-Rescue-58a5a2bfc2ca4c259f629c0dad8085db">
              <button className="mt-5 h-max w-max rounded-xl bg-element px-10 py-3 font-montserratBold text-base text-subtext shadow-md transition-all hover:bg-opacity-60 sm:mt-0">
                Отчет
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const RaffleBot = () => {
  return (
    <div className="mb-36 grid max-w-5xl sm:justify-items-center xl:max-w-7xl">
      <div className="mb-16 bg-gradient-to-r from-raffleBot to-almostwhite bg-clip-text font-benzin text-3xl text-transparent lg:justify-self-start ">
        Rescue Raffle Bot
      </div>
      <div className="rid-cols-[5fr_6fr] grid w-full grid-cols-1 grid-rows-[repeat(2,_max-content)] items-center justify-items-center gap-6 lg:grid-cols-[5fr_6fr] lg:grid-rows-1 lg:justify-items-start lg:gap-16">
        <div className="mb-8 grid sm:justify-items-center lg:justify-items-start">
          <div className="max-w-xl font-montserratRegular text-base text-almostwhite sm:text-lg">
            Доступ к боту, который позволит вам, после быстрой настройки,
            абузить рафлы в несколько кликов. Поддерживает Premint, Alphabot,
            Superfull, FreeNFT. Вся информация о раффлах удобно расположена в
            нём. Взаимодействие с ботом происходит прямо на сайте.
          </div>
          <div className="mt-10 grid items-center justify-center sm:mt-16 sm:grid-cols-[repeat(2,_max-content)] sm:flex-row sm:space-x-6 lg:justify-start">
            <button className="w-max rounded-xl bg-raffleBot px-6 py-4 font-montserratBold text-xl text-bg shadow-md">
              Купить подписку
            </button>
            <button className="mt-5 h-max w-max rounded-xl bg-element px-10 py-3 font-montserratBold text-base text-subtext shadow-md sm:mt-0">
              Как работает бот?
            </button>
          </div>
        </div>
        <div className="row-start-1 mb-8 grid gap-8 justify-self-center sm:max-w-lg lg:col-start-2 lg:mb-0 lg:max-w-lg">
          <Link href="/tools/rafflebot/platforms/Premint">
            <ToolFolder small={false} mt="16" textSize="4xl">
              <div className="grid w-max grid-cols-[repeat(2,_max-content)] grid-rows-2">
                <div className="row-span-2 self-center bg-gradient-to-r from-raffleBot to-almostwhite bg-clip-text text-transparent">
                  Raffle Bot
                </div>
                <div className="grid justify-items-center">
                  <Robot />
                </div>
                <div className="grid grid-cols-2 justify-items-center gap-2">
                  <div className="ml-8 w-max">
                    <Robot />
                  </div>
                  <div className="mr-8 w-max">
                    <Robot />
                  </div>
                </div>
              </div>
            </ToolFolder>
          </Link>
          <div className="flex items-center justify-center space-x-10 font-montserratBold">
            <div className="text-lg text-almostwhite sm:text-xl">Bonus:</div>
            <div className="w-60 rounded-xl border-2 border-dashed border-community p-6 text-lg text-almostwhite sm:w-auto sm:text-xl">
              Rescue Community Pass
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpeedMint = () => {
  return (
    <div className="mb-36 grid max-w-5xl sm:justify-items-center xl:max-w-7xl">
      <div className="mb-16 bg-gradient-to-r from-speedMint to-almostwhite bg-clip-text font-benzin text-3xl text-transparent lg:justify-self-start ">
        Rescue SpeedMint Bot
      </div>
      <div className="grid w-full grid-cols-1 grid-rows-[repeat(2,_max-content)] items-center justify-items-center gap-6 lg:grid-cols-[6fr_5fr] lg:grid-rows-1 lg:justify-items-start lg:gap-16">
        <div className="row-start-1 mb-8 grid gap-8 sm:max-w-lg lg:mb-0 lg:max-w-lg">
          <ToolFolder small={false} mt="16" textSize="4xl">
            <div className="grid w-max grid-cols-[repeat(2,_max-content)] gap-8">
              <div className="self-center bg-gradient-to-r from-speedMint to-almostwhite bg-clip-text text-transparent">
                <p className="italic">SpeedMint</p>
                <p className="text-start italic">Bot</p>
              </div>
              <div className="grid justify-items-center">
                <Clock />
              </div>
            </div>
          </ToolFolder>
          <div className="flex items-center justify-center space-x-10 font-montserratBold">
            <div className="text-lg text-almostwhite sm:text-xl">Bonus:</div>
            <div className="w-60 rounded-xl border-2 border-dashed border-community p-6 text-lg text-almostwhite sm:w-auto sm:text-xl">
              Rescue Community Pass
            </div>
          </div>
        </div>
        <div className="mb-8 grid sm:justify-items-center lg:justify-items-start">
          <div className="max-w-xl font-montserratRegular text-base text-almostwhite sm:text-lg">
            Доступ к боту, который поможет вам добиться успеха и забрать NFT на
            важном минте. Включает в себя поддержку ETH и SOL минтов.
            Поддерживает минт с нескольких кошельков. Остальная информация будет
            раскрыта позже...
          </div>
          <div className="mt-10 grid items-center justify-center sm:mt-16 sm:grid-cols-[repeat(2,_max-content)] sm:flex-row sm:space-x-6 lg:justify-start">
            <button className="w-max rounded-xl bg-element px-6 py-4 font-montserratBold text-xl text-red-500 shadow-md">
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ToolFolder = ({
  children,
  small,
  textSize,
  mt,
}: {
  children: React.ReactNode;
  small: boolean;
  textSize: string;
  mt: string;
}) => {
  return (
    <div className="relative grid">
      <img
        src="../../tempfolder.png"
        alt="folder"
        className={`w-full ${small ? "max-w-xss xl:w-72" : "object-cover"}`}
      />
      <div
        className={`absolute grid items-center justify-items-center self-center justify-self-center text-center font-montserratBold sm:text-${textSize} mt-${mt} ${
          !small ? "ml-4 text-2xl xs:text-3xl" : "text-base"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
