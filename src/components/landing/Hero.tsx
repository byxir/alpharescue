/* eslint-disable @next/next/no-img-element */
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Example() {
  return (
    <div className="relative isolate grid h-auto overflow-hidden bg-bg font-montserratRegular xl:h-[calc(100vh-92px)]">
      <img
        src="../../../herobg.png"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        alt="background picture"
      />
      <div className="grid grid-cols-1 justify-evenly self-center px-4 md:px-12 lg:px-10 xl:grid-cols-[min-content_max-content] 2xls:px-8">
        <div className="grid max-w-3xl content-center pt-20 xl:mx-0 xl:w-auto xl:pb-36">
          <div className="">
            <Link
              href="/rafflebot/platforms/Premint"
              className="inline-flex space-x-6 font-montserratBold"
            >
              <span className="grid items-center rounded-full bg-accent/10 px-3 py-1 text-center text-sm font-semibold leading-6 text-accent ring-1 ring-inset ring-accent/20 xs:text-start">
                Что нового?
              </span>
              <span className="inline-flex w-36 items-center space-x-2 text-sm font-medium leading-6 text-almostwhite xs:w-auto">
                <span>Raffle Bot уже доступен</span>
                <ChevronRightIcon
                  className="h-5 w-5 text-almostwhite"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>
          <h1 className="mt-10 font-benzin text-6xl text-white sm:text-7xl xl:w-min 2xls:w-max">
            ALPHA <span className="text-bg">RESCUE</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-element xl:text-almostwhite">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/tools"
              className="rounded-md bg-element px-3.5 py-2.5 font-montserratBold text-sm font-semibold text-almostwhite shadow-sm transition-colors hover:bg-element xl:bg-accent xl:text-bg xl:hover:bg-pressedAccent"
            >
              Инструменты
            </Link>
            <Link
              href="/services"
              className="font-montserratBold text-sm font-semibold leading-6 text-bg xl:text-almostwhite"
            >
              Заказать услугу <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="mx-auto grid w-full max-w-2xl justify-items-center lg:flex-none">
          <div className="mb-16 mt-24 flex-none">
            <img
              src="../../../tempterminal.png"
              alt="App screenshot"
              className="justify-self-center rounded-2xl shadow-2xl xl:max-w-2xl 2xl:max-w-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
