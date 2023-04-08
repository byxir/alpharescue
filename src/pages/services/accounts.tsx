import Footer from "~/components/Footer";
import Header from "~/components/Header";

export default function Accounts() {
  return (
    <div className="grid">
      <Header />
      <div className="grid max-w-7xl justify-self-center px-4 py-10 font-montserratRegular text-lg text-subtext sm:text-xl md:md:px-8 md:py-12 lg:px-14 lg:py-20">
        <div className="mb-20 grid grid-cols-1 gap-10 md:mb-28 md:grid-cols-[1fr_2fr]">
          <div className="md:col-start-2">
            <h1 className="font-benzin text-5xl text-almostwhite">
              Оформление и прогрев аккаунтов
            </h1>
            <p className="mt-4">
              Наша услуга с оформлением и прогревом аккаунтов подойдет как
              людям, кто только что создал свою ферму, так и людям, которые
              давно имеют большое количество аккаунтов.
            </p>
            <br></br>
            <p>
              Мы создаем, или берем ваши, аккаунты твиттера, и делаем из них
              максимально живые страницы на крипто-тематику.
            </p>
          </div>
          <div className="grid h-80 w-80 items-center justify-items-center justify-self-center rounded-full border-2 border-subline p-10 font-abibas text-9xl text-accent md:col-start-1 md:row-start-1 md:h-64 md:w-64 md:text-9xl lg:h-80 lg:w-80 lg:text-10xl">
            <div className="h-max p-0">AR</div>
          </div>
        </div>

        <div className="md:px-6">
          <h1 className="font-benzin text-4xl text-almostwhite">
            Оформление это:
          </h1>
          <ul className="mt-10 md:px-8">
            <li>• Установка аватара – чаще всего NFT</li>
            <br></br>
            <li>• Баннер – обычно ставим красивый, нейтральный фон</li>
            <br></br>
            <li>
              • Био – делаем типичный крипто статус, собирательный образ крипто
              био. Иногда бот может поставить лайфстайл описание
            </li>
            <br></br>
            <li>
              • Адекватный никнейм и тег - в этом плане стараемся сочетать имена
              с крипто элементами в нике, а так же рандомно добавляем эмодзи
              различных сообществ, альф и проектов.
            </li>
          </ul>
          <div className="mt-8 md:px-8">
            <h2 className="font-montserratBold text-2xl text-almostwhite">
              Оформленные аккаунты = больше шанов на победу
            </h2>
            <div className="mt-4">
              <p>
                Как вы знаете, многие основатели проектов упорно борются с
                ботами, но если ваш аккаунт будет красиво оформлен и на наем
                будет хорошее количество постов, то вам отрыта дорога
                практически во все гивы в твиттере, рафлы на других площадках и
                к абузу всех доступных событий, где обязательным требованием
                является подключение социальных сетей.
              </p>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <h1 className="font-benzin text-4xl text-almostwhite">
            Прогрев это:
          </h1>
          <div className="mt-10 md:px-8">
            <p>
              Регулярное написание постов на крипто тематику и не только, а так
              же проставление лайков, ретвитов и подписок, по системе, которую
              мы выработали за годы работы с твиттером. Все это мы делаем с
              помощью своего софта.
            </p>
            <br></br>
            <p>
              После прогрева, вашим аккаунтам не будет страшна активность, и они
              будут выглядеть как аккаунты живых людей!
            </p>
          </div>
          <br></br>
          <div className="mt-8 md:px-8">
            <h2 className="font-montserratBold text-2xl text-almostwhite">
              Плюсы прогрева:
            </h2>
            <div className="mt-4">
              <p>
                <u>
                  Минимизация бана аккаунтов благодаря нашей системе прогрева
                </u>{" "}
                - на аккаунты подается оптимальная нагрузка и проявляется
                активность в виде регулярных постов. Это позволяет вам
                минимизировать шансы бана и спокойно работать с аккаунтами.
              </p>
            </div>
          </div>
          <br />
          <br />
          <br />
          <h1 className="font-benzin text-4xl text-almostwhite">
            Пример события, где пригодился бы прогрев и оформление
          </h1>
          <div className="mt-10 md:px-8">
            <p>
              Можем привести пример коллекции{" "}
              <b className="font-montserratBold">Letters Royale</b>, которая
              раздавала бесплатные тикеты на солане, даже при небольшом
              количестве твиттер аккаунтов у вас была хорошая возможность
              заработать.
            </p>
            <br></br>
            <p>
              При этом плохие твиттер аккаунты отсекали, что сильно затрудняло
              абуз данной темы. Коллекция имела неограниченный саплай и был лишь
              дедлайн по времени. Cминтив тикет, его можно было сразу же продать
              в х2.
            </p>
            <br></br>
            <p>
              Хорошие аккаунты твиттера – это неотъемлемая часть фермы, они
              регулярно пригождаются и мы настоятельно рекомендуем вам содержать
              даже небольшое количество.
            </p>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>

        <div className="md:px-6">разметка для заказа</div>
      </div>
      <Footer />
    </div>
  );
}
