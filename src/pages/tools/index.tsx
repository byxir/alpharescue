/* eslint-disable @next/next/no-img-element */
import Footer from "~/components/Footer";
import Header from "~/components/Header";

export default function Tools() {
  return (
    <>
      <Header />
      <div className="grid justify-items-center bg-bg p-4 pb-20 sm:p-6">
        <div className="mt-20 mb-36 text-center font-benzin text-3xl sm:text-4xl lg:text-5xl">
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
    <div className="mb-36 grid max-w-5xl justify-items-center xl:max-w-7xl">
      <div className="mb-16 bg-gradient-to-r from-community to-almostwhite bg-clip-text font-benzin text-2xl text-transparent sm:text-3xl lg:justify-self-start">
        Rescue Community Pass
      </div>
      <div className="grid w-full grid-cols-1 items-center justify-items-center gap-6 lg:grid-cols-[6fr_5fr] lg:justify-items-start xl:gap-16">
        <div className="mb-8 grid grid-cols-2 grid-rows-2 gap-4 lg:mb-0 xl:gap-8">
          <img
            src="../../tempfolder.png"
            alt=""
            className="w-full max-w-xss xl:w-72 "
          />
          <img
            src="../../tempfolder.png"
            alt=""
            className="w-full max-w-xss xl:w-72"
          />
          <img
            src="../../tempfolder.png"
            alt=""
            className="w-full max-w-xss xl:w-72"
          />
          <img
            src="../../tempfolder.png"
            alt=""
            className="w-full max-w-xss xl:w-72"
          />
        </div>
        <div className="mb-8 grid justify-items-center lg:justify-items-start">
          <div className="w-11/12 max-w-xl font-montserratRegular text-lg text-almostwhite">
            Для тех, кто хочет получать всю актуальную информацию на рынке,
            сигналы на NFT и фьючерсы, а так же доступ к софту и гивам на WL в
            различные проекты.
          </div>
          <div className="mt-10 flex flex-col items-center justify-center sm:flex-row sm:space-x-6 lg:mt-16 lg:flex lg:justify-start">
            <button className="w-max rounded-xl bg-community px-6 py-4 font-montserratBold text-xl text-bg shadow-md">
              Купить подписку
            </button>
            <button className="mt-5 h-max w-max rounded-xl bg-element py-3 px-10 font-montserratBold text-base text-subtext shadow-md sm:mt-0">
              Отчет
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RaffleBot = () => {
  return (
    <div className="mb-36 grid max-w-5xl justify-items-center xl:max-w-7xl">
      <div className="mb-16 bg-gradient-to-r from-raffleBot to-almostwhite bg-clip-text font-benzin text-2xl text-transparent sm:text-3xl lg:justify-self-start ">
        Rescue Raffle Bot
      </div>
      <div className="grid w-full grid-cols-1 grid-rows-[repeat(2,_max-content)] items-center justify-items-center gap-6 lg:grid-cols-[6fr_5fr] lg:grid-rows-1 lg:justify-items-start lg:gap-16">
        <div className="mb-8 grid justify-items-center lg:justify-items-start">
          <div className="w-11/12 max-w-xl font-montserratRegular text-lg text-almostwhite">
            Доступ к боту, который позволит вам, после быстрой настройки,
            абузить рафлы в несколько кликов. Поддерживает Premint, Alphabot,
            Superfull, FreeNFT. Вся информация о раффлах удобно расположена в
            нём. Взаимодействие с ботом происходит прямо на сайте.
          </div>
          <div className="mt-10 flex flex-col items-center justify-center sm:mt-16 sm:flex-row sm:space-x-6 lg:justify-start">
            <button className="w-max rounded-xl bg-raffleBot px-6 py-4 font-montserratBold text-xl text-bg shadow-md">
              Купить подписку
            </button>
            <button className="mt-5 h-max w-max rounded-xl bg-element py-3 px-10 font-montserratBold text-base text-subtext shadow-md sm:mt-0">
              Как работает бот?
            </button>
          </div>
        </div>
        <div className="row-start-1 mb-8 grid max-w-xs gap-8 sm:max-w-md lg:col-start-2 lg:mb-0 lg:max-w-lg">
          <img
            src="../../tempfolder.png"
            alt=""
            className="h-full w-full border-b-2 border-subline object-cover pb-8"
          />
          <div className="flex items-center justify-center space-x-10 font-montserratBold">
            <div className="text-xl text-almostwhite">Bonus:</div>
            <div className="rounded-xl border-2 border-dashed border-community p-6 text-xl text-almostwhite">
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
    <div className="mb-36 grid max-w-5xl justify-items-center xl:max-w-7xl">
      <div className="mb-16 bg-gradient-to-r from-speedMint to-almostwhite bg-clip-text font-benzin text-2xl text-transparent sm:text-3xl lg:justify-self-start ">
        Rescue Speed Mint Bot
      </div>
      <div className="grid w-full grid-cols-1 items-center justify-items-center gap-8 lg:grid-cols-[6fr_5fr] lg:justify-items-start xl:gap-16">
        <div className="mb-6 grid w-max max-w-xs gap-8 sm:max-w-md lg:mb-0 lg:max-w-lg">
          <img
            src="../../tempfolder.png"
            alt=""
            className="h-full w-full border-b-2 border-subline object-cover pb-8"
          />
          <div className="flex items-center justify-center space-x-10 font-montserratBold">
            <div className="text-xl text-almostwhite">Bonus:</div>
            <div className="rounded-xl border-2 border-dashed border-community p-6 text-xl text-almostwhite">
              Rescue Community Pass
            </div>
          </div>
        </div>
        <div className="mb-8 grid justify-items-center lg:justify-items-start">
          <div className="w-11/12 max-w-xl font-montserratRegular text-lg text-almostwhite">
            Доступ к боту, который поможет вам добиться успеха и забрать NFT на
            важном минте. Включает в себя поддержку ETH и SOL минтов.
            Поддерживает минт с нескольких кошельков. Остальная информация будет
            раскрыта позже...
          </div>
          <div className="mt-10 flex items-center space-x-6 lg:mt-16">
            <button className="w-max rounded-xl bg-element px-6 py-4 font-montserratBold text-xl text-red-500 shadow-md">
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
