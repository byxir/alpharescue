/* eslint-disable @next/next/no-img-element */
import {
  ArrowDownLeftIcon,
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  ArrowUpLeftIcon,
  ComputerDesktopIcon,
  ServerStackIcon,
} from "@heroicons/react/24/outline";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

export default function Services() {
  return (
    <>
      <Header />
      <div className="grid justify-items-center p-14">
        <div className="w-full">
          <h1 className="mb-20 mt-10 text-center font-benzin text-5xl">
            Договорные Услуги RESCUE
          </h1>
          <div className="mb-24 grid grid-cols-[auto_auto_auto] grid-rows-[auto_256px_auto] justify-evenly gap-4">
            <div className="grid max-w-xl rounded-xl border-2 border-almostwhite p-10 text-xl">
              <h1 className="font-benzin text-2xl">Создание фермы</h1>
              <br></br>
              <div className="grid grid-cols-[3fr_2fr] items-center justify-items-center gap-8">
                <p className="font-montserratRegular text-sm">
                  Делать ферму руками достаточно трудоёмкий процесс, тем более
                  если ферма большая. Наша команда сэкономит ваше время и силы.
                  Мы сделаем вам ферму под ваши задачи, поможем с выбором
                  аккаунтов и быстро создадим ферму <br></br>
                  <br></br>
                  <b className="text-subtext underline">Подробнее...</b>
                </p>
                <div className="grid w-32 justify-items-center">
                  <ServerStackIcon />
                  <button className="mt-10 rounded-lg bg-subline px-5 py-3 font-montserratBold shadow-md transition-colors hover:bg-neutral-800">
                    Заказать
                  </button>
                </div>
              </div>
            </div>
            <div className="col-start-3 grid max-w-xl rounded-xl border-2 border-almostwhite p-10 text-xl">
              <h1 className="font-benzin text-2xl">Создание фермы</h1>
              <br></br>
              <div className="grid grid-cols-[3fr_2fr] items-center justify-items-center gap-8">
                <p className="font-montserratRegular text-sm">
                  Делать ферму руками достаточно трудоёмкий процесс, тем более
                  если ферма большая. Наша команда сэкономит ваше время и силы.
                  Мы сделаем вам ферму под ваши задачи, поможем с выбором
                  аккаунтов и быстро создадим ферму <br></br>
                  <br></br>
                  <b className="text-subtext underline">Подробнее...</b>
                </p>
                <div className="grid w-32 justify-items-center">
                  <ServerStackIcon />
                  <button className="mt-10 rounded-lg bg-subline px-5 py-3 font-montserratBold shadow-md transition-colors hover:bg-neutral-800">
                    Заказать
                  </button>
                </div>
              </div>
            </div>
            <div className="relative col-start-2 row-start-2 grid h-full w-20 items-center justify-items-center">
              <div className="absolute top-0 col-start-2 row-start-2 grid h-64 w-64 content-center items-center justify-items-center self-center justify-self-center rounded-full bg-subline">
                <div className="absolute bottom-2 left-2 h-10 w-10 text-subline">
                  <ArrowDownLeftIcon />
                </div>
                <div className="absolute bottom-2 right-2 h-10 w-10 text-subline">
                  <ArrowDownRightIcon />
                </div>
                <div className="absolute right-2 top-2 h-10 w-10 text-subline">
                  <ArrowUpRightIcon />
                </div>
                <div className="absolute left-2 top-2 h-10 w-10 text-subline">
                  <ArrowUpLeftIcon />
                </div>
                <div className="mb-2 mr-10 h-max font-abibas text-5xl">
                  ALPHA
                </div>
                <div className="ml-10 h-max font-abibas text-5xl">RESCUE</div>
              </div>
            </div>
            <div className="row-start-3 grid max-w-xl rounded-xl border-2 border-almostwhite p-10 text-xl">
              <h1 className="font-benzin text-2xl">Создание фермы</h1>
              <br></br>
              <div className="grid grid-cols-[3fr_2fr] items-center justify-items-center gap-8">
                <p className="font-montserratRegular text-sm">
                  Делать ферму руками достаточно трудоёмкий процесс, тем более
                  если ферма большая. Наша команда сэкономит ваше время и силы.
                  Мы сделаем вам ферму под ваши задачи, поможем с выбором
                  аккаунтов и быстро создадим ферму <br></br>
                  <br></br>
                  <b className="text-subtext underline">Подробнее...</b>
                </p>
                <div className="grid w-32 justify-items-center">
                  <ComputerDesktopIcon />
                  <button className="mt-10 rounded-lg bg-subline px-5 py-3 font-montserratBold shadow-md transition-colors hover:bg-neutral-800">
                    Заказать
                  </button>
                </div>
              </div>
            </div>
            <div className="col-start-3 row-start-3 grid max-w-xl rounded-xl border-2 border-almostwhite p-10 text-xl">
              <h1 className="font-benzin text-2xl">Создание фермы</h1>
              <br></br>
              <div className="grid grid-cols-[3fr_2fr] items-center justify-items-center gap-8">
                <p className="font-montserratRegular text-sm">
                  Делать ферму руками достаточно трудоёмкий процесс, тем более
                  если ферма большая. Наша команда сэкономит ваше время и силы.
                  Мы сделаем вам ферму под ваши задачи, поможем с выбором
                  аккаунтов и быстро создадим ферму <br></br>
                  <br></br>
                  <b className="text-subtext underline">Подробнее...</b>
                </p>
                <div className="grid w-32 justify-items-center">
                  <ServerStackIcon />
                  <button className="mt-10 rounded-lg bg-subline px-5 py-3 font-montserratBold shadow-md transition-colors hover:bg-neutral-800">
                    Заказать
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid justify-items-center">
            <div className="grid max-w-xl rounded-xl border-2 border-almostwhite p-10 text-xl">
              <h1 className="font-benzin text-3xl">
                Бонус при заказе любой услуги
              </h1>
              <br></br>
              <div className="grid grid-cols-[3fr_2fr] items-center justify-items-center">
                <p className="font-montserratRegular text-sm">
                  Каждый наш клиент, который хотя бы раз оплатил услугу,
                  получает эксклюзивную роль в дискорде, которая открывает
                  доступ к полезным каналам, в которых мы публикуем информацию
                  для владельцев ферм.{" "}
                </p>
                <div className="w-40">
                  <img src="../../discord.png" alt="" className="" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 grid justify-items-center">
            <button className="rounded-xl bg-subline p-8 font-montserratBold text-2xl transition-colors hover:bg-neutral-800">
              Обратиться в Тех. Поддержку
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
