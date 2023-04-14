import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import localFont from "next/font/local";
import { RangeSlider } from "./RangeSlider";
import { accounts } from "~/utils/tempaccounts";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { type Configuration } from "@prisma/client";

const montserrat = localFont({
  src: [
    {
      path: "../fonts/Montserrat-Bold.ttf",
    },
  ],
  variable: "--font-montserratBold",
});
const montserratRegular = localFont({
  src: [
    {
      path: "../fonts/Montserrat-Regular.ttf",
    },
  ],
  variable: "--font-montserratRegular",
});

export default function ConfigurationSlideover({
  open,
  closeFunction,
  configurations,
}: {
  open: boolean;
  closeFunction: () => void;
  configurations: Configuration[] | undefined;
}) {
  const { data, status } = useSession();

  const [chosenConfiguration, setChosenConfiguration] = useState(0);

  const [rangeValue, setRangeValue] = useState<number[]>([0, 1000]);

  const handleChangeRange = (e: Event, newValue: number | number[]) => {
    setRangeValue(newValue as number[]);
  };

  const [activeAccounts, setActiveAccounts] = useState<string[]>([]);

  const handleActive = (account: string) => {
    if (activeAccounts.includes(account)) {
      const newActiveAccounts = activeAccounts.filter((a) => {
        if (a != account) {
          return a;
        }
      });
      setActiveAccounts(newActiveAccounts);
    } else {
      setActiveAccounts((prevAccounts) => [...prevAccounts, account]);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        onClose={closeFunction}
        className={`${montserratRegular.variable} ${montserrat.variable} relative z-10 font-sans`}
      >
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-4xl">
                  <form className="flex flex-col overflow-y-scroll bg-sidebarBg shadow-xl">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="border-b-2 border-subline bg-sidebarBg px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          {configurations ? (
                            <div className="flex items-center space-x-4 font-montserratBold">
                              {configurations[0] ? (
                                <div
                                  onClick={() => setChosenConfiguration(1)}
                                  className={`grid h-20 w-20 cursor-pointer items-center justify-items-center rounded-xl bg-element text-xl shadow-md transition-all hover:bg-opacity-60 ${
                                    chosenConfiguration === 1
                                      ? "border-2 border-almostwhite"
                                      : ""
                                  }`}
                                >
                                  1
                                </div>
                              ) : null}
                              {configurations[1] ? (
                                <div
                                  onClick={() => setChosenConfiguration(2)}
                                  className={`grid h-20 w-20 cursor-pointer items-center justify-items-center rounded-xl bg-element text-xl shadow-md transition-all hover:bg-opacity-60 ${
                                    chosenConfiguration === 2
                                      ? "border-2 border-almostwhite"
                                      : ""
                                  }`}
                                >
                                  2
                                </div>
                              ) : null}
                              {configurations[2] ? (
                                <div
                                  onClick={() => setChosenConfiguration(3)}
                                  className={`grid h-20 w-20 cursor-pointer items-center justify-items-center rounded-xl bg-element text-xl shadow-md transition-all hover:bg-opacity-60 ${
                                    chosenConfiguration === 3
                                      ? "border-2 border-almostwhite"
                                      : ""
                                  }`}
                                >
                                  3
                                </div>
                              ) : null}
                              {configurations[3] ? (
                                <div
                                  onClick={() => setChosenConfiguration(4)}
                                  className={`grid h-20 w-20 cursor-pointer items-center justify-items-center rounded-xl bg-element text-xl shadow-md transition-all hover:bg-opacity-60 ${
                                    chosenConfiguration === 4
                                      ? "border-2 border-almostwhite"
                                      : ""
                                  }`}
                                >
                                  4
                                </div>
                              ) : null}
                              {configurations.length &&
                              configurations.length < 4 ? (
                                <div
                                  className={`txt-center grid h-20 w-20 cursor-pointer items-center justify-items-center rounded-xl bg-element text-xs text-subtext shadow-md transition-all hover:bg-opacity-60`}
                                >
                                  <div className="w-12">
                                    <PlusIcon />
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          ) : null}
                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-500"
                              onClick={closeFunction}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Divider container */}
                      <div className="sm:divide-b h-[calc(100vh-208px)] overflow-auto px-8 pt-8 sm:divide-subline">
                        <div className="mx-10 grid grid-cols-[max-content_auto_max-content] items-center">
                          <div className="mr-5">0</div>
                          <RangeSlider
                            getAriaLabel={() => "Account range"}
                            value={rangeValue}
                            onChange={handleChangeRange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={1000}
                            step={5}
                          />
                          <div className="ml-5">All</div>
                        </div>
                        <div className="mt-12">
                          <div className="grid grid-cols-[auto_40px] gap-2">
                            <div className="mb-6 grid grid-cols-[5%_17%_18%_20%_20%_20%] overflow-x-auto rounded-xl border-2 border-subtext bg-element px-4 py-4 font-montserratBold text-xs text-subtext sm:text-base">
                              <span>#</span>
                              <span>Twitter</span>
                              <span>Discord</span>
                              <span>Metamask</span>
                              <span>Прокси</span>
                              <span>Почты</span>
                            </div>
                            <div className="mb-6 h-10 self-center rounded-lg p-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="h-full w-full text-subtext"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.5 12.75l6 6 9-13.5"
                                />
                              </svg>
                            </div>
                          </div>
                          {data?.user.raffleBotUser &&
                          status === "authenticated" ? (
                            <div className="h-auto font-montserratRegular 2xl:overflow-auto">
                              {accounts.map((a, index) => (
                                <div
                                  className="grid grid-cols-[auto_40px] gap-2"
                                  key={a.Twitter}
                                >
                                  <div className="mb-4 h-14 w-full rounded-xl border border-subline"></div>
                                  <div
                                    onClick={() => handleActive(a.id)}
                                    className="mb-4 h-10 cursor-pointer self-center rounded-lg border border-subline p-2.5"
                                  >
                                    {activeAccounts.includes(a.id) ? (
                                      <div className="h-full w-full rounded-md bg-accent"></div>
                                    ) : null}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="mt-6 h-full w-full items-center justify-items-center font-montserratRegular text-subtext">
                              <p>
                                Вы не можете добавлять аккаунты и запускать абуз
                                без подписки на RaffleBot.
                              </p>
                              <br></br>
                              <div className="flex space-x-1 pb-10">
                                <p>Приобрести подписку можно </p>
                                <span>
                                  <Link href="/tools" className="underline">
                                    здесь.
                                  </Link>
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex-shrink-0 border-t-2 border-subline px-4 py-5 sm:px-6">
                      <div className="flex justify-end space-x-3 font-montserratBold">
                        <button
                          type="button"
                          className="bg rounded-md bg-element px-3 py-2 text-sm font-semibold text-almostwhite shadow-sm focus:outline-none"
                          onClick={closeFunction}
                        >
                          Отмена
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md bg-accent px-3 py-2 text-sm font-semibold text-bg shadow-sm transition-all hover:bg-opacity-60"
                        >
                          Сохранить
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
