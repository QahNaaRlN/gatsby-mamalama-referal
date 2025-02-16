import React from "react";

import { LogoHeaderIcon, PhoneIcon, TelegramIcon } from "@shared/assets/icons";

export const Header: React.FC = () => {
  return (
    <header className="bg-cyan-300 py-6 px-4">
      <div className="mx-auto flex max-w-[81rem] items-center justify-center md:justify-between">
        <div className="flex items-center gap-12">
          <a href="https://mamalama.kz">
            <LogoHeaderIcon className="h-11 w-44" />
          </a>
          <nav className="items-center gap-12 hidden md:flex">
            <a
              href="#"
              className="text-base font-medium leading-snug text-neutral-900"
            >
              Стоимость услуг
            </a>
            <a
              href="#"
              className="text-base font-medium leading-snug text-neutral-900"
            >
              Условия
            </a>
            <a
              href="#"
              className="text-base font-medium leading-snug text-neutral-900"
            >
              Частые вопросы
            </a>
          </nav>
        </div>
        <div className="md:flex items-center gap-4 hidden">
          <a
            href="#"
            className="inline-flex h-8 w-8 items-center justify-center gap-2.5 overflow-hidden rounded-md bg-blue-700"
          >
            <PhoneIcon />
          </a>
          <a
            href="#"
            className="inline-flex h-8 w-8 items-center justify-center gap-2.5 overflow-hidden rounded-md bg-blue-700"
          >
            <TelegramIcon />
          </a>
        </div>
      </div>
    </header>
  );
};
