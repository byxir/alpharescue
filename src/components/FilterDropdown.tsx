import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Filter } from "~/design/icons/Filter";
import {
  CircleStackIcon,
  StarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function FilterDropdown({
  sortingMethod,
  setSortingMethod,
}: {
  sortingMethod: string;
  setSortingMethod: (newSortingMethod: string) => void;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex h-12 w-full items-center justify-center gap-x-1.5 rounded-xl bg-element px-5 py-3 font-montserratBold text-base text-xs font-semibold text-subtext shadow-md hover:bg-opacity-60 md:text-base">
          <Filter />
          Сортировать
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-element shadow-lg focus:outline-none">
          <div className="">
            <Menu.Item>
              <div
                onClick={() => {
                  setSortingMethod("hold");
                }}
                className={`${
                  sortingMethod === "hold"
                    ? "rounded-t-xl bg-subline text-subtext"
                    : "text-subtext"
                }
                    group flex cursor-pointer items-center px-4 py-2 text-sm`}
              >
                <CircleStackIcon
                  className="mr-3 h-5 w-5 text-subtext group-hover:text-subtext"
                  aria-hidden="true"
                />
                Без холда
              </div>
            </Menu.Item>
            <Menu.Item>
              <div
                onClick={() => {
                  setSortingMethod("subscribers");
                }}
                className={`${
                  sortingMethod === "subscribers"
                    ? "bg-subline text-subtext"
                    : "text-subtext"
                }
                    group flex cursor-pointer items-center px-4 py-2 text-sm`}
              >
                <UserCircleIcon
                  className="mr-3 h-5 w-5 text-subtext group-hover:text-subtext"
                  aria-hidden="true"
                />
                По подписчикам
              </div>
            </Menu.Item>
          </div>
          <Menu.Item>
            <div
              onClick={() => {
                setSortingMethod("favorites");
              }}
              className={`${
                sortingMethod === "favorites"
                  ? "rounded-b-xl bg-subline text-subtext"
                  : "text-subtext"
              }
                    group flex cursor-pointer items-center px-4 pb-3 pt-2 text-sm`}
            >
              <StarIcon
                className="mr-3 h-5 w-5 text-subtext group-hover:text-subtext"
                aria-hidden="true"
              />
              Избранное
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
