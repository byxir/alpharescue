import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import SubscriptionRafflebotModal from "./SubscriptionRafflebotModal";
import SubscriptionCommunityModal from "./SubscriptionCommunityModal";

const tiers = [
  {
    available: true,
    name: "Community Pass",
    id: "tier-community",
    href: "#",
    price: [15, 49, 149],
    description:
      "Стартовая точка участника нашего сообщества. Дает доступ к зеркалам, дискорд-комьюнити, и другому.",
    features: [
      "Доступ в Discord",
      "Зеркала западных альфа групп",
      "Различные инструменты и софт",
      "Система оповещений",
    ],
    bg: "bg-community",
    ring: "ring-community",
    type: "community",
  },
  {
    available: true,
    name: "Raffle Bot",
    id: "tier-startup",
    href: "#",
    price: [25, 79, 209],
    description:
      "Доступ к лучшему боту для мультиаккинга в Twitter и NFT-раффлах. Поддержка Premint, Alphabot, Superful, и других.",
    features: [
      "Community Pass",
      "Доступ к Raffle Bot",
      "Эксклюзивные гивы",
      "Техническая поддержка 24/7",
    ],
    new: true,
    bg: "bg-premint",
    ring: "ring-premint",
    type: "raffleBot",
  },
  {
    available: false,
    name: "Speed Mint Bot",
    id: "tier-enterprise",
    href: "#",
    price: null,
    description:
      "Доступ к боту, который поможет вам добиться успеха и забрать NFT на важном минте. Поддержка ETH и SOL минтов.",
    features: [
      "Community Pass",
      "SOL Mint Bot",
      "ETH Mint Bot",
      "Доступ к каналу с рекомендациями",
    ],
    bg: "bg-speedMint",
    ring: "ring-speedMint",
    comingSoon: true,
    type: "speedMint",
  },
];

export default function Subscriptions() {
  const [frequency, setFrequency] = useState(0);
  const [subscriptionModalCommunityOpen, setSubscriptionModalCommunityOpen] =
    useState(false);
  const [subscriptionModalRaffleBotOpen, setSubscriptionModalRaffleBotOpen] =
    useState(false);

  const protectionData = api.user.getMyProtectionData.useQuery();

  const { data, status } = useSession();

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
            className="grid grid-cols-3 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-2 ring-inset ring-subline"
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
              <span>По неделям</span>
            </button>
            <button
              onClick={() => setFrequency(1)}
              value={frequency}
              className={`${
                frequency === 1 ? "bg-almostwhite text-element" : "text-subtext"
              } cursor-pointer rounded-full px-2.5 py-1 font-montserratBold`}
            >
              <span>Ежемесячно</span>
            </button>
            <button
              onClick={() => setFrequency(2)}
              value={frequency}
              className={`${
                frequency === 2 ? "bg-almostwhite text-element" : "text-subtext"
              } cursor-pointer rounded-full px-2.5 py-1 font-montserratBold`}
            >
              <span>По кварталам</span>
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
                {tier.comingSoon ? (
                  <p className="rounded-full bg-almostwhite/10 px-2.5 py-1 text-xs font-semibold leading-5 text-red-500">
                    Скоро
                  </p>
                ) : null}
              </div>
              <p className="mt-4 w-64 text-sm leading-6 text-subtext">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="font-montserratBold text-4xl  text-almostwhite">
                  {tier.name === "Community Pass" && (
                    <>
                      {tier.price ? (
                        <span>${tier.price[frequency]}</span>
                      ) : (
                        <span>TBD</span>
                      )}
                    </>
                  )}
                  {tier.name === "Raffle Bot" && (
                    <>
                      {tier.price ? (
                        <span>от ${tier.price[frequency]}</span>
                      ) : (
                        <span>TBD</span>
                      )}
                    </>
                  )}
                  {tier.name === "Speed Mint Bot" && <span>TBD</span>}
                </span>
                <span className="font-montserratBold text-sm leading-6 text-subtext">
                  {frequency === 0
                    ? "/нед."
                    : frequency === 1
                    ? "/мес."
                    : "/3 мес."}
                </span>
              </p>
              <button
                onClick={() => {
                  if (tier.type === "community") {
                    setSubscriptionModalCommunityOpen(true);
                  }
                  if (tier.type === "raffleBot") {
                    setSubscriptionModalRaffleBotOpen(true);
                  }
                }}
                aria-describedby={tier.id}
                className={`${
                  tier.available ? tier.bg : "bg-element text-red-500"
                } mt-6 block w-full rounded-md px-3 py-2 text-center font-montserratBold text-sm font-semibold leading-6 text-element`}
              >
                {tier.available ? "Купить подписку" : "Coming soon"}
              </button>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-subtext xl:mt-10"
              >
                {/* {tier.name !== "Speed Mint Bot" && ( */}
                {/* <div className=""> */}
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex gap-x-3 ${
                      feature === "Community Pass" ? "text-green-400" : ""
                    }`}
                  >
                    <CheckIcon
                      className={`h-6 w-5 flex-none ${
                        feature === "Community Pass"
                          ? "text-green-400"
                          : " text-almostwhite"
                      }`}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
                {/* </div> */}
                {/* )} */}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <SubscriptionRafflebotModal
        open={subscriptionModalRaffleBotOpen}
        closeFunction={() => setSubscriptionModalRaffleBotOpen(false)}
        discordId={protectionData.data?.discordId}
        type="community"
      />
      <SubscriptionCommunityModal
        open={subscriptionModalCommunityOpen}
        closeFunction={() => setSubscriptionModalCommunityOpen(false)}
        discordId={protectionData.data?.discordId}
        type="raffleBot"
      />
    </div>
  );
}
