/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Fragment, useEffect, useRef, useState } from "react";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useDebouncedCallback } from "use-debounce";

import { Container } from "./Container";
import { Robot } from "~/design/icons/Robot";
import { Handshake } from "~/design/icons/Handshake";
import { Moneybag } from "~/design/icons/Moneybag";
import LaunchButton from "../LaunchButton/LaunchButton";

const features = [
  {
    name: "Инструменты для мультиаккинга",
    description:
      "Регулярный и актуальный софт для абуза различных событий, включая тестнеты, формы, и другие активности.",
    icon: Robot,
    screen: "tools",
  },
  {
    name: "Зеркала западных альфа групп",
    description:
      "Get a push notification every time we find out something that’s going to lower the share price on your holdings so you can sell before the information hits the public markets.",
    icon: Moneybag,
    screen: "mirrors",
  },
  {
    name: "Договорные услуги",
    description:
      "We hide your stock purchases behind thousands of anonymous trading accounts, so suspicious activity can never be traced back to you.",
    icon: Handshake,
    screen: "services",
  },
];

function usePrevious(value: number) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function FeaturesDesktop() {
  const [changeCount, setChangeCount] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const prevIndex = usePrevious(selectedIndex);
  const isForwards = prevIndex === undefined ? true : selectedIndex > prevIndex;

  const onChange = useDebouncedCallback(
    (selectedIndex) => {
      setSelectedIndex(Number(selectedIndex));
      setChangeCount((changeCount) => changeCount + 1);
    },
    100,
    { leading: true }
  );

  return (
    <Tab.Group
      as="div"
      className="grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24"
      selectedIndex={selectedIndex}
      onChange={onChange}
      vertical
    >
      <Tab.List className="relative z-10 order-last col-span-6 space-y-6">
        {features.map((feature, featureIndex) => (
          <div
            key={feature.name}
            className="relative rounded-2xl transition-colors hover:bg-element/30"
          >
            {featureIndex === selectedIndex && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 bg-element"
                initial={{ borderRadius: 16 }}
              />
            )}
            <div className="relative z-10 p-8">
              <feature.icon className="h-8 w-8" />
              <h3 className="mt-6 text-lg font-semibold text-white">
                <Tab className="text-left font-montserratBold [&:not(:focus-visible)]:focus:outline-none">
                  <span className="absolute inset-0 rounded-2xl" />
                  {feature.name}
                </Tab>
              </h3>
              <p className="mt-2 text-sm text-subtext">{feature.description}</p>
            </div>
          </div>
        ))}
      </Tab.List>
      <div className="col-span-6">
        <div
          className={`grid justify-items-center transition-all ${
            selectedIndex != 0 ? "hidden" : ""
          }`}
        >
          <div className="max-w-lg">
            <img src="../../../tempterminal.png" alt="" className="" />
          </div>
          <div className="mt-12">
            <LaunchButton>
              <p className="text-2xl">Запустить</p>
              <p className="text-2xl">скрипт</p>
            </LaunchButton>
          </div>
        </div>
      </div>
    </Tab.Group>
  );
}

function FeaturesMobile() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideContainerRef = useRef();
  const slideRefs = useRef([]);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveIndex(slideRefs.current.indexOf(entry.target));
            break;
          }
        }
      },
      {
        root: slideContainerRef.current,
        threshold: 0.6,
      }
    );

    for (const slide of slideRefs.current) {
      if (slide) {
        observer.observe(slide);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [slideContainerRef, slideRefs]);

  return (
    <>
      <div
        ref={slideContainerRef}
        className="-mb-4 flex snap-x snap-mandatory -space-x-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 [scrollbar-width:none] sm:-space-x-6 [&::-webkit-scrollbar]:hidden"
      >
        {features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            ref={(ref) => (slideRefs.current[featureIndex] = ref)}
            className="w-full flex-none snap-center px-4 sm:px-6"
          >
            <div className="relative transform overflow-hidden rounded-2xl bg-gray-800 px-5 py-6">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute inset-x-0 bottom-0 bg-gray-800/95 p-6 backdrop-blur sm:p-10">
                <feature.icon className="h-8 w-8" />
                <h3 className="mt-6 font-montserratBold text-sm font-semibold text-almostwhite sm:text-lg">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-subtext">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-3">
        {features.map((_, featureIndex) => (
          <button
            type="button"
            key={featureIndex}
            className={clsx(
              "relative h-0.5 w-4 rounded-full",
              featureIndex === activeIndex ? "bg-gray-300" : "bg-gray-500"
            )}
            aria-label={`Go to slide ${featureIndex + 1}`}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              slideRefs.current[featureIndex].scrollIntoView({
                block: "nearest",
                inline: "nearest",
              });
            }}
          >
            <span className="absolute -inset-x-1.5 -inset-y-3" />
          </button>
        ))}
      </div>
    </>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      aria-label="Features for investing all your money"
      className="bg-bg py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto font-benzin lg:mx-0">
          <h2 className="text-3xl font-medium  text-white">
            Участники нашего сообщества получают
          </h2>
        </div>
      </Container>
      <div className="mt-16 md:hidden">
        <FeaturesMobile />
      </div>
      <Container className="hidden md:mt-20 md:block">
        <FeaturesDesktop />
      </Container>
    </section>
  );
}
