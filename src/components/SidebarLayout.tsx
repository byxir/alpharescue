/* eslint-disable @next/next/no-img-element */
import { Fragment, type ReactNode, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Settings } from "~/design/icons/Settings";
import { useRouter } from "next/router";

const navigation = [
  {
    name: "Premint",
    icon: "../../../../premint.png",
    pathname: "premint",
  },
  {
    name: "Alphabot",
    icon: "../../../../alphabot.png",
    pathname: "alphabot",
  },
  {
    name: "Superfull",
    icon: "../../../../superfull.png",
    pathname: "superfull",
  },
  {
    name: "FreeNFT",
    icon: "../../../../freenft.png",
    pathname: "freenft",
    noScale: true,
  },
  {
    name: "Мои раффлы",
    icon: "../../../../star.png",
    pathname: "myraffles",
    margin: true,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathnames = [
    "premint",
    "alphabot",
    "superfull",
    "freenft",
    "myraffles",
  ];
  const [current, setCurrent] = useState("");

  const urlCurrent = useRouter();
  console.log("urlCurrent pathname -> ", urlCurrent.pathname);
  console.log("current -> ", current);

  useEffect(() => {
    pathnames.forEach((p) => {
      if (p === urlCurrent.query.platform) {
        setCurrent(p);
      } else if (urlCurrent.pathname === "/rafflebot/myraffles") {
        setCurrent(p);
      }
    });
  }, [urlCurrent.query.platform]);

  return (
    <>
      <div>
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
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="mt-5 space-y-1 px-2">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          className={classNames(
                            current === item.pathname
                              ? "bg-indigo-800 text-white"
                              : "text-white hover:bg-indigo-600 hover:bg-opacity-75",
                            "group flex items-center rounded-md px-2 py-2 text-base font-medium"
                          )}
                        >
                          <img src={item.icon} alt="platform icon" />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 border-t border-indigo-800 p-4">
                    <a href="#" className="group block flex-shrink-0">
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-white">
                            Tom Cook
                          </p>
                          <p className="text-sm font-medium text-indigo-200 group-hover:text-white">
                            View profile
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
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
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex-shrink-0 flex-col items-center justify-center px-4">
                <div className="flex justify-center font-abibas text-9xl text-accent">
                  AR
                </div>
                <div className="flex justify-center text-3xl font-bold text-almostwhite">
                  Raffle Bot
                </div>
              </div>
              <nav className="grid h-full auto-rows-max content-center gap-2 px-6">
                {navigation.map((item) => (
                  <Link
                    href={`/rafflebot/${item.pathname}`}
                    key={item.name}
                    className={classNames(
                      item.margin ? "mt-5 mb-32" : "",
                      current === item.pathname
                        ? "bg-bg text-white"
                        : "text-almostwhite hover:bg-bg hover:bg-opacity-75",
                      "group flex h-max items-center rounded-xl px-3 py-3 text-lg font-bold transition-colors"
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
                ))}
              </nav>
            </div>
            <div className="grid cursor-pointer grid-cols-[repeat(2,_max-content)] justify-center space-x-2 border-t border-subline p-4 transition-colors hover:bg-bg">
              <Settings />
              <div className="font-mon font-bold text-almostwhite">
                Settings
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="grid p-14 font-montserratBold">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
