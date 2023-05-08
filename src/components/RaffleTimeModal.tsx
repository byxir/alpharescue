import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Slider } from "@mui/material";
import {
  type IToggleEventStreamContext,
  benzin,
  montserrat,
  montserratRegular,
} from "~/pages/_app";
import TrueLaunchButton from "./LaunchButton/TrueLaunchButton";
import { api } from "~/utils/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ToggleEventStreamContext } from "~/pages/_app";

function valueLabelFormat(value: number) {
  const units = ["min.", "h."];

  let unitIndex = 0;
  let scaledValue = value;

  while (scaledValue >= 60 && unitIndex < units.length - 1) {
    unitIndex += 1;
    scaledValue = Number((scaledValue / 60).toFixed(1));
  }

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `${scaledValue} ${units[unitIndex]}`;
}

export default function RaffleTimeModal({
  open,
  closeFunction,
  _raffleId,
  _exceptions,
  _firstAcc,
  _lastAcc,
  remainingRaffles,
  showNotification,
  restart,
}: {
  open: boolean;
  closeFunction: () => void;
  _raffleId: string;
  _exceptions?: string[] | null | undefined;
  _firstAcc?: number | undefined;
  _lastAcc?: number | undefined;
  remainingRaffles: number;
  showNotification: () => void;
  restart?: boolean;
}) {
  const [value, setValue] = useState(120);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };
  const { data, status } = useSession();

  const { toggleEventStream } = useContext<IToggleEventStreamContext>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    ToggleEventStreamContext
  );

  const allMyData = api.user.getAllMyData.useQuery();

  const startRaffleMutation = useMutation(
    ["startRaffle"],
    () => {
      if (remainingRaffles <= 0) {
        showNotification();
        closeFunction();
        return Promise.reject(new Error("No raffles left"));
      }

      return axios.post(
        `https://alpharescue.online/startraffle`,
        {
          discordId: allMyData.data?.discordId,
          userId: data?.user.id,
          exceptions: _exceptions,
          firstAcc: _firstAcc,
          lastAcc: _lastAcc,
          time: value * 60,
          raffleId: _raffleId,
        },
        {
          headers: {
            Authorization: `Bearer ${String(allMyData.data?.sessionToken)}`,
          },
        }
      );
    },
    {
      onSuccess: () => {
        toggleEventStream();
      },
    }
  );

  const restartRaffleMutation = useMutation(
    ["restartRaffle"],
    async () => {
      if (remainingRaffles <= 0) {
        showNotification();
        closeFunction();
        return Promise.reject(new Error("No raffles left"));
      }

      return axios.post(
        "https://alpharescue.online/startRaffleAgain",
        {
          discordId: allMyData.data?.discordId,
          userId: data?.user.id,
          raffleId: _raffleId,
        },
        {
          headers: {
            Authorization: `Bearer ${String(allMyData.data?.sessionToken)}`,
          },
        }
      );
    },
    {
      onSuccess: () => {
        toggleEventStream();
      },
    }
  );

  const startRaffle = () => {
    if (
      restart &&
      data?.user.raffleBotUser &&
      status === "authenticated" &&
      allMyData.data
    ) {
      restartRaffleMutation.mutate();
    } else {
      if (
        data?.user.raffleBotUser &&
        status === "authenticated" &&
        allMyData.data &&
        _firstAcc != undefined &&
        _lastAcc != undefined
      ) {
        startRaffleMutation.mutate();
        closeFunction();
      }
    }
  };

  const calculateValue = (value: number) => {
    return value;
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeFunction}>
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
                className={`${benzin.variable} ${montserratRegular.variable} ${montserrat.variable} relative transform overflow-hidden rounded-lg bg-sidebarBg px-4 pb-4 pt-5 text-left font-sans shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6`}
              >
                <div className="text-center font-benzin text-2xl">
                  Выберите время захода
                </div>
                <div className="mt-8 flex items-center space-x-4 font-montserratBold text-base text-almostwhite sm:text-xl">
                  <span className="w-auto text-center">20min.</span>
                  <Slider
                    color="primary"
                    sx={{
                      color: "#FFFFFF",
                    }}
                    value={value}
                    onChange={handleChange}
                    min={20}
                    max={720}
                    scale={calculateValue}
                    valueLabelDisplay="auto"
                    getAriaValueText={valueLabelFormat}
                    valueLabelFormat={valueLabelFormat}
                    aria-labelledby="non-linear-slider"
                  />
                  <span className="w-auto text-center">12h.</span>
                </div>
                <div className="jusify-center mt-10 grid h-[304px] grid-cols-2 grid-rows-3 items-center justify-items-center gap-8 font-montserratBold text-subtext sm:h-[192px] sm:grid-cols-3 sm:grid-rows-2">
                  <div
                    onClick={() => setValue(20)}
                    className={`grid w-36 cursor-pointer items-center justify-items-center rounded-xl bg-element p-6 text-xl  shadow-md transition-all hover:bg-opacity-60 ${
                      value === 20 ? "border-2 border-almostwhite" : ""
                    }`}
                  >
                    20 мин.
                  </div>
                  <div
                    onClick={() => setValue(60)}
                    className={`grid w-36 cursor-pointer items-center justify-items-center rounded-xl bg-element p-6 text-xl shadow-md transition-all hover:bg-opacity-60 ${
                      value >= 60 && value < 64
                        ? "border-2 border-almostwhite"
                        : ""
                    }`}
                  >
                    1 час
                  </div>
                  <div
                    onClick={() => setValue(120)}
                    className={`grid w-36 cursor-pointer items-center justify-items-center rounded-xl bg-element p-6 text-xl shadow-md transition-all hover:bg-opacity-60 ${
                      value >= 120 && value < 124
                        ? " border-2 border-almostwhite"
                        : ""
                    }`}
                  >
                    2 часа
                  </div>
                  <div
                    onClick={() => setValue(180)}
                    autoFocus
                    className={`grid w-36 cursor-pointer items-center justify-items-center rounded-xl bg-element p-6 text-xl shadow-md transition-all hover:bg-opacity-60 ${
                      value >= 180 && value < 184
                        ? " border-2 border-almostwhite"
                        : ""
                    }`}
                  >
                    3 часа
                  </div>
                  <div
                    onClick={() => setValue(360)}
                    className={`grid w-36 cursor-pointer items-center justify-items-center rounded-xl bg-element p-6 text-xl shadow-md transition-all hover:bg-opacity-60 ${
                      value >= 360 && value < 364
                        ? "border-2 border-almostwhite"
                        : ""
                    }`}
                  >
                    6 часов
                  </div>
                  <div
                    onClick={() => setValue(720)}
                    className={`grid w-36 cursor-pointer items-center justify-items-center rounded-xl bg-element p-6 text-xl shadow-md transition-all hover:bg-opacity-60 ${
                      value >= 720 && value < 724
                        ? " border-2 border-almostwhite"
                        : ""
                    }`}
                  >
                    12 часов
                  </div>
                </div>
                <div className="mt-16 grid justify-items-center">
                  <TrueLaunchButton executeScript={startRaffle}>
                    <p className="text-2xl">Запустить</p>
                    <p className="text-2xl">скрипт</p>
                  </TrueLaunchButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
