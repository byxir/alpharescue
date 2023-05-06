/* eslint-disable @next/next/no-img-element */
import { Fragment, type ReactNode, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ClipboardDocumentCheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Settings } from "~/design/icons/Settings";
import { useRouter } from "next/router";
import localFont from "next/font/local";

const benzin = localFont({
  src: [
    {
      path: "../fonts/Benzin-Semibold.ttf",
    },
  ],
  variable: "--font-benzin",
});
const montserrat = localFont({
  src: [
    {
      path: "../fonts/Montserrat-Bold.ttf",
    },
  ],
  variable: "--font-montserratBold",
});
const abibas = localFont({
  src: [
    {
      path: "../fonts/Abibas.ttf",
    },
  ],
  variable: "--font-abibas",
});

const navigation = [
  {
    name: "Premint",
    icon: "../../../../premint.png",
    pathname: "/rafflebot/platforms/Premint",
  },
  {
    name: "Alphabot",
    icon: "../../../../alphabot.png",
    pathname: "/rafflebot/platforms/Alphabot",
  },
  {
    name: "Superful",
    icon: "../../../../superful.png",
    pathname: "/rafflebot/platforms/Superful",
  },
  {
    name: "FreeNFT",
    icon: "../../../../freenft.png",
    pathname: "/rafflebot/platforms/FreeNFT",
    noScale: true,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathnames = [
    "/rafflebot/platforms/Premint",
    "/rafflebot/platforms/Alphabot",
    "/rafflebot/platforms/Superful",
    "/rafflebot/platforms/FreeNFT",
    "/rafflebot/myraffles",
  ];
  const [current, setCurrent] = useState("");

  const urlCurrent = useRouter();

  useEffect(() => {
    pathnames.forEach((p) => {
      if (p === `/rafflebot/platforms/${String(urlCurrent.query.platform)}`) {
        setCurrent(p);
      } else if (urlCurrent.pathname === "/rafflebot/myraffles") {
        setCurrent(p);
      }
    });
  }, [urlCurrent.query.platform]);

  return (
    <>
      <div
        className={`${benzin.variable} ${abibas.variable} ${montserrat.variable} font-sans`}
      >
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-75" />
            </Transition.Child>

            <div
              className={`fixed inset-0 z-40 flex ${benzin.variable} ${abibas.variable} ${montserrat.variable} font-sans`}
            >
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-sidebarBg">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute right-0 top-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div
                    className={`${benzin.variable} ${abibas.variable} ${montserrat.variable} h-0 flex-1 overflow-y-auto pb-4 pt-5 font-sans`}
                  >
                    <Link
                      onClick={() => setSidebarOpen(false)}
                      href="/"
                      className="h-max items-center justify-center px-4"
                    >
                      <div className="flex justify-center font-abibas text-9xl text-accent">
                        AR
                      </div>
                      <div className="flex justify-center font-montserratBold text-3xl font-bold text-almostwhite">
                        Raffle Bot
                      </div>
                    </Link>
                    <nav className="mt-20 grid h-max auto-rows-max gap-2 px-6 font-montserratBold">
                      {navigation.map((item) =>
                        !item.noScale ? (
                          <Link
                            onClick={() => setSidebarOpen(false)}
                            href={item.pathname}
                            key={item.name}
                            className={classNames(
                              `/rafflebot/platforms/${current}` ===
                                item.pathname
                                ? "bg-bg text-white"
                                : "text-almostwhite hover:bg-bg hover:bg-opacity-75",
                              "group flex h-max items-center rounded-xl px-3 py-3 font-montserratBold text-lg transition-colors"
                            )}
                          >
                            <img
                              src={item.icon}
                              className={`mr-4 w-9 rounded-sm ${
                                item.noScale
                                  ? "h-4 w-9 self-start rounded-sm"
                                  : "h-9"
                              } `}
                              alt="platform icon"
                            />
                            {item.name}
                          </Link>
                        ) : (
                          <button
                            onClick={() => setSidebarOpen(false)}
                            key={item.name}
                            className={classNames(
                              `/rafflebot/platforms/${current}` ===
                                item.pathname
                                ? "bg-bg text-white"
                                : "text-almostwhite hover:bg-bg hover:bg-opacity-75",
                              "group flex h-max items-center rounded-xl px-3 py-3 text-lg font-bold transition-colors"
                            )}
                          >
                            <img
                              src={item.icon}
                              className={`mr-4 w-9 rounded-sm ${
                                item.noScale
                                  ? "h-4 w-9 self-start rounded-sm"
                                  : "h-9"
                              } `}
                              alt="platform icon"
                            />
                            {item.name}
                          </button>
                        )
                      )}
                    </nav>
                  </div>
                  <Link
                    href="/rafflebot/myraffles"
                    className="grid cursor-pointer grid-cols-[repeat(2,_max-content)] justify-center space-x-2 border-t border-subline p-4 transition-colors hover:bg-bg"
                  >
                    <div className="h-6 w-6">
                      <ClipboardDocumentCheckIcon />
                    </div>
                    <div className=" font-montserratBold text-almostwhite">
                      Мои раффлы
                    </div>
                  </Link>
                  <Link
                    href="/rafflebot/settings"
                    onClick={() => setSidebarOpen(false)}
                    className="grid cursor-pointer grid-cols-[repeat(2,_max-content)] justify-center space-x-2 p-4 transition-colors hover:bg-bg"
                  >
                    <Settings />
                    <div className="font-montserratBold text-almostwhite">
                      Настройки
                    </div>
                  </Link>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}
        {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col bg-sidebarBg font-montserratBold">
            <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
              <Link
                href="/"
                className="flex-shrink-0 flex-col items-center justify-center px-4"
              >
                <div className="flex justify-center font-abibas text-9xl text-accent">
                  AR
                </div>
                <div className="flex justify-center text-3xl text-almostwhite">
                  Raffle Bot
                </div>
              </Link>
              <nav className="grid h-full auto-rows-max content-center gap-2 px-6">
                {navigation.map((item) =>
                  !item.noScale ? (
                    <Link
                      href={`${item.pathname}`}
                      key={item.name}
                      className={classNames(
                        current === item.pathname
                          ? "bg-bg text-white"
                          : "text-almostwhite hover:bg-bg hover:bg-opacity-75",
                        "group flex h-max items-center rounded-xl px-3 py-3 font-montserratBold text-lg transition-colors"
                      )}
                    >
                      <img
                        src={item.icon}
                        className={`mr-4 w-9 rounded-sm ${
                          item.noScale ? "h-4 w-9 self-start rounded-sm" : "h-9"
                        } `}
                        alt="platform icon"
                      />
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      key={item.name}
                      className={classNames(
                        current === item.pathname
                          ? "bg-bg text-white"
                          : "text-almostwhite hover:bg-bg hover:bg-opacity-75",
                        "group flex h-max items-center rounded-xl px-3 py-3 font-montserratBold text-lg transition-colors"
                      )}
                    >
                      <img
                        src={item.icon}
                        className={`mr-4 w-9 rounded-sm ${
                          item.noScale ? "h-4 w-9 self-start rounded-sm" : "h-9"
                        } `}
                        alt="platform icon"
                      />
                      {item.name}
                    </button>
                  )
                )}
              </nav>
            </div>
            <Link
              href="/rafflebot/myraffles"
              className="grid cursor-pointer grid-cols-[repeat(2,_max-content)] justify-center space-x-2 border-t border-subline p-4 transition-colors hover:bg-bg"
            >
              <div className="h-6 w-6">
                <ClipboardDocumentCheckIcon />
              </div>
              <div className="font-montserratBold text-almostwhite">
                Мои раффлы
              </div>
            </Link>
            <Link
              href="/rafflebot/settings"
              className="grid cursor-pointer grid-cols-[repeat(2,_max-content)] justify-center space-x-2  p-4 transition-colors hover:bg-bg"
            >
              <Settings />
              <div className="font-montserratBold text-almostwhite">
                Настройки
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="sticky top-0 z-10 bg-sidebarBg px-3 py-1 lg:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon
                className="h-6 w-6 text-almostwhite"
                aria-hidden="true"
              />
            </button>
          </div>
          <main className="">
            <div className="">
              <div className="grid h-full w-full bg-bg font-montserratBold">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
