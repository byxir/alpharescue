import Link from "next/link";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

export default function Utilities() {
  return (
    <div className="grid">
      <Header />
      <div className="grid max-w-7xl justify-self-center px-4 py-10 font-montserratRegular text-lg text-subtext sm:text-xl md:md:px-8 md:py-12 lg:px-14 lg:py-20">
        <div className="mb-20 grid grid-cols-1 gap-10 md:mb-28 md:grid-cols-[1fr_2fr]">
          <div className="md:col-start-2">
            <h1 className="font-benzin text-5xl text-almostwhite">
              Утилиты RESCUE
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
          <h1 className="mb-6 font-benzin text-4xl text-almostwhite">
            Телеграм-бот
          </h1>

          <div className="md:px-8">
            <p className="">
              Для удобства работы с огромным количеством информации и
              своевременной реакции на сигналы, наша команда разработала бота,
              который присылает вам уведомления прямо в телеграм, в ваш личный
              чат. При этом вы сможете настроить от каких категорий получать
              уведомления, с точностью до канала. Благодаря этому вы не
              пропустите сигналы или важную информацию, а так же будете следить
              за каналами, которые интересны именно вам.  Бота очень легко
              настроить и использовать.
            </p>
            <br></br>
            <p>
              После покупки подписки, перейдите в нижнюю часть каналов дискорда,
              там вы увидите группу «Авторизация» и канал «получить код».
              Перейдите в канал и нажмите на кнопку под сообщением бота. В этой
              же категории бот создаст канал и назовет вашим ником, перейдите
              туда и выполните инструкции в сообщении.После успешной авторизации
              в телеграм боте, выберите нужные категории и каналы, именно от
              этих каналов вы и будете получать уведомления, если канал вам
              больше не интересен, вы можете убрать его через редактирование
              категорий.
            </p>
            <div className="mt-12 font-montserratBold text-2xl text-almostwhite">
              Примеры работы бота:
            </div>
          </div>
        </div>

        <div className="md:px-6">
          <h1 className="mb-6 mt-20 font-benzin text-4xl text-almostwhite md:mt-28">
            Продвинутая настройка каналов
          </h1>

          <div className="md:px-8">
            <p className="">
              В нашем дискорде очень много зеркал западных альфа групп и
              следовательно каналов, чтобы сделать отслеживание информации
              удобнее, мы поделили каналы по категориям (ETH CALLS, SOL CALLS,
              TRADING, NEWS, NFT ANALYTICS, AIRDROP, EDUCATION, ASIAN CALL). За
              какими категориями следить вы выбираете сами, изначально у вас
              будут закрыты все категории, чтобы открыть нужные вам, перейдите в
              канал ping setting и кликните на кнопки с названиями категорий,
              после этого у вас отроются каналы, если категория перестала быть
              интересна, повторно нажмите на кнопку с названием в канале ping
              setting и категория скроется.
            </p>
            <div className="mt-12 font-montserratBold text-2xl text-almostwhite">
              Настройка каналов:
            </div>
          </div>
        </div>

        <div className="md:px-6">
          <h1 className="mb-6 mt-20 font-benzin text-4xl text-almostwhite md:mt-28">
            Сигнальные боты
          </h1>

          <div className="md:px-8">
            <p>
              На сервер мы добавили некоторых аллерт ботов, которые помогут
              заработать вам при своевременном реагировании на аллерт У нас есть
              ряд каналов, которые посвящены щиткоинам, некоторые каналы
              позволяли заработать более 2000% с аллерта.  Так же есть
              сигнальные боты по NFT, отслеживая их сообщения можно узнать, что
              покупают, минтят и холдят знаменитые коллекционеры и эффективные
              трейдеры. Следовательно у вас откроется возможность копировать их
              действия и зарабатывать вместе с ними. Кроме ботов указанных выше,
              есть исключительно информационные каналы, в которых публикуется
              информация о предстоящих минтах и обо всех актуальных WTB
              объявлениях на ОТС площадкахКак видите в нашем дискорде есть
              абсолютно все нужные вам инструменты для эффективной и прибыльной
              работы
            </p>
            <div className="mt-12 font-montserratBold text-2xl text-almostwhite">
              Примеры сигналов от бота:
            </div>
          </div>
        </div>

        <div className="mt-32 grid justify-items-end sm:mt-48">
          <div className="flex items-center space-x-3 font-benzin text-sm text-almostwhite md:space-x-6 md:text-2xl">
            <span>Читать далее:</span>
            <Link href="software">
              <button className="rounded-xl bg-element p-3  hover:bg-opacity-60 md:p-6">
                Софт для абуза
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
