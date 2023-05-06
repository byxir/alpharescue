import Link from "next/link";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

export default function InstructionsPage() {
  return (
    <div className="grid">
      <Header />
      <div className="grid max-w-7xl justify-self-center px-4 py-10 font-montserratRegular text-lg text-subtext sm:text-xl md:md:px-8 md:py-12 lg:px-14 lg:py-20">
        <div className="mb-20 grid grid-cols-1 gap-10 md:mb-28 md:grid-cols-[1fr_2fr]">
          <div className="md:col-start-2">
            <h1 className="font-benzin text-5xl text-almostwhite">
              Инструкция к Raffle Bot
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
          <h1 id="howToUse" className="font-benzin text-4xl text-almostwhite">
            Как использовать бота?
          </h1>
          <ul className="mt-10 md:px-8">
            <li>
              • Необходимо подготовить .txt файлы с ресурсами и загрузить их на
              сайте. Это можно сделать в{" "}
              <Link
                className="text-accent underline"
                href={"/rafflebot/settings"}
              >
                настройках к Raffle Bot.
              </Link>
            </li>
            <br></br>
            <li>
              • Вы можете так же настроить конфигурации - коллекции аккаунтов
              которые вы хотите использовать. Их можно настроить до 4-х штук.
            </li>
            <br></br>
            <li>
              • Выбрать розыгрыш, который соответствует вашим ресурсам.
              Например, если на ваших аккаунтах не лежит 0.1 ETH, то выбирать
              раффл с требованием холда 0.1 ETH не стоит.
            </li>
            <br></br>
            <li>
              • Запустить абуз с помощью кнопки {"'"}Запустить абуз{"'"} в
              настройках, выбрав время захода на раффл.
            </li>
          </ul>
          <br></br>
          <br></br>
          <br></br>
          <h1
            id="loadAccounts"
            className="font-benzin text-4xl text-almostwhite"
          >
            Как загрузить аккаунты?
          </h1>
          <div className="mt-10 md:px-8">
            <p>
              Для того чтобы загрузить аккаунты, необходимо подготовить txt
              файлы с ресурсами (твиттер, дискорды, прокси и все что необходимо
              для абуза). После этого вы можете загрузить их на сайте в
              несколько кликов.
            </p>
            <br></br>
            <br></br>
            <br></br>
            <div>
              <div className="font-montserratBold text-2xl text-almostwhite">
                Формат загрузки почт:
              </div>
              <div>
                {"<"}почта1{">"}
              </div>
              <div>
                {"<"}почта2{">"}
              </div>
              <div>
                {"<"}почта3{">"}
              </div>
              <br></br>
              <div>
                (иногда бывает, что вам нужно загрузить дополнительные параметры
                вместе с почтой, чаще всего - пароль.)
              </div>
              <br></br>
              <div>
                {"<"}почта:пароль{">"}
              </div>
              <div>
                {"<"}почта:пароль{">"}
              </div>
              <br></br>
              <br></br>
              <br></br>
              <h2 className="font-montserratBold text-2xl text-almostwhite">
                Формат загрузки твиттер - аккаунтов:
              </h2>
              <br></br>
              <img src="../../twitterexample.png" />
              <div>
                {"<"}auth_token:ct0{">"}
              </div>
              <div>
                {"<"}auth_token:ct0{">"}
              </div>
              <div>
                {"<"}auth_token:ct0{">"}
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="mt-8 md:px-8">
            <h2 className="font-montserratBold text-2xl text-almostwhite">
              Формат загрузки прокси:
            </h2>
            <br></br>
            <img src="../../proxyexample.png" />
            <div>
              {"<"}ip:port:login:password{">"}
            </div>
            <div>
              {"<"}ip:port:login:password{">"}
            </div>
            <div>
              {"<"}ip:port:login:password{">"}
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="mt-8 md:px-8">
            <h2 className="font-montserratBold text-2xl text-almostwhite">
              Формат загрузки дискордов:
            </h2>
            <br></br>
            <img src="../../discordexample.png" />
            <div>
              {"<"}token{">"}
            </div>
            <div>
              {"<"}token{">"}
            </div>
            <div>
              {"<"}token{">"}
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="mt-8 md:px-8">
            <h2 className="font-montserratBold text-2xl text-almostwhite">
              Формат загрузки метамасков:
            </h2>
            <br></br>
            <img src="../../metamaskexample.png" />
            <div>
              {"<"}address:privateKey{">"}
            </div>
            <div>
              {"<"}address:privateKey{">"}
            </div>
            <div>
              {"<"}address:privateKey{">"}
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <h2 id="buyAccounts" className="font-benzin text-4xl text-almostwhite">
          Где купить аккаунты?
        </h2>
        <div className="mt-10 md:px-8">
          <p>
            Лично мы на протяжении всего времени использовали разные площадки и
            разных продавцов. Мы давно поняли, что здесь имеет место случай,
            например, при покупке одной пачки твиттер аккаунтов вам могут
            попасться хорошие твиттера, которые не будет банить долгое время,
            при покупке следующей пачки - плохие аккаунты, которые отлетят через
            пару дней, при этом обе пачки вы покупали у одного продавца.
          </p>
          <br></br>
          <p>
            Поэтому посоветовать какую-то одну площадку сложно, единственное что
            можно сказать - не стоит брать самые дешевые, лучше немного
            переплатить, но заплатить за более или менее хорошие аккаунты.
          </p>
          <br></br>
          <p>
            Если указывать на конкретные площадки, то мы настоятельно
            рекомендуем использовать следующие: hstock{" "}
            <a href="https://hstock.org" className="text-accent underline">
              https://hstock.org/
            </a>{" "}
            и accs{" "}
            <a
              className="text-accent underline"
              href="https://accsmarket.com/ru"
            >
              https://accsmarket.com/ru
            </a>
            . Здесь мы брали аккаунты множество раз и в общей массе с ними все
            было впорядке.
          </p>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <h2 id="captchaKey" className="font-benzin text-4xl text-almostwhite">
          Ключ от капчи
        </h2>
        <div className="mt-10 md:px-8">
          <div className="">
            Мы используем капчу Capmonster, другие капчи не подходят.
          </div>
          <div>Введите ключ от капчи в соответствующее поле в настройках.</div>
          <div className="">
            Вы всегда сможете поменять ключ от капчи там же.
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <h2 id="errors" className="font-benzin text-4xl text-almostwhite">
          Справочник по ошибкам
        </h2>
        <div className="mt-10 md:px-8">
          <p>
            Для того чтобы загрузить аккаунты, необходимо подготовить txt файлы
            с ресурсами (твиттер, дискорды, прокси и все что необходимо для
            абуза). После этого вы можете загрузить их на сайте в несколько
            кликов.
          </p>
          <br></br>
          <br></br>
          <div>
            <div className="font-montserratBold text-2xl text-almostwhite">
              Универсальные:
            </div>
            <br></br>
            <div>
              • Discord join failed 0 - Проблема с процессом захода в канал
            </div>
            <div>• Discord join failed 1 - Проблема с дискорд аккаунтом</div>
            <br></br>
            <div>
              • Twitter connection failed - Проблема с подключением твиттера
              (Попробуйте запустить заход с данного аккаунта повторно либо
              сделайте замену)
            </div>
            <br></br>
            <br></br>
            <h2 className="font-montserratBold text-2xl text-almostwhite">
              Alphabot:
            </h2>
            <br></br>
            <div>
              • Unknown status code while getting nonce - Ошибка при получении
              Nonce кода для авторизации Failed to log in - Ошибка логинизации
            </div>
            <br></br>
            <div>
              • Registration failed 0 - Ошибка при регистрации (подробности
              уточняйте у модеров)
            </div>
            <div>
              • Registration failed 1 - Возможно невалидный в этот момент сайт
            </div>
            <div>
              • Registration failed 2 - Ошибка при выполнении твиттер задач
            </div>
            <br></br>
            <br></br>
            <h2 className="font-montserratBold text-2xl text-almostwhite">
              Premint:
            </h2>
            <br></br>
            <div>
              • Premint login failed (0-4) - Уточняйте подробности у модераторов
            </div>
            <br></br>
            <div>
              • Premint login failed (5) - Особенная ошибка с Proxy (Замените
              прокси или подождите несколько дней перед тем, как ip будет
              извлечен из блэклиста Cloudflare)
            </div>
            <div>
              • Submitting entry failed 4 - Не выполнены какие либо условия при
              регистрации
            </div>
            <div>• Submitting entry failed 3 - Специфические проблемы</div>
            <br></br>
            <br></br>
            <h2 className="font-montserratBold text-2xl text-almostwhite">
              Superful:
            </h2>
            <br></br>
            <div>
              • Superful login failed 2 - Проблема с логинингом в аккаунт по
              запросам, попробуйте зайти в него руками через кошелек хотябы 1
              раз, после чего повторите попытку
            </div>
            <br></br>
            <div>
              • Superful login failed 1 - Уточняйте подробности у модераторов
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <Link
          href="https://t.me/rescue_manager"
          className="text-accent underline md:px-6"
        >
          Связаться с менеджером
        </Link>
      </div>
      <Footer />
    </div>
  );
}
