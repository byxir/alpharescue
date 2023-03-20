/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import localFont from "next/font/local";

const navigation = [
  { name: "Главная", href: "#" },
  { name: "Инструменты", href: "#" },
  { name: "Услуги", href: "#" },
  { name: "О нас", href: "#" },
];

const benzin = localFont({
  src: [
    {
      path: "../../fonts/Benzin-Semibold.ttf",
    },
  ],
  variable: "--font-benzin",
});
const montserrat = localFont({
  src: [
    {
      path: "../../fonts/Montserrat-Bold.ttf",
    },
  ],
  variable: "--font-montserratBold",
});
const abibas = localFont({
  src: [
    {
      path: "../../fonts/Abibas.ttf",
    },
  ],
  variable: "--font-abibas",
});

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-sidebarBg">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 px-6 py-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <div className="font-abibas text-6xl text-accent">AR</div>
          </a>
        </div>
        <div className="hidden font-benzin lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-benzin text-sm leading-6 text-almostwhite transition-colors hover:text-neutral-500"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-6">
          <div className="flex cursor-pointer items-center space-x-2 rounded-md bg-indigo-600 py-2 px-3 font-montserratBold text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-800">
            <img
              src="../../../discordwhite.png"
              className="w-8"
              alt="discord"
            />
            <p>Log in</p>
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-almostwhite"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel
          className={`fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-sidebarBg px-6 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ${benzin.variable} ${abibas.variable} ${montserrat.variable} font-sans`}
        >
          <div className="flex items-center gap-x-6 font-montserratBold">
            <a href="#" className="-m-1.5 p-1.5">
              <div className="font-abibas text-6xl text-accent">AR</div>
            </a>
            <button
              type="button"
              className="-m-2.5 ml-auto rounded-md p-2.5 text-almostwhite"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-subline">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg py-2 px-3 pl-2 font-montserratBold text-base font-semibold leading-7 text-almostwhite hover:bg-indigo-500"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-4">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg py-2.5 px-3 pl-2 font-montserratBold text-base font-semibold leading-7 text-almostwhite hover:bg-indigo-500"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
