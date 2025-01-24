import type { HeadFC, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";

import { ServiceCards } from "@/widgets/service-cards/ui/ServiceCards";
import { Button } from "@ui/button";
import { FAQSection } from "@widgets/faq/ui";
import { Layout } from "@widgets/layout";

import type { HomePageData } from "./model/types";


const HomePage: React.FC<PageProps<HomePageData>> = () => {

  return (
    <Layout>
      <section className="relative h-dvh overflow-hidden bg-cyan-300 pb-24 pt-44">
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
                <div className="inline-flex items-center justify-start gap-1.5 rounded-[2rem] border-b border-r border-purple-450 bg-purple-300 px-4 py-1">
                  <span className="text-4xl font-semibold text-neutral-900">
                    3000 ₸
                  </span>
                </div>{" "}
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
      <section className="py-16">
        <div className="container">
          <h2 className="mb-10 text-4xl font-medium leading-snug text-neutral-900">
            На что можно потратить 3000 тенге
          </h2>
          <ServiceCards />
        </div>
      </section>
      <section className="py-16">
        <div className="container">
          <h2 className="mb-10 text-4xl font-medium leading-snug text-neutral-900">
            Условия акции
          </h2>
          <div className="mb-10 flex gap-x-5">
            <div className="inline-flex basis-1/3 flex-col items-start justify-start gap-4 rounded-3xl bg-white px-6 pb-8 pt-7 shadow-custom">
              <h4 className="text-base font-semibold leading-snug text-teal-700">
                Никаких ограничений
              </h4>
              <div className="text-base font-normal leading-snug text-neutral-900">
                Можно потратить 3000 тенге на любые услуги в любом пункте!
                Найдите удобный пункт по{" "}
                <a
                  href="#"
                  className="text-base font-medium leading-snug text-teal-700 underline"
                >
                  ссылке
                </a>
                .
              </div>
            </div>
            <div className="inline-flex basis-1/3 flex-col items-start justify-start gap-4 rounded-3xl bg-white px-6 pb-8 pt-7 shadow-custom">
              <h4 className="text-base font-semibold leading-snug text-teal-700">
                Не суммируется
              </h4>
              <div className="text-base font-normal leading-snug text-neutral-900">
                Скидка не суммируется с другими акциями или предложениями
              </div>
            </div>
            <div className="inline-flex basis-1/3 flex-col items-start justify-start gap-4 rounded-3xl bg-white px-6 pb-8 pt-7 shadow-custom">
              <h4 className="text-base font-semibold leading-snug text-teal-700">
                Только для новых клиентов
              </h4>
              <div className="text-base font-normal leading-snug text-neutral-900">
                Можно использовать только в нашей сети на первый заказ
              </div>
            </div>
          </div>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-teal-700 px-6 py-3"
          >
            Полные правила акции
          </a>
        </div>
      </section>
      <FAQSection/>
    </Layout>
  );
};

export default HomePage;

export const Head: HeadFC = () => <title>Mamalama Referal</title>;