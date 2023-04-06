import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ArchiveBoxIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import { Filter } from "~/design/icons/Filter";
import { TwitterIcon } from "~/design/icons/TwitterIcon";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function FilterDropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex h-12 w-full items-center justify-center gap-x-1.5 rounded-xl bg-element px-5 py-3 font-montserratBold text-base font-semibold text-subtext shadow-md hover:bg-opacity-60">
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-subtext rounded-xl bg-subline shadow-lg focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-bg text-subtext" : "text-subtext",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <div className="text-subtext">
                    <TwitterIcon />
                  </div>
                  По подписчикам
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-bg text-subtext" : "text-subtext",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <DocumentDuplicateIcon
                    className="mr-3 h-5 w-5 text-subtext group-hover:text-subtext"
                    aria-hidden="true"
                  />
                  Duplicate
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-subtext" : "text-subtext",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <DocumentDuplicateIcon
                    className="mr-3 h-5 w-5 text-subtext group-hover:text-subtext"
                    aria-hidden="true"
                  />
                  Duplicate
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-subtext" : "text-subtext",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <ArchiveBoxIcon
                    className="mr-3 h-5 w-5 text-subtext group-hover:text-subtext"
                    aria-hidden="true"
                  />
                  Archive
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
