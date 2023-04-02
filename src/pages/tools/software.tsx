import Link from "next/link";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

export default function Software() {
  return (
    <div className="grid">
      <Header />
      <div className="grid max-w-7xl justify-self-center px-4 py-10 font-montserratRegular text-lg text-subtext sm:text-xl md:md:px-8 md:py-12 lg:px-14 lg:py-20">
        <div className="mb-20 grid grid-cols-1 gap-10 md:mb-28 md:grid-cols-[1fr_2fr]">
          <div className="md:col-start-2">
            <h1 className="font-benzin text-5xl text-almostwhite">
              Софт для Абуза
            </h1>
            <p className="mt-4">
              В нашем комьюнити вы найдете софт под все актуальные и прибыльные
              активности в крипте.
            </p>
            <br></br>
            <p>
              Мы пишем ботов для личного применения и делимся с вами тем, что
              используем сами.
            </p>
            <br></br>
            <p>
              В нашей команде несколько опытных PYTHON - разработчиков, которые
              создают софт для абуза, делая его очень быстрым и простым в
              использовании.
            </p>
          </div>
          <div className="grid h-80 w-80 items-center justify-items-center justify-self-center rounded-full border-2 border-subline p-10 font-abibas text-9xl text-accent md:col-start-1 md:row-start-1 md:h-64 md:w-64 md:text-9xl lg:h-80 lg:w-80 lg:text-10xl">
            <div className="h-max p-0">AR</div>
          </div>
        </div>

        <div className="md:px-6">
          <h1 className="mb-6 font-benzin text-4xl text-almostwhite">
            Как это происходит?
          </h1>

          <div className="md:px-8">
            <p className="">
              Наша команда находит интересную активность, которая потенциально
              может принести хорошую прибыль, но на нескольких аккаунтах мы не
              останавливаемся, поэтому пишем софт и участвуем в активности с
              1000-2000 аккаунтов. И сразу же выкладываем бота в наш дискорд, в
              скором времени будет реализована система запуска софта в один клик
              через личный кабинет на сайте.
            </p>
            <br></br>
            <h4 className="font-montserratBold text-2xl text-almostwhite">
              Обычно для использования софта вам нужны базовые вещи:
            </h4>
            <br></br>
            <ul>
              <li>• Аккаунты твиттера (куки)</li>
              <li>• Кошельки (можно сгенерировать на коинтул)</li>
              <li>
                • Почты (можно софтом нарегать ethermail и купить mail.ru
                почты), В редких случаях - дискорд
              </li>
            </ul>
            <br></br>
            <i className="text-almostwhite">
              Если у вас есть всё из списка выше, вы сможете использовать весь
              софт, который мы выпускаем, в некоторых случаях для использования
              софта не нужен твиттер, как и дискорд.
            </i>
            <br></br>
            <br></br>
            <p>
              Для запуска софта в 99% случаев нужно заполнить лишь несколько txt
              файлов и запустить бота.
            </p>
            <br></br>
            <p>
              К каждому софту мы прикладываем инструкцию, можете посмотреть
              требования к софту в наших статьях на mirror.
            </p>
            <br></br>
            <p>
              Всё очень просто, если вы не знаете где взять аккаунты или у вас
              возникли вопросы по запуску, наша команда всегда сможет оперативно
              помочь вам в чате дискорда.
            </p>
          </div>
        </div>

        <div className="md:px-6">
          <h1 className="mb-6 mt-20 font-benzin text-4xl text-almostwhite md:mt-28">
            Насколько актуален софт?
          </h1>

          <div className="md:px-8">
            <p className="">
              Так как мы сами заинтересованы в заработке на абузе событий, софт
              выходит очень быстро и, следовательно, он всегда максимально
              актуален, на написание софта нашей команде требуется около 20-60
              минут, время зависит от сложности.
            </p>
            <div className="mt-12 font-montserratBold text-2xl text-almostwhite">
              Что делать, если я не хочу использовать .exe?
            </div>
            <br></br>
            <p className="">
              В ближайшее время, запуск софта будет осуществляться через сайт.
            </p>
            <br></br>
            <p>
              Вам не нужно будет ничего скачивать и заполнять, нужно будет
              только один раз настроить конфигурации на сайте и запускать софт в
              один клик. Сам софт будет работать на нашей мощности.
            </p>
            <div className="mt-12 font-montserratBold text-2xl text-almostwhite">
              А если у вас нет бота для активности, которая мне интересна?
            </div>
            <br></br>
            <p>
              Такое может случится, так как наша команда физически не может
              охватить все события. Если вы нашли интересную активность, вы
              можете написать нам в специальный канал в дискорде
              (#👾soft-suggestion), мы рассмотрим вашу заявку и, возможно,
              напишем софт.
            </p>
            <br></br>
            <i>
              При этом, вы получите 20% от нашей прибыли, и сможете запустить
              софт, используя свои аккаунты. Бот, тем не менее, будет доступен
              всем участникам сообщества.
            </i>
          </div>
        </div>

        <div className="mt-32 grid justify-items-end sm:mt-48">
          <div className="flex items-center space-x-3 font-benzin text-sm text-almostwhite md:space-x-6 md:text-2xl">
            <span>Читать далее:</span>
            <Link href="software">
              <button className="rounded-xl bg-element p-3  hover:bg-opacity-60 md:p-6">
                Розыгрыши WL
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
