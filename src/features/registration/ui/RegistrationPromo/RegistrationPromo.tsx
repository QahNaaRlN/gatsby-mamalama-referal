import React from "react";

// import { RegForm } from '@entities/registration';
import { useRegistration } from "@entities/registration/hooks/useRegistration";
import { Button } from "@shared/ui/button";
import { ErrorMessage } from "@shared/ui/error";
import { Spinner } from "@shared/ui/spinner";


// interface RegistrationPromoProps {
//   name: string;
//   onSuccess: () => void;
// }

export const RegistrationPromo: React.FC = () => {
  const { data, error, loading } = useRegistration();

  console.log(data);

  const promoContent = data?.[0];
  const { title, subtitle, description } = promoContent

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже."
      />
    );
  }

  return (
    <div className="container relative z-10">
      <div className="flex items-center justify-between">
        <div className="max-w-[43.75rem] basis-auto">
          <h2 className="mb-6 text-3xl font-medium leading-normal text-blue-700">
            {title}
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
            {subtitle}
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
  );
};