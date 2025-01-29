import type { HeadFC, PageProps } from "gatsby";
import React from "react";

import { ConditionsSection } from "@widgets/conditions-section/ui";
import { FAQSection } from "@widgets/faq-section/ui";
import { Layout } from "@widgets/layout";
import { ServiceSection } from "@widgets/service-section/ui/ServiceSection/ServiceSection";

import type { HomePageData } from "./model/types";

import '@app/styles';


const HomePage: React.FC<PageProps<HomePageData>> = () => {

  return (
    <Layout>
      <ServiceSection />
      <ConditionsSection />
      <FAQSection />
    </Layout>
  );
};

export default HomePage;

export const Head: HeadFC = () => <title>Mamalama Referal</title>;
