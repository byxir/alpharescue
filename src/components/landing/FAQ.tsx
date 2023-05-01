import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "Сколько сделок в каналах убыточные?",
    answer:
      "Мы ведем подробную стастику по каждому каналу, следовательно включаем в неё как прибыльные, так и убыточные сделки. Стастистику вы найдете по ",
    link: "https://alpharescue.notion.site/Alpha-Rescue-58a5a2bfc2ca4c259f629c0dad8085db",
  },
  {
    question: "Как пользоваться софтом для абуза?",
    answer:
      "К каждому софту мы прикладываем инструкции в которых подробно рассказываем как запустить софт, обычно для запуска требуется заполнить несколько текстовых файлов. Если у вас останутся вопросы, мы поможем вам в чате.",
  },
  {
    question: "Софт для абуза работает только на Windows?",
    answer:
      "Пока наш софт работает только на windows, но уже в скором времени мы сделаем систему, которая позволит вам запускать наш софт прямо с сайта, не скачивая файлы и не тратя мощности своего ПК.",
  },
  {
    question: "Сколько людей в сообществе?",
    answer:
      "Число участников нашего дискорда и телеграмма постоянно растет, поэтому вы можете зайти туда и посмотреть сами.",
  },
  {
    question: "Какой депозит нужен для сигналов?",
    answer:
      "Это зависит от ваших возможностей, чем больше депозит, тем больше сигналов и событий вы сможете охватить и следовательно больше заработать. Мы бы рекомендовали заходить с депозитом от 70$, но будет лучше, если в вашем распоряжении будет около 200$.",
  },
  // More questions...
];

export default function FAQ() {
  return (
    <div className="bg-sidebarBg font-montserratRegular">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-5xl divide-y divide-white/10">
          <h2 className="font-benzin text-2xl font-bold leading-10  text-almostwhite sm:text-4xl">
            Часто задаваемые вопросы
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-white/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-almostwhite">
                        <span className="font-montserratBold text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-subtext">
                        {faq.answer}{" "}
                        {faq.link ? (
                          <a className="text-accent underline" href={faq.link}>
                            этой ссылке.
                          </a>
                        ) : null}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
