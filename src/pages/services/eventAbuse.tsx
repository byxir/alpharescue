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
              Абуз событий для владельцев ферм
            </h1>
            <p className="mt-4">
              Бывает такое, что некоторый софт мы не можем выложить на публику,
              как например это было с софтом на MathVerse. Поэтому, в таких
              случаях, мы предлагаем клиентам нашего сервиса воспользоваться
              услугой абуза.
            </p>
            <br></br>
            <p>
              Ферма у них уже есть, поэтому мы за символический прайс заводим
              аккаунты в событие. За абуз MathVerse клиенты сервиса платили
              всего 10$ за 50 аккаунтов.
            </p>
          </div>
          <div className="grid h-80 w-80 items-center justify-items-center justify-self-center rounded-full border-2 border-subline p-10 font-abibas text-9xl text-accent md:col-start-1 md:row-start-1 md:h-64 md:w-64 md:text-9xl lg:h-80 lg:w-80 lg:text-10xl">
            <div className="h-max p-0">AR</div>
          </div>
        </div>

        <div className="md:px-6">
          <div className="md:px-8">
            <p className="">
              Так же мы можем абузить любой твиттер гив, если клиенту это
              понадобиться, прайс так же символический.
            </p>
            <br></br>
            <p>
              Все анонсы и объявления о том, что появился новый софт под
              событие, мы выкладываем в специальный канал для клиентов в
              дискорде.
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
