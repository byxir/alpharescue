import Link from "next/link";

export default function CallToActionBar() {
  return (
    <div
      className="lg:р-60 grid h-44 w-full content-center items-center justify-start bg-cover bg-center bg-no-repeat pl-4 sm:h-48 sm:pl-8 md:pl-16 lg:grid-cols-[repeat(2,_max-content)] lg:justify-evenly lg:pl-0 xl:h-56 2xl:h-64"
      style={{ backgroundImage: "url('../../../herobg.png')" }}
    >
      <div className="text-2xl sm:w-max sm:text-2xl 2xl:text-4xl">
        <span className="font-benzin">Революция в мире</span>{" "}
        <span className="font-benzin text-bg sm:ml-0">крипто-абуза</span>
      </div>
      <div className="mt-7 grid grid-cols-[repeat(2,_max-content)] gap-4 lg:mt-0 lg:grid-cols-2">
        <Link href="/tools">
          <button className="w-36 rounded-xl bg-almostwhite px-2 py-2 font-montserratBold text-sm text-bg shadow-xl  transition-colors hover:bg-neutral-400 sm:w-44 sm:px-4 sm:py-3 sm:text-base lg:w-auto lg:text-lg 2xl:p-6 2xl:text-xl">
            Инструменты
          </button>
        </Link>
        <Link href="/services">
          <button className="w-36 rounded-xl bg-element px-2 py-2 font-montserratBold text-sm text-almostwhite shadow-xl  transition-all hover:bg-opacity-60 sm:w-44 sm:px-4 sm:py-3 sm:text-base lg:w-auto lg:text-lg 2xl:p-6 2xl:text-xl">
            Услуги
          </button>
        </Link>
      </div>
    </div>
  );
}
