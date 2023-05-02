/* eslint-disable @next/next/no-img-element */
import {
  ArrowDownLeftIcon,
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  ArrowUpLeftIcon,
  ComputerDesktopIcon,
  ServerStackIcon,
  CalendarDaysIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

export default function Services() {
  return (
    <>
      <Header />
      <div className="grid justify-items-center p-4 sm:p-6 lg:p-14">
        <div className="w-full">
          <h1 className="mb-20 mt-10 text-center font-benzin text-5xl">
            Услуги RESCUE
          </h1>
          <div className="mb-24 grid grid-cols-1 grid-rows-2 justify-evenly justify-items-center gap-4 lg:grid-cols-2 xl:grid-cols-[auto_auto_auto] xl:grid-rows-[auto_256px_auto]">
            <div
              id="farm"
              className="grid max-w-xl rounded-xl border-2 border-subtext bg-element p-6 text-xl smx:p-10"
            >
              <ServiceBox
                title="Создание фермы"
                description=" Делать ферму руками достаточно трудоёмкий процесс, тем более
                  если ферма большая. Наша команда сэкономит ваше время и силы.
                  Мы сделаем вам ферму под ваши задачи, поможем с выбором
                  аккаунтов и быстро создадим ферму"
                link="/services/farm"
              >
                <ServerStackIcon />
              </ServiceBox>
            </div>
            <div
              id="accounts"
              className="grid max-w-xl rounded-xl border-2 border-subtext bg-element p-6 text-xl smx:p-10 xl:col-start-3"
            >
              <ServiceBox
                title="Прогрев и оформление аккаунтов"
                description=" Делать ферму руками достаточно трудоёмкий процесс, тем более
                  если ферма большая. Наша команда сэкономит ваше время и силы.
                  Мы сделаем вам ферму под ваши задачи, поможем с выбором
                  аккаунтов и быстро создадим ферму"
                link="/services/accounts"
              >
                <UserCircleIcon />
              </ServiceBox>
            </div>
            <div className="relative col-start-2 row-start-2 hidden h-full w-20 items-center justify-items-center xl:grid">
              <div className="absolute top-0 z-10 col-start-2 row-start-2 grid h-64 w-64 content-center items-center justify-items-center self-center justify-self-center rounded-full bg-element">
                <div className="absolute bottom-2 left-2  z-0 h-10 w-10 text-element">
                  <ArrowDownLeftIcon />
                </div>
                <div className="absolute bottom-2 right-2  z-0 h-10 w-10 text-element">
                  <ArrowDownRightIcon />
                </div>
                <div className="absolute right-2 top-2  z-0 h-10 w-10 text-element">
                  <ArrowUpRightIcon />
                </div>
                <div className="absolute left-2 top-2  z-0 h-10 w-10 text-element">
                  <ArrowUpLeftIcon />
                </div>
                <div className="mb-2 mr-10 h-max font-abibas text-5xl text-accent">
                  ALPHA
                </div>
                <div className="ml-10 h-max font-abibas text-5xl text-accent">
                  RESCUE
                </div>
              </div>
            </div>
            <div
              id="software"
              className="grid max-w-xl rounded-xl border-2 border-subtext bg-element p-6 text-xl smx:p-10 xl:row-start-3"
            >
              <ServiceBox
                title="Софт под заказ"
                description=" Делать ферму руками достаточно трудоёмкий процесс, тем более
                  если ферма большая. Наша команда сэкономит ваше время и силы.
                  Мы сделаем вам ферму под ваши задачи, поможем с выбором
                  аккаунтов и быстро создадим ферму"
                link="/services/customSoftware"
              >
                <ComputerDesktopIcon />
              </ServiceBox>
            </div>
            <div
              id="abuse"
              className="grid max-w-xl rounded-xl border-2 border-subtext bg-element p-6 text-xl smx:p-10 xl:col-start-3 xl:row-start-3"
            >
              <ServiceBox
                title="Абуз событий для владельцев ферм"
                description=" Делать ферму руками достаточно трудоёмкий процесс, тем более
                  если ферма большая. Наша команда сэкономит ваше время и силы.
                  Мы сделаем вам ферму под ваши задачи, поможем с выбором
                  аккаунтов и быстро создадим ферму"
                link="/services/eventAbuse"
              >
                <CalendarDaysIcon />
              </ServiceBox>
            </div>
          </div>
          <div className="grid justify-items-center">
            <div className="grid max-w-xl rounded-xl border-2 border-subtext bg-element p-10 text-xl">
              <h1 className="font-benzin text-2xl">
                Бонус при заказе любой услуги
              </h1>
              <br></br>
              <div className="grid grid-cols-1 items-center justify-items-center smx:grid-cols-[3fr_2fr]">
                <p className="font-montserratRegular text-sm">
                  Каждый наш клиент, который хотя бы раз оплатил услугу,
                  получает эксклюзивную роль в дискорде, которая открывает
                  доступ к полезным каналам, в которых мы публикуем информацию
                  для владельцев ферм.{" "}
                </p>
                <div className="mt-10 w-40 smx:mt-0">
                  <img src="../../discord.png" alt="" className="" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 grid justify-items-center">
            <button className="rounded-xl bg-element p-8 font-montserratBold text-2xl transition-colors hover:bg-opacity-60">
              Обратиться в Тех. Поддержку
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const ServiceBox = ({
  title,
  description,
  link,
  children,
}: {
  title: string;
  description: string;
  link: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="">
      <h1 className="min-h-16 font-benzin text-2xl">{title}</h1>
      <br></br>
      <div className="grid grid-cols-1 items-center justify-items-center gap-8 smx:grid-cols-[3fr_2fr]">
        <p className="font-montserratRegular text-sm">
          {description} <br></br>
          <br></br>
          <Link href={link} className="text-subtext underline">
            Подробнее...
          </Link>
        </p>
        <div className="grid w-40 justify-items-center smx:w-32">
          {children}
          <Link href={link}>
            <button className="mt-10 rounded-lg bg-accent px-5 py-3 font-montserratBold text-element shadow-md transition-colors hover:bg-opacity-60">
              Заказать
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
