import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

const tiers = [
  {
    available: true,
    name: "Community pass",
    id: "tier-community",
    href: "#",
    price: [15, 144],
    description:
      "Стартовая точка участника нашего сообщества. Дает доступ к зеркалам, дискорд-комьюнити, и другому.",
    features: [
      "5 products",
      "Up to 1,000 subscribers",
      "Basic analytics",
      "48-hour support response time",
    ],
    bg: "bg-community",
    ring: "ring-community",
  },
  {
    available: true,
    name: "Raffle Bot",
    id: "tier-startup",
    href: "#",
    price: [30, 288],
    description:
      "Доступ к лучшему боту для мультиаккинга в NFT-раффлах. Поддержка Premint, Alphabot, Superfull, FreeNFT.",
    features: [
      "25 products",
      "Up to 10,000 subscribers",
      "Advanced analytics",
      "24-hour support response time",
      "Marketing automations",
    ],
    new: true,
    bg: "bg-premint",
    ring: "ring-premint",
  },
  {
    available: false,
    name: "Speed Mint Bot",
    id: "tier-enterprise",
    href: "#",
    price: [60, 576],
    description:
      "Доступ к боту, который поможет вам добиться успеха и забрать NFT на важном минте. Поддержка ETH и SOL минтов.",
    features: [
      "Unlimited products",
      "Unlimited subscribers",
      "Advanced analytics",
      "1-hour, dedicated support response time",
      "Marketing automations",
      "Custom reporting tools",
    ],
    bg: "bg-speedMint",
    ring: "ring-speedMint",
  },
];

export default function Subscriptions() {
  const [frequency, setFrequency] = useState(0);
  return (
    <div className="bg-bg py-24 font-montserratRegular sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto text-center">
          <p className="mt-2 font-benzin text-4xl text-almostwhite sm:text-5xl">
            Добро пожаловать в ALPHA RESCUE
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-8 text-subtext">
          С нашей модульной подпиской вам не придется платить за то, в чем нет
          необходимости.
        </p>
        <div className="mt-16 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-2 ring-inset ring-subline"
          >
            <RadioGroup.Label className="sr-only">
              Payment frequency
            </RadioGroup.Label>
            <button
              onClick={() => setFrequency(0)}
              value={frequency}
              className={`${
                frequency === 0 ? "bg-almostwhite text-element" : "text-subtext"
              } cursor-pointer rounded-full px-2.5 py-1 font-montserratBold`}
            >
              <span>Ежемесячно</span>
            </button>
            <button
              onClick={() => setFrequency(1)}
              value={frequency}
              className={`${
                frequency === 1 ? "bg-almostwhite text-element" : "text-subtext"
              } cursor-pointer rounded-full px-2.5 py-1 font-montserratBold`}
            >
              <span>Ежегодно</span>
            </button>
          </RadioGroup>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 ring-1 ${tier.ring} xl:p-10`}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  id={tier.id}
                  className="font-montserratBold text-2xl font-semibold leading-8 text-almostwhite"
                >
                  {tier.name}
                </h3>
                {tier.new ? (
                  <p className="rounded-full bg-almostwhite/10 px-2.5 py-1 text-xs font-semibold leading-5 text-almostwhite">
                    Новое
                  </p>
                ) : null}
              </div>
              <p className="mt-4 w-64 text-sm leading-6 text-subtext">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="font-montserratBold text-4xl  text-almostwhite">
                  от ${tier.price[frequency]}
                </span>
                <span className="font-montserratBold text-sm leading-6 text-subtext">
                  {frequency === 0 ? "/месяц" : "/год"}
                </span>
              </p>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={`${
                  tier.available ? tier.bg : "bg-element text-red-500"
                } mt-6 block rounded-md px-3 py-2 text-center font-montserratBold text-sm font-semibold leading-6 text-element`}
              >
                {tier.available ? "Подписаться" : "Coming soon"}
              </a>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-subtext xl:mt-10"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className="h-6 w-5 flex-none text-almostwhite"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
