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
              Розыгрыши WL
            </h1>
            <p className="mt-4">
              Сейчас мы расскажем, как проходят у нас розыгрыши WL и почему это
              максимально легкое получение роли, которое вы можете найти.
            </p>
            <br></br>
            <p>
              В основном мы делаем розыгрыши, которые получаем благодаря
              коллаборациям.
            </p>
            <br></br>
            <p>
              Зачастую вы можете встретить здесь разнообразные проекты, начиная
              от просто перспективных, заканчивая топами о которых многие
              говорят.
            </p>
          </div>
          <div className="grid h-80 w-80 items-center justify-items-center justify-self-center rounded-full border-2 border-subline p-10 font-abibas text-9xl text-accent md:col-start-1 md:row-start-1 md:h-64 md:w-64 md:text-9xl lg:h-80 lg:w-80 lg:text-10xl">
            <div className="h-max p-0">AR</div>
          </div>
        </div>

        <div className="md:px-6">
          <h1 className="mb-6 font-benzin text-4xl text-almostwhite">
            Почему это максимально легкие WL?
          </h1>

          <div className="md:px-8">
            <p className="">
              В нашем закрытом сообществе хорошие шансы залутать WL в какой-либо
              проект, так как участников собирается не много, в среднем это 30
              человек. Розыгрыши проходят несколько раз в неделю, при этом мы
              стараемся не брать откровенно слабые проекты. Разыгрываем в
              среднем от 3-10 WL в одном розыгрыше.
            </p>
            <br></br>
            <br></br>
            <p>
              Сомневаемся, что вы где-то найдете настолько легкое и понятное
              получение ролей в проекты. Вам не придется сидеть и гриндить
              сообщения или наводить активность в социальных сетях проекта,
              достаточно просто зайти в гив на 30 человек.
            </p>
            <br></br>
            <p>
              Из прикольных проектов на которые мы разыгрывали WL: VLVT (20WL),
              Frog Central (3WL), Stumble Upon Rumble (8WL) и многие другие. В
              будущем мы будем разыгрывать еще больше WL в крутые проекты.
            </p>
          </div>
        </div>

        <div className="mt-12 grid justify-items-end sm:mt-48">
          <div className="flex items-center space-x-3 font-benzin text-sm text-almostwhite md:space-x-6 md:text-2xl">
            <span>Читать далее:</span>
            <Link href="/rafflebot">
              <button className="rounded-xl bg-element p-3 shadow-md  hover:bg-opacity-60 md:p-6">
                Инструкция Raffle Bot
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
