/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import localFont from "next/font/local";
import {
  type UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { QueryClient } from "@tanstack/react-query";

interface IQRResponse {
  image: string;
  address: string;
  expiresTime: string;
}

const accounts = [
  {
    id: 1,
    name: "50",
  },
  {
    id: 2,
    name: "200",
  },
  {
    id: 3,
    name: "500",
  },
  {
    id: 4,
    name: "1000",
  },
];

const durations = [
  { id: 5, name: "1 неделя" },
  { id: 6, name: "1 месяц" },
  { id: 7, name: "3 месяца" },
];

const paymentNetworks = [
  { id: 8, name: "BEP20" },
  { id: 9, name: "TRC20" },
];

const paymentCurrenciesBEP = [
  { id: 10, name: "USDT" },
  { id: 11, name: "BUSD" },
];

const paymentCurrenciesTRC = [{ id: 1, name: "USDT" }];

const montserrat = localFont({
  src: [
    {
      path: "../../fonts/Montserrat-Bold.ttf",
    },
  ],
  variable: "--font-montserratBold",
});
const montserratRegular = localFont({
  src: [
    {
      path: "../../fonts/Montserrat-Regular.ttf",
    },
  ],
  variable: "--font-montserratRegular",
});
export const benzin = localFont({
  src: [
    {
      path: "../../fonts/Benzin-Semibold.ttf",
    },
  ],
  variable: "--font-benzin",
});

interface FileObject {
  name: string;
  content: string;
  priceDelta: { id: number; price: number }[];
}

export default function SubscriptionModal({
  open,
  closeFunction,
  discordId,
  type,
}: {
  open: boolean;
  closeFunction: () => void;
  discordId: string | undefined;
  type: string;
}) {
  const { data, status } = useSession();
  const [files, setFiles] = useState<FileObject[]>([]);
  const [currentProxyType, setCurrentProxyType] = useState("http");
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [rafflebotReferralCode, setRafflebotReferralCode] = useState<
    string | null
  >(null);
  const [refCodeUsed, setRefCodeUsed] = useState(false);

  const [currentPrice, setCurrentPrice] = useState(25);

  const [accountsSelected, setAccountsSelected] = useState(
    accounts[0] || { id: 1, name: "50" }
  );
  const [durationSelected, setDurationSelected] = useState(
    durations[0] || { id: 5, name: "1 неделя" }
  );
  const [prevDurationSelected, setPrevDurationSelected] = useState(
    accounts[6] || { id: 6, name: "1 месяц" }
  );
  const [prevAccountsSelected, setPrevAccountsSelected] = useState(
    accounts[1] || { id: 2, name: "200" }
  );
  const [paymentNetworkSelected, setPaymentNetworkSelected] = useState(
    paymentNetworks[0] || { id: 8, name: "BEP20" }
  );
  const [paymentCurrencyBEPSelected, setPaymentCurrencyBEPSelected] = useState(
    paymentCurrenciesBEP[0] || { id: 10, name: "USDT" }
  );
  const [paymentCurrencyTRCSelected, setPaymentCurrencyTRCSelected] = useState(
    paymentCurrenciesTRC[0] || { id: 1, name: "USDT" }
  );

  const [qrGenerated, setQrGenerated] = useState(false);

  const queryClient = new QueryClient();

  const { encodeString } = useSha256Encoder();

  const [addressCopied, setAddressCopied] = useState(false);

  const [timerStarted, setTimerStarted] = useState(false);

  const generateQrMutation = useMutation({
    mutationFn: () => {
      const expiresDate = new Date();
      let newSubscriptionExpiresDate = expiresDate;
      if (durationSelected.id === 5) {
        newSubscriptionExpiresDate = new Date(
          expiresDate.getTime() + 7 * 24 * 60 * 60 * 1000
        );
      }
      if (durationSelected.id === 6) {
        newSubscriptionExpiresDate = new Date(
          expiresDate.getTime() + 30 * 24 * 60 * 60 * 1000
        );
      }
      if (durationSelected.id === 7) {
        newSubscriptionExpiresDate = new Date(
          expiresDate.getTime() + 90 * 24 * 60 * 60 * 1000
        );
      }
      return axios.post("https://alpharescue.online:3500/CreateReplenishment", {
        discordId: discordId,
        amount: Number(currentPrice),
        coin:
          paymentNetworkSelected.name === "BEP20"
            ? paymentCurrencyBEPSelected.name
            : paymentCurrencyTRCSelected.name,
        network: paymentNetworkSelected.name,
        function: "Buy",
        expiresDate: newSubscriptionExpiresDate,
        hash: encodeString(
          `${env.NEXT_PUBLIC_ALPHA_RESCUE_SECRET_CODE}:${String(
            discordId
          )}:${newSubscriptionExpiresDate.toISOString()}:${Number(
            accountsSelected.name
          )}`
        ),
        accountsQuantity: Number(accountsSelected.name),
        subscriptionType: "Rafflebot",
        referralCode: rafflebotReferralCode,
      });
    },
    onSuccess: () => {
      setQrGenerated(true);
    },
  });

  const cancelQrMutation = useMutation({
    mutationFn: async () => {
      await axios.post("https://alpharescue.online:3500/StopReplenishment", {
        discordId: discordId,
      });
    },
    onSuccess: () => {
      setQrGenerated(false);
      setQrUrl(null);
      setAddress(null);
      void queryClient.invalidateQueries(["generatedQr"]);
    },
  });

  const qrData: UseQueryResult<IQRResponse> = useQuery(
    ["generatedQr", "rafflebot"],
    async () => {
      const res = await axios.get(
        `https://alpharescue.online:3500/CheckReplenishment?discordId=${String(
          discordId
        )}`
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res.data;
    },
    {
      enabled: false,
      onSuccess: (data) => {
        setQrGenerated(true);
        setQrUrl(data.image);
        setAddress(data.address);
      },
      onError: () => {
        setQrGenerated(false);
        setQrUrl(null);
        setAddress(null);
        void queryClient.removeQueries(["generatedQr", "rafflebot"]);
      },
    }
  );

  const userRole: UseQueryResult<{ status: boolean }> = useQuery(
    ["userRole"],
    async () => {
      const res = await axios.post(
        "https://alpharescue.online:3500/checkrole",
        {
          discordId: discordId,
          role: ["ASSISTANT", "OG"],
        }
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res.data;
    }
  );

  const useRefCode = () => {
    for (let i = 0; i < refcodes.length; i++) {
      const newRef = refcodes[i];
      if (newRef != undefined) {
        if (
          newRef.code === rafflebotReferralCode &&
          typeof newRef.discount === "number" &&
          !refCodeUsed
        ) {
          setCurrentPrice((prev) => prev - prev * newRef.discount);
          setRefCodeUsed(true);
        }
      }
    }
  };

  useEffect(() => {
    if (open && discordId && qrGenerated) {
      void queryClient.removeQueries(["generatedQr", "rafflebot"]);
      void qrData.refetch();
    }
  }, [open, qrGenerated]);

  useEffect(() => {
    if (discordId) {
      void qrData.refetch();
    }
  }, [discordId]);

  const [paymentTimer, setPaymentTimer] = useState(599);

  useEffect(() => {
    let coefficient = 0.0;
    for (let i = 0; i < refcodes.length; i++) {
      const newRef = refcodes[i];
      if (newRef != undefined) {
        if (
          newRef.code === rafflebotReferralCode &&
          typeof newRef.discount === "number"
        ) {
          coefficient = newRef.discount;
        }
      }
    }
    if (accountsSelected.id === 1 && durationSelected.id === 5) {
      setCurrentPrice(25);
      if (userRole.data?.status === true) {
        setCurrentPrice(16.25);
      }
    }
    if (accountsSelected.id === 1 && durationSelected.id === 6) {
      setCurrentPrice(79);
      if (userRole.data?.status === true) {
        setCurrentPrice(51.35);
      }
    }
    if (accountsSelected.id === 1 && durationSelected.id === 7) {
      setCurrentPrice(209);
      if (userRole.data?.status === true) {
        setCurrentPrice(135.85);
      }
    }
    if (accountsSelected.id === 2 && durationSelected.id === 6) {
      setCurrentPrice(119);
      if (userRole.data?.status === true) {
        setCurrentPrice(77.35);
      }
    }
    if (accountsSelected.id === 2 && durationSelected.id === 7) {
      setCurrentPrice(319);
      if (userRole.data?.status === true) {
        setCurrentPrice(207.35);
      }
    }
    if (accountsSelected.id === 3 && durationSelected.id === 6) {
      setCurrentPrice(159);
      if (userRole.data?.status === true) {
        setCurrentPrice(103.35);
      }
    }
    if (accountsSelected.id === 3 && durationSelected.id === 7) {
      setCurrentPrice(429);
      if (userRole.data?.status === true) {
        setCurrentPrice(278.85);
      }
    }
    if (accountsSelected.id === 4 && durationSelected.id === 6) {
      setCurrentPrice(199);
      if (userRole.data?.status === true) {
        setCurrentPrice(129.35);
      }
    }
    if (accountsSelected.id === 4 && durationSelected.id === 7) {
      setCurrentPrice(539);
      if (userRole.data?.status === true) {
        setCurrentPrice(350.35);
      }
    }
    if (
      refCodeUsed &&
      !userRole.data?.status &&
      prevAccountsSelected != accountsSelected &&
      prevDurationSelected != durationSelected
    ) {
      setCurrentPrice((prev) => prev - prev * coefficient);
    }
  }, [accountsSelected, durationSelected]);

  useEffect(() => {
    if (open && qrGenerated) {
      const intervalRafflebot = setInterval(() => {
        if (qrData.data && qrData.data.expiresTime) {
          const paymentTimerDestination = new Date(qrData.data?.expiresTime);
          const timeDifference =
            paymentTimerDestination.getTime() - new Date().getTime();
          setPaymentTimer(Math.floor(timeDifference / 1000));

          if (timeDifference <= 0) {
            cancelQrMutation.mutate();
            setQrGenerated(false);
            setQrUrl(null);
            setAddress(null);
            void queryClient.removeQueries(["generatedQr", "rafflebot"]);
            clearInterval(intervalRafflebot);
            closeFunction();
          }
        }
      }, 1000);

      return () => {
        clearInterval(intervalRafflebot);
      };
    }
    return () => queryClient.removeQueries(["generatedQr", "rafflebot"]);
  }, [qrGenerated, qrData.data, open]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-10 ${montserratRegular.variable} ${montserrat.variable} ${benzin.variable}}`}
        onClose={closeFunction}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-90 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative z-10 grid w-full max-w-2xl justify-items-center overflow-hidden rounded-xl bg-sidebarBg px-4 pb-4 pt-5 text-left font-montserratBold shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl sm:p-6 sm:pb-12 ${montserratRegular.variable} ${montserrat.variable} ${benzin.variable}`}
              >
                <h1 className="mt-4 font-benzin text-3xl">
                  Подписаться на Raffle Bot
                </h1>
                <div className="grid pt-12 md:grid-cols-2">
                  <div className="grid h-max md:border-r-2 md:border-subline md:pr-12">
                    <h2 className="mt-8 justify-self-start font-montserratBold text-2xl">
                      Настроить тариф
                    </h2>
                    <div className="mt-4 grid h-full w-full grid-cols-[3fr_2fr] grid-rows-1 items-center gap-4">
                      <div className="flex items-center">
                        <RootDropdown
                          dataArray={
                            durationSelected.id === 5
                              ? accounts.slice(0, 1)
                              : accounts
                          }
                          selected={
                            durationSelected.id === 5
                              ? accounts[0] || { id: 5, name: "1 неделя" }
                              : accountsSelected
                          }
                          setSelected={(entry) => {
                            setPrevAccountsSelected(accountsSelected);
                            setAccountsSelected(entry);
                          }}
                        />
                      </div>
                      <div className="text-xl">Кол-во аккаунтов</div>
                    </div>
                    <div className="mt-4 grid h-full w-full grid-cols-[3fr_2fr] grid-rows-1 items-center gap-4">
                      <div className="flex items-center">
                        <RootDropdown
                          dataArray={durations}
                          selected={durationSelected}
                          setSelected={(entry) => {
                            setPrevDurationSelected(durationSelected);
                            setDurationSelected(entry);
                            if (entry.id === 5)
                              setAccountsSelected(
                                accounts[0] || { id: 5, name: "1 неделя" }
                              );
                          }}
                        />
                      </div>
                      <div className="text-xl">Срок подписки</div>
                    </div>
                    <h2 className="mt-12 justify-self-start font-montserratBold text-2xl">
                      Метод оплаты
                    </h2>
                    <div className="mt-4 grid h-full w-full grid-cols-[3fr_2fr] grid-rows-1 items-center gap-4">
                      <div className="flex items-center">
                        <RootDropdown
                          dataArray={paymentNetworks}
                          selected={paymentNetworkSelected}
                          setSelected={(entry) =>
                            setPaymentNetworkSelected(entry)
                          }
                        />
                      </div>
                      <div className="text-xl">Сеть</div>
                    </div>
                    <div className="mt-4 grid h-full w-full grid-cols-[3fr_2fr] grid-rows-1 items-center gap-4">
                      <div className="flex items-center">
                        <RootDropdown
                          dataArray={
                            paymentNetworkSelected.id === 8
                              ? paymentCurrenciesBEP
                              : paymentCurrenciesTRC
                          }
                          selected={
                            paymentNetworkSelected.id === 8
                              ? paymentCurrencyBEPSelected
                              : paymentCurrencyTRCSelected
                          }
                          setSelected={(entry) =>
                            paymentNetworkSelected.id === 8
                              ? setPaymentCurrencyBEPSelected(entry)
                              : setPaymentCurrencyTRCSelected(entry)
                          }
                        />
                         
                      </div>
                      <div className="text-xl">Валюта</div>
                    </div>
                    <div className="mt-10 flex items-center space-x-4">
                      <input
                        type="text"
                        className="rounded-lg bg-subline py-1 pl-3 font-montserratBold text-base text-almostwhite outline-none"
                        value={
                          rafflebotReferralCode ? rafflebotReferralCode : ""
                        }
                        onChange={(e) =>
                          setRafflebotReferralCode(e.target.value)
                        }
                      />
                      <button
                        onClick={useRefCode}
                        className="rounded-lg bg-accent px-2 py-1 text-bg transition-all hover:bg-opacity-60"
                      >
                        Использовать реф. Код
                      </button>
                    </div>
                    <h2 className="mt-8 flex space-x-6 justify-self-start font-montserratBold text-2xl">
                      <div className="">Итого:</div>
                      <div className="">
                        <span className="">{currentPrice}</span>{" "}
                        {paymentNetworkSelected.name === "BEP20" ? (
                          <span>{paymentCurrencyBEPSelected.name}</span>
                        ) : (
                          <span>{paymentCurrencyTRCSelected.name}</span>
                        )}
                      </div>
                    </h2>
                    <div className="mt-5 grid h-full w-full items-center gap-4">
                      <button
                        onClick={() => {
                          setQrGenerated(false);
                          void queryClient.removeQueries([
                            "generatedQr",
                            "rafflebot",
                          ]);
                          generateQrMutation.mutate();
                        }}
                        disabled={qrGenerated}
                        className={`justify-self-center rounded-xl bg-accent px-6 py-4 text-2xl text-bg shadow-md transition-all ${
                          qrGenerated
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer opacity-100 hover:bg-opacity-60"
                        }`}
                      >
                        Сгенерировать QR
                      </button>
                    </div>
                  </div>
                  <div className="mt-8 text-center text-sm text-subtext">
                    <h3>Сканируйте QR-код</h3>
                    <div className="grid w-full justify-items-center">
                      <div
                        className={`mt-8 grid h-80 w-80 items-center justify-items-center justify-self-center rounded-xl bg-subline`}
                      >
                        {qrUrl && (
                          <img
                            src={qrUrl || ""}
                            alt=""
                            className="rounded-xl"
                          />
                        )}
                        {!qrUrl && (
                          <div className="text-2xl text-subtext">QR код</div>
                        )}
                      </div>
                    </div>
                    <div className="mt-6 w-full text-center text-base text-subtext">
                      или
                    </div>
                    <div className="">
                      <div className="mt-6 text-center text-sm text-subtext">
                        Переведите на этот кошелек:
                      </div>
                      <div className="mt-4 flex w-full justify-center space-x-4">
                        <input
                          type="text"
                          className="w-4/5 justify-self-center rounded-xl bg-subline px-10 py-2 text-center text-xs text-almostwhite outline-none md:ml-10"
                          value={address || "здесь будет адрес"}
                          readOnly
                        />
                        <button
                          className={`h-8 w-8 items-center ${
                            addressCopied ? "text-green-500" : "text-subtext"
                          }`}
                          onClick={async () => {
                            if (address) {
                              await navigator.clipboard.writeText(address);
                            }
                            setAddressCopied(true);
                            setTimeout(() => {
                              setAddressCopied(false);
                            }, 10000);
                          }}
                        >
                          {!addressCopied && <ClipboardIcon />}
                          {addressCopied && <ClipboardDocumentCheckIcon />}
                        </button>
                      </div>
                    </div>
                    {qrGenerated && (
                      <div className="mt-6">
                        Осталось{" "}
                        {paymentTimer > 60
                          ? `${Math.floor(paymentTimer / 60)} мин ${Math.ceil(
                              paymentTimer % 60
                            )} сек`
                          : `${paymentTimer} сек.`}
                      </div>
                    )}
                    <div className="flex items-center justify-center space-x-4">
                      {qrGenerated && (
                        <button
                          disabled={!qrGenerated}
                          onClick={() => {
                            cancelQrMutation.mutate();
                            closeFunction();
                          }}
                          className={`mt-9 cursor-pointer justify-self-center rounded-xl border-2 border-red-500 bg-sidebarBg px-4 py-3 text-xl text-red-500 shadow-md transition-all hover:bg-opacity-60 ${
                            !qrGenerated
                              ? "cursor-not-allowed opacity-50"
                              : "cursor-pointer opacity-100"
                          }`}
                        >
                          Отмена
                        </button>
                      )}
                      <button
                        disabled={!qrGenerated}
                        onClick={() => {
                          closeFunction();
                          void queryClient.removeQueries([
                            "generatedQr",
                            "rafflebot",
                          ]);
                          setQrGenerated(false);
                          setAddress(null);
                          setQrUrl(null);
                        }}
                        className={`cursor-pointer justify-self-center rounded-xl bg-accent px-6 py-4 text-2xl text-bg shadow-md transition-all ${
                          !qrGenerated
                            ? "mt-22 cursor-not-allowed opacity-50"
                            : "mt-9 cursor-pointer opacity-100 hover:bg-opacity-60"
                        }`}
                      >
                        Оплатил
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  onClick={closeFunction}
                  className="absolute right-2 top-2 h-12 w-12 cursor-pointer text-subtext"
                >
                  <XMarkIcon />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { env } from "~/env.mjs";
import useSha256Encoder from "~/utils/sha256Encoder";
import {
  ClipboardIcon,
  ClipboardDocumentCheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { refcodes } from "~/utils/refcodes";
import { duration } from "@mui/material";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function RootDropdown({
  dataArray,
  selected,
  setSelected,
}: {
  dataArray: {
    id: number;
    name: string;
    priceDelta?: { id: number; price: number }[];
  }[];
  selected: {
    id: number;
    name: string;
  };
  setSelected: (entry: { id: number; name: string }) => void;
}) {
  return (
    <Listbox value={selected}>
      {({ open }) => (
        <>
          <div className="relative h-16 w-full">
            <Listbox.Button className="relative h-full w-full cursor-pointer rounded-md bg-subline py-1.5 pl-3 pr-10 text-left text-xl text-almostwhite shadow-sm sm:text-sm sm:leading-6">
              <span className="block truncate font-montserratBold text-xl">
                {selected?.name}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-almostwhite"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 cursor-pointer overflow-auto rounded-md bg-subline py-1 text-base shadow-lg focus:outline-none sm:text-sm">
                {dataArray.map((entry) => (
                  <Listbox.Option
                    key={entry.id}
                    onClick={() => {
                      setSelected({
                        id: entry.id,
                        name: entry.name,
                      });
                    }}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "bg-neutral-600 text-almostwhite"
                          : "text-almostwhite",
                        "relative cursor-pointer select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={entry}
                  >
                    <>
                      <span
                        className={classNames(
                          selected ? "font-semibold" : "font-normal",
                          "font-motnserratBold block truncate text-lg"
                        )}
                      >
                        {entry.name}
                      </span>

                      {selected.id === entry.id ? (
                        <span
                          className={
                            "absolute inset-y-0 right-0 flex items-center pr-4"
                          }
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
