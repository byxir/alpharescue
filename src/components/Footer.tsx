const navigation = {
  solutions: [
    { name: "Продукты", href: "#" },
    { name: "Преимущества", href: "#" },
    { name: "Примеры заработка", href: "#" },
    { name: "Подписаться", href: "#" },
    { name: "FAQ", href: "#" },
  ],
  support: [
    { name: "Community pass", href: "#" },
    { name: "Raffle bot", href: "#" },
    { name: "Speed mint", href: "#" },
  ],
  company: [
    { name: "Создание фермы", href: "#" },
    { name: "Прогрев аккаунтов", href: "#" },
    { name: "Софт под заказ", href: "#" },
    { name: "Абуз под фермы", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="bg-cover bg-bottom bg-no-repeat font-montserratRegular"
      style={{ backgroundImage: "url('../../../herobg.png')" }}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-10 sm:pt-24 lg:px-8 lg:pt-20">
        <div className="justify-between xl:grid xl:grid-cols-[repeat(2,_max-content)] xl:gap-8">
          <div className="grid text-5xl text-bg">
            <div className="mt-2 font-benzin">
              <span className="text-almostwhite">ALPHA</span>{" "}
              <span className="text-bg">RESCUE</span>
            </div>
            <a
              href="t.me"
              className="w-max self-end rounded-md bg-bg bg-opacity-0 px-3 py-2 font-montserratRegular text-base leading-6 text-element transition-all hover:bg-opacity-5"
            >
              Обратиться в тех. поддержку...
            </a>
          </div>
          <div className="mt-16 w-max gap-8 xl:mt-0">
            <div className="grid gap-6 md:grid md:grid-cols-3 md:gap-12">
              <div>
                <h3 className="font-montserratBold text-base font-semibold leading-6 text-bg">
                  Главная
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-element hover:text-bg"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="font-montserratBold text-base font-semibold leading-6 text-bg">
                  Инструменты
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-element hover:text-bg"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-montserratBold text-base font-semibold leading-6 text-bg">
                  Услуги
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-element hover:text-bg"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-900/10 pt-8 sm:mt-12 lg:mt-16">
          <p className="text-xs leading-5 text-element">
            &copy; 2022 Alpha Rescue, All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
