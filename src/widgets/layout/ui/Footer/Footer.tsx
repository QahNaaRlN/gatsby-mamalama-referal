import React from "react";

import {
  LogoFooterIcon,
  PhoneIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "@shared/assets/icons";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-800">
      <div className="mx-auto flex flex-col md:flex-row max-w-[81rem] items-start md:items-end md:gap-x-10 lg:gap-x-32 py-8 px-6">
        <div className="flex flex-col order-1 md:order-1 mb-10 md:mb-0">
          <LogoFooterIcon className="mb-6 md:mb-3 h-11 w-44" />
          <a
            href="tel:+78123183441"
            className="mb-1.5 md:mb-1 text-base font-medium leading-normal text-white"
          >
            +7 (812) 318-34-41
          </a>
          <a
            href="mailto:info@prachka.com"
            className="text-base font-medium leading-normal text-white"
          >
            info@prachka.com
          </a>
        </div>
        <div className="flex flex-col gap-y-4 order-3 md:order-2">
          <div className="flex gap-x-4">
            <a
              href="#"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200"
            >
              <WhatsAppIcon />
            </a>
            <a
              href="#"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200"
            >
              <PhoneIcon />
            </a>
            <a
              href="#"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200"
            >
              <TelegramIcon />
            </a>
          </div>
          <span className="text-base font-normal leading-normal text-white">
            Отвечаем на звонки и сообщения
            <br /> с 10:00 до 22:00
          </span>
        </div>
        <div className="flex order-2 md:order-3 mb-10 md:mb-0">
          <a
            href="#"
            className="text-base font-medium leading-normal text-white"
          >
            Политика
            <br /> конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
};
