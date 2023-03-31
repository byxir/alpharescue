/* eslint-disable @next/next/no-img-element */
import Footer from "~/components/Footer";
import Header from "~/components/Header";

export default function About() {
  return (
    <div className="grid">
      <Header />
      <div className="w-full max-w-7xl justify-self-center px-4 font-montserratRegular sm:px-6 lg:px-10 xl:px-14">
        <div className="w-full text-almostwhite">
          <div className="mb-36 mt-20 grid justify-items-center">
            <h1 className="w-full text-start font-benzin text-5xl smx:text-center xl:text-5xl">
              Кто мы?
            </h1>
            <div className="mt-10 w-full text-lg sm:text-xl">
              <p>
                Наша команда занимается мультиаккингом различных событий в
                крипте с использованием софта для автоматизации, так же мы
                охватываем сферы NFT и трейдинга.
              </p>
              <br></br>
              <p>
                Команда сбалансирована благодаря своей многопрофильности. У нас
                есть опытные разработчики, ресерчеры и абузеры. Каждый из членов
                команды хорошо знает свое дело и дополняет команду своими
                навыками.
              </p>
              <br></br>
              <p>
                Именно благодаря балансу в навыках и опыте, вы можете видеть
                качественный продукт в лице нашего сообщества ALPHA RESCUE
              </p>
            </div>
          </div>
          <div className="mb-36 mt-20 grid justify-items-center font-benzin text-5xl xl:text-5xl">
            <h1 className="mb-8">RESCUE TEAM</h1>
            <div className="grid grid-cols-2 gap-10 xl:grid-cols-4">
              <div className="">
                <img src="../../dusty.png" alt="" className="" />
                <div className="lg: mt-6 font-benzin text-xl lg:text-2xl">
                  DUSTY_ETH
                </div>
                <div className="font-montserratRegular text-sm text-subtext lg:text-base">
                  Founder
                </div>
              </div>
              <div className="">
                <img src="../../qwex.png" alt="" className="" />
                <div className="mt-6 font-benzin text-xl lg:text-2xl">Qwex</div>
                <div className="font-montserratRegular text-sm text-subtext lg:text-base">
                  Chief Developer
                </div>
              </div>
              <div className="">
                <img src="../../byxir.png" alt="" className="" />
                <div className="mt-6 font-benzin text-xl lg:text-2xl">
                  byxir
                </div>
                <div className="font-montserratRegular text-sm text-subtext lg:text-base">
                  Web Developer & Designer
                </div>
              </div>
              <div className="">
                <img src="../../messorem.png" alt="" className="" />
                <div className="lg:text- 2xl mt-6 font-benzin text-xl">
                  Messørem
                </div>
                <div className="font-montserratRegular text-sm text-subtext lg:text-base">
                  Web3 & PY Developer
                </div>
              </div>
              <div className="">
                <img src="../../leppi.png" alt="" className="" />
                <div className="mt-6 font-benzin text-xl lg:text-2xl">
                  Leppi
                </div>
                <div className="font-montserratRegular text-sm text-subtext lg:text-base">
                  Web3 Developer & Researcher
                </div>
              </div>
              <div className="">
                <img src="../../gefa.png" alt="" className="" />
                <div className="mt-6 font-benzin text-xl lg:text-2xl ">
                  GEFA
                </div>
                <div className="font-montserratRegular text-sm text-subtext lg:text-base">
                  Researcher & Content Maker
                </div>
              </div>
              <div className="">
                <img src="../../vegas.png" alt="" className="" />
                <div className="mt-6 font-benzin text-xl lg:text-2xl ">
                  VEGAS
                </div>
                <div className="font-montserratRegular text-sm text-subtext lg:text-base">
                  Researcher & Content Maker
                </div>
              </div>
              <div className="">
                <img src="../../doublec.png" alt="" className="" />
                <div className="mt-6 font-benzin text-xl lg:text-2xl">
                  DOUBLE C
                </div>
                <div className="font-montserratRegular text-sm text-subtext lg:text-base">
                  Researcher & Content Maker
                </div>
              </div>
            </div>
          </div>
          <div className="grid justify-items-center">
            <div className="text-start lg:text-center">
              <h1 className="font-benzin text-5xl xl:text-5xl">
                RESCUE ROADMAP
              </h1>
              <div className="mt-6 max-w-md text-start text-xs text-subtext">
                Раскрытие дорожной карты происходит постепенно. Путем
                голосования в нашем дискорде, участники постепенно открывают
                блоки.
              </div>
            </div>
            <div className="mb-24 mt-10 grid w-full grid-cols-1 gap-10 lg:grid-cols-3">
              <div className="mt-6 grid">
                <div className="mb-6 text-center font-montserratBold text-3xl lg:text-2xl">
                  Контент
                </div>
                <div className="h-60 w-full max-w-md justify-self-center rounded-xl bg-element shadow-md"></div>
                <div className="grid h-12 grid-cols-2">
                  <div className="h-full w-full border-r-2 border-element"></div>
                </div>
                <div className="h-60 w-full max-w-md justify-self-center rounded-xl bg-element shadow-md"></div>
                <div className="grid h-12 grid-cols-2">
                  <div className="h-full w-full border-r-2 border-element"></div>
                </div>
                <div className="h-60 w-full max-w-md justify-self-center rounded-xl bg-element shadow-md"></div>
              </div>
              <div className="mt-6 grid">
                <div className="mb-6 text-center font-montserratBold text-3xl lg:text-2xl">
                  Разработка
                </div>
                <div className="h-60 w-full max-w-md justify-self-center rounded-xl bg-element shadow-md"></div>
                <div className="grid h-12 grid-cols-2">
                  <div className="h-full w-full border-r-2 border-element"></div>
                </div>
                <div className="h-60 w-full max-w-md justify-self-center rounded-xl bg-element shadow-md"></div>
                <div className="grid h-12 grid-cols-2">
                  <div className="h-full w-full border-r-2 border-element"></div>
                </div>
                <div className="h-60 w-full max-w-md justify-self-center rounded-xl bg-element shadow-md"></div>
              </div>
              <div className="mt-6 grid">
                <div className="mb-6 text-center font-montserratBold text-3xl lg:text-2xl">
                  Услуги
                </div>
                <div className="h-60 w-full max-w-md justify-self-center rounded-xl bg-element shadow-md"></div>
                <div className="grid h-12 grid-cols-2">
                  <div className="h-full w-full border-r-2 border-element"></div>
                </div>
                <div className="h-60 w-full max-w-md justify-self-center rounded-xl bg-element shadow-md"></div>
                <div className="grid h-12 grid-cols-2">
                  <div className="h-full w-full border-r-2 border-element"></div>
                </div>
                <div className="h-60 w-full max-w-md justify-self-center rounded-xl bg-element shadow-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
