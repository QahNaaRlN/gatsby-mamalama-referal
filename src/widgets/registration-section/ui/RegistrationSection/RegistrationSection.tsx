import { RegistrationPromo, RegistrationSuccess } from "@features/registration";
import { StaticImage } from "gatsby-plugin-image";
import React, { useState } from "react";

import { useUTM } from "@features/registration/hooks/useUTM";
import { Button } from "@ui/button";

export const RegistrationSection: React.FC = () => {
  const { utmParams } = useUTM();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  return (
    <section className="relative h-dvh overflow-hidden bg-cyan-300 pb-24 flex items-center justify-center">
      <StaticImage
        src="../shared/assets/images/cloud.png"
        alt="cloud"
        placeholder="blurred"
        layout="constrained"
        width={2560}
        className="absolute -bottom-1/3 left-0 right-0 z-0 max-w-full"
      />
      <div className="container relative z-10">
        <div className="flex items-center justify-between">
          <div className="max-w-[43.75rem] basis-auto">
            <h2 className="mb-6 text-3xl font-medium leading-normal text-blue-700">
              Вас пригласил Владимир
            </h2>
            <div className="mb-7 text-5xl font-semibold leading-snug text-neutral-900">
              Зарегистрируйся
              <br />и получи{" "}
              <div
                className="inline-flex items-center justify-start gap-1.5 rounded-[2rem] border-b border-r border-purple-450 bg-purple-300 px-4 py-1">
                  <span className="text-4xl font-semibold text-neutral-900">
                    3000 ₸
                  </span>
              </div>
              {" "}
              на любые услуги
            </div>
            <div className="text-lg font-normal leading-relaxed text-neutral-900">
              Скидка автоматически применится к первому заказу в любом пункте
            </div>
          </div>
          <div className="inline-flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-white p-16">
            <form
              action=""
              className="flex max-w-[18.75rem] flex-col items-center"
            >
              <h3 className="mb-8 text-3xl font-semibold leading-snug text-neutral-900">
                Заполните форму
              </h3>
              <input
                type="text"
                className="mb-6 inline-flex w-full basis-full items-start justify-start gap-2 rounded-xl border border-slate-300 bg-white p-3 text-base font-normal leading-snug tracking-tight text-neutral-900 hover:border-teal-700 hover:text-neutral-900 focus:border-teal-700 focus-visible:border-teal-700 active:border-teal-700"
                placeholder="Телефон"
              />
              <input
                type="text"
                className="mb-7 inline-flex w-full basis-full items-start justify-start gap-2 rounded-xl border border-slate-300 bg-white p-3 text-base font-normal leading-snug tracking-tight text-neutral-900 hover:border-teal-700 hover:text-neutral-900 focus:border-teal-700 focus-visible:border-teal-700 active:border-teal-700"
                placeholder="Имя"
              />
              <Button
                variant="primary"
                size="lg"
                fullWidth={true}
                className="mb-7"
                type="submit"
              >
                Зарегистрироваться
              </Button>
              <span className="text-center text-base font-normal leading-snug">
                  Регистрируясь, вы соглашаетесь <br />
                  <a
                    href="#"
                    className="font-semibold leading-snug tracking-tight text-teal-700"
                  >
                    с пользовательским соглашением
                  </a>
                </span>
            </form>
          </div>
        </div>
      </div>
    </section>
    // <section>
    //   {isSuccess ? (
    //     <RegistrationSuccess />
    //   ) : (
    //     <RegistrationPromo
    //       name={utmParams.utm_source || 'Гость'} // Динамическое имя из UTM
    //       onSuccess={handleSuccess}
    //     />
    //   )}
    // </section>
  );
};