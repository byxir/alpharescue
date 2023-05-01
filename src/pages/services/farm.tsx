import Link from "next/link";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

export default function Farm() {
  return (
    <div className="grid">
      <Header />
      <div className="grid max-w-7xl justify-self-center px-4 py-10 font-montserratRegular text-lg text-subtext sm:text-xl md:md:px-8 md:py-12 lg:px-14 lg:py-20">
        <div className="mb-10 grid grid-cols-1 gap-10 md:mb-10 md:grid-cols-[1fr_2fr]">
          <div className="md:col-start-2">
            <h1 className="font-benzin text-5xl text-almostwhite">
              Создание фермы аккаунтов
            </h1>
            <p className="mt-4">
              Мы с самого начала своей деятельности предоставляем услугу по
              созданию фермы под ключ.
            </p>
            <br></br>
            <p>
              За время нашей работы у нас было множество клиентов, которые
              уходили с полностью заряженной фермой для абуза практически всего,
              что можно найти на просторах web3.
            </p>
          </div>
          <div className="grid h-80 w-80 items-center justify-items-center justify-self-center rounded-full border-2 border-subline p-10 font-abibas text-9xl text-accent md:col-start-1 md:row-start-1 md:h-64 md:w-64 md:text-9xl lg:h-80 lg:w-80 lg:text-10xl">
            <div className="h-max p-0">AR</div>
          </div>
        </div>

        <div className="md:px-6">
          <div className="md:px-8">
            <p className="">
              Помимо создания фермы с нуля, мы также возьмемся и за частичное
              создание фермы, то есть когда вам необходимо как-либо улучшить
              свою ферму или провести грамотную ревизию.
            </p>
            <br></br>
            <p>
              В случае проблем с запуском или использованием вашей фермы мы
              также можем помочь, что-то приведем в порядок, что-то изменим –
              сделаем так, чтобы ваша ферма работала на все 100% и точно окупила
              себя.
            </p>
            <br></br>
            <p>
              Все что от вас требуется после заказа - это ждать, пока мы
              создадим вам полноценную ферму на определенное количество
              аккаунтов.
            </p>
            <br></br>
            <i>
              Если у вас есть вопросы, при заказе вы можете обратиться в
              поддержку, которая ответит вам и поможет решить, какая именно
              ферма вам подойдет.
            </i>
          </div>
        </div>
        <br></br>
        <br></br>
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
