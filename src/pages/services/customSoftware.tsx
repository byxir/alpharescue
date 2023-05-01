import Link from "next/link";
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
              Софт под заказ
            </h1>
            <p className="mt-4">
              Написание софтов и ботов это одна из наших любимых вещей. Мы
              всегда уделяем особое внимание таким заказам, и выполняем их с
              душой. У нас собралась команда опытных программистов, которые
              написали не одну сотню ботов для тем различной сложности.
            </p>
            <br></br>
            <p>
              Поэтому, нашей команде не составит труда написать практически
              любого бота для вас. Каким бы не был ваш случай, мы всегда найдём
              индивидуальный подход.
            </p>
          </div>
          <div className="grid h-80 w-80 items-center justify-items-center justify-self-center rounded-full border-2 border-subline p-10 font-abibas text-9xl text-accent md:col-start-1 md:row-start-1 md:h-64 md:w-64 md:text-9xl lg:h-80 lg:w-80 lg:text-10xl">
            <div className="h-max p-0">AR</div>
          </div>
        </div>

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
