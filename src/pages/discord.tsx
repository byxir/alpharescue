import Link from "next/link";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

export default function Discord() {
  return (
    <div className="grid">
      <Header />
      <div className="grid max-w-7xl justify-self-center px-4 py-10 font-montserratRegular text-lg text-subtext sm:text-xl md:px-8 md:py-12 lg:px-14 lg:py-20">
        <div className="mb-20 grid grid-cols-1 gap-10 md:mb-28 md:grid-cols-[1fr_2fr]">
          <div className="">
            <h1 className="font-benzin text-5xl text-almostwhite">
              RESCUE Discord
            </h1>
            <p className="mt-4">
              Дискорд – наша основная социальная сеть, в которой мы делимся
              информацией, общаемся и проводим АМА сессии.
            </p>
            <h2 className="mt-8 font-montserratBold text-2xl text-almostwhite">
              Контент в дискорде делится на две категории:
            </h2>
            <div className="mt-4 flex space-x-2">
              <div>1. </div>
              <div>
                Зеркала некоторых западных альфа-групп, список которых постоянно
                пополняется
              </div>
            </div>
            <div className="mt-2 flex space-x-2">
              <div>2.</div>
              <div>Информация от нашей команды</div>
            </div>
          </div>
          <div className="grid h-80 w-80 items-center justify-items-center justify-self-center rounded-full border-2 border-subline p-10 font-abibas text-9xl text-accent md:col-start-1 md:row-start-1 md:h-64 md:w-64 md:text-9xl lg:h-80 lg:w-80 lg:text-10xl">
            <div className="h-max p-0">AR</div>
          </div>
        </div>
        <div className="md:px-6">
          <h1 className="font-benzin text-4xl text-almostwhite">
            Контент RESCUE
          </h1>
          <div className="mt-10 space-x-2 md:px-8">
            <span className="font-montserratBold text-2xl text-almostwhite">
              ETH Calls
            </span>
            <span>
              – в этой категории 12 каналов с сигналами на вторичный рынок NFT
              на эфире. Каждый канал привязан к коллеру из приватной альфа
              группы. Мы лично отбирали каждого коллера по эффективности и
              профиту с сигналов.
            </span>
          </div>
          <div className="mt-8 font-montserratBold text-2xl text-almostwhite md:px-8">
            <h2>Примеры профита:</h2>
            <div className="mt-4"></div>
          </div>

          <div className="mt-36 space-x-2 md:px-8">
            <span className="font-montserratBold text-2xl text-almostwhite">
              SOL Calls
            </span>
            <span>
              – эта категория с сигналами на вторичный рынок NFT на солане. По
              этой категории всё так же как и с ETH Calls, единственная разница
              в том, что в категории исключительно сигналы на солану. Категория
              насчитывает 6 каналов
            </span>
          </div>
          <div className="mt-8 font-montserratBold text-2xl text-almostwhite md:px-8">
            <h2>Примеры профита:</h2>
            <div className="mt-4"></div>
          </div>

          <div className="mt-36 space-x-2 md:px-8">
            <span className="font-montserratBold text-2xl text-almostwhite">
              Trading Calls
            </span>
            <span>
              – в каналах этой категории можно найти сигналы на спот и фьючерсы,
              наша команда регулярно заходит в сделки по сигналам из каналов,
              поэтому можем смело рекомендовать. В категории 6 каналов.
            </span>
          </div>
          <div className="mt-8 font-montserratBold text-2xl text-almostwhite md:px-8">
            <h2>Примеры профита:</h2>
            <div className="mt-4"></div>
          </div>

          <div className="mt-36 space-x-2 md:px-8">
            <span className="font-montserratBold text-2xl text-almostwhite">
              Tools
            </span>
            <span>
              – эта категория инструментов и аллерт ботов. В ней можно найти
              ботов на щитки, ботов, которые сигнализируют о покупках NFT
              различными трейдерами и коллекционерами. Так же преминт парсер,
              подборки рафлов и многое другое, более подробно читайте тут
            </span>
          </div>
          <div className="mt-8 font-montserratBold text-2xl text-almostwhite md:px-8">
            <h2>Примеры профита:</h2>
            <div className="mt-4"></div>
          </div>

          <div className="mt-36 space-x-2 md:px-8">
            <span className="font-montserratBold text-2xl text-almostwhite">
              News Mirror
            </span>
            <span>
              – категория с важными новостями из мира криптовалюты. Подборки
              новостей и анонсов от различных проектов можно найти именно тут.
            </span>
          </div>

          <div className="mt-12 space-x-2 md:px-8">
            <span className="font-montserratBold text-2xl text-almostwhite">
              NFT Analytics
            </span>
            <span>
              – в этой категории 13 каналов, в каждый из которых приходят
              сообщения с разборами NFT проектов, в том числе на ранней стадии,
              различные подборки рафлов и важные анонсы по проектам.
            </span>
          </div>

          <div className="mt-12 space-x-2 md:px-8">
            <span className="font-montserratBold text-2xl text-almostwhite">
              Asian Calls
            </span>
            <span>
              – эта категория с обзорами и сигналами на NFT из азиатских
              источников. В Азии рынок специфичен, но от этого не менее
              интересен, поэтому заслуживает отдельной категории с  12 каналами.
            </span>
          </div>
        </div>

        <div className="md:px-6">
          <h1 className="mt-28 font-benzin text-4xl text-almostwhite md:mt-36">
            Информация от команды
          </h1>

          <div className="mt-12 space-x-2 md:px-8">
            <span className="font-montserratBold text-2xl text-almostwhite">
              Rescue Team
            </span>
            <span>
              – в каналах этой категории мы публикуем информацию от команды, тут
              вы встретите абсолютно разные посты, начиная с рекомендаций по
              абузу ретроактивностей, заканчивая подборками с NFT коллекциями на
              ранней стадии. Наша команда охватывает большую часть сфер в
              крипте, поэтому мы рассказываем обо всем.
            </span>
          </div>
        </div>

        <div className="md:px-6">
          <h1 className="mb-6 mt-28 font-benzin text-4xl text-almostwhite md:mt-36">
            Коммьюнити
          </h1>

          <div className="md:px-8">
            <span className="">
              Нам удалось собрать в своем дискорде достаточно дружное и
              сплоченное комьюнити, которое помогает друг другу и открыто
              делиться информацией. В чате можно встретить кодеров, ребят,
              которые зарабатывают на нодах, NFT трейдеров и ретро хантеров. Для
              нас очень важно, какое комьюнити наполняет наш сервер, поэтому мы
              всячески вознаграждаем активных участников и поддерживаем ламповую
              атмосферу на сервере.
            </span>
          </div>
        </div>

        <div className="md:px-6">
          <h1 className="mb-6 mt-28 font-benzin text-4xl text-almostwhite md:mt-36">
            AMA - сессии
          </h1>

          <div className="md:px-8">
            <span className="">
              Мы часто проводим войсы и АМА сессии, на них анонсируем важные
              новости, делимся своим опытом и информацией с сообществом. Иногда
              приглашаем интересных гостей, недавно приходили ребята из ADS
              Power, а до этого разработчик из команды Scroll.
            </span>
          </div>
        </div>

        <div className="mt-32 grid justify-items-end sm:mt-48">
          <div className="flex items-center space-x-3 font-benzin text-sm text-almostwhite md:space-x-6 md:text-2xl">
            <span>Читать далее:</span>
            <Link href="utilities">
              <button className="rounded-xl bg-element p-3 shadow-md hover:bg-opacity-60 md:p-6">
                Утилиты RESCUE
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
