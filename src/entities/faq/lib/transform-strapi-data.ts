// import type { FAQItem } from "../model/types";
//
// export const transformStrapiData = (data: any[]) => {
//   return data.map((item) => ({
//     title: item.attributes.question,
//     content: item.attributes.answer,
//   }));
// };
import { StrapiData } from "@entities/faq";

export const transformStrapiData = (data: StrapiData[]) => {
  return data.map((item) => ({
    title: item.attributes.question,
    content: item.attributes.answer,
  }));
};

export const mockFAQData = [
  {
    id: "1",
    attributes: {
      question: "Могу ли я оплатить заказ наличными?",
      answer:
        "К сожалению, вы можете оплатить только kaspi или банковской картой.",
      order: 1,
    },
  },
  {
    id: "2",
    attributes: {
      question: "Не могу найти вещь в прайс листе. Что делать?",
      answer:
        "Мы не принимаем ковры и натуральную кожу. В остальных случаях позвоните или напишите нам — ответим на любые вопросы.",
      order: 2,
    },
  },
  {
    id: "3",
    attributes: {
      question: "Когда вы списываете деньги за заказ?",
      answer: "Оплата производится при получении вещи.",
      order: 3,
    },
  },
];
