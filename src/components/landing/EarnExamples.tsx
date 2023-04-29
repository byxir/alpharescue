/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/line-clamp'),
    ],
  }
  ```
*/
const posts1 = [
  {
    index: 0,
    batch: 0,
    title: "Сигнал на фьючерсы APTUSDT",
    href: "#",
    paragraph1: "Профит с 20 плечом - 240%",
    imageUrl: "../../../earnExample1.png",
  },
  {
    index: 1,
    batch: 0,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl: "../../../earnExample2.png",
  },
  {
    index: 2,
    batch: 0,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl: "../../../earnExample3.png",
  },
];
const posts2 = [
  {
    index: 3,
    batch: 1,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
  },
  {
    index: 4,
    batch: 1,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
  },
  {
    index: 5,
    batch: 1,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
  },
];

export default function Example() {
  const [postContent, setPostContent] = useState(0);

  return (
    <div className="bg-sidebarBg py-24 font-montserratRegular sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-start font-benzin text-2xl font-bold text-almostwhite sm:text-4xl lg:text-center">
            Примеры заработка участников комьюнити
          </h2>
        </div>
        <div className="my-12 flex justify-center">
          <Tabs
            choosePosts1={() => setPostContent(0)}
            choosePosts2={() => setPostContent(1)}
          />
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {postContent === 0 ? (
            <>
              {posts1.map((post) => (
                <article
                  key={post.index}
                  className="flex flex-col items-start justify-between"
                >
                  <div className="relative w-full">
                    <img
                      src={post.imageUrl}
                      alt=""
                      className="w-full rounded-2xl bg-gray-100 object-cover"
                    />
                  </div>
                </article>
              ))}
            </>
          ) : (
            <>
              {posts2.map((post) => (
                <article
                  key={post.index}
                  className="flex flex-col items-start justify-between"
                >
                  <div className="relative w-full">
                    <img
                      src={post.imageUrl}
                      alt=""
                      className="w-full rounded-2xl bg-gray-100 object-cover"
                    />
                  </div>
                </article>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
const temptabs = [
  { name: "Профит сделок", id: 0, current: true },
  { name: "Отзывы от клиентов", id: 1, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Tabs({
  choosePosts1,
  choosePosts2,
}: {
  choosePosts1: () => void;
  choosePosts2: () => void;
}) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="w-full max-w-2xl">
      <div className="grid justify-items-center sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <div className="grid w-2/3  grid-rows-1 gap-2 ">
          {temptabs.map((tab) => (
            <button
              className={`relative cursor-pointer rounded-xl bg-element py-2 transition-all hover:bg-opacity-60 ${
                activeTab === tab.id ? "border border-accent" : ""
              }`}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 0) {
                  choosePosts1();
                } else {
                  choosePosts2();
                }
              }}
              key={tab.name}
            >
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="hidden sm:block">
        <nav
          className="isolate flex divide-x divide-subline rounded-lg shadow"
          aria-label="Tabs"
        >
          {temptabs.map((tab, tabIdx) => (
            <button
              key={tab.name}
              className={classNames(
                tab.id === activeTab
                  ? "text-almostwhite"
                  : "text-subtext hover:text-subtext",
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === temptabs.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-0 flex-1 overflow-hidden bg-element px-4 py-4 text-center text-sm font-medium hover:bg-opacity-60 focus:z-10"
              )}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 0) {
                  choosePosts1();
                } else {
                  choosePosts2();
                }
              }}
              aria-current={tab.current ? "page" : undefined}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  activeTab === tab.id ? "bg-accent" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
