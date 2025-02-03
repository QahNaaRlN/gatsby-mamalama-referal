import type { HeadFC, PageProps } from "gatsby";
import React from "react";

import { ConditionsSection } from "@widgets/conditions-section/ui";
import { FAQSection } from "@widgets/faq-section/ui";
import { Layout } from "@widgets/layout";
import { RegistrationSection } from "@widgets/registration-section/ui/RegistrationSection";
import { ServiceSection } from "@widgets/service-section/ui/ServiceSection/ServiceSection";

import "@app/styles";

export interface HomePageData {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

const HomePage: React.FC<PageProps<HomePageData>> = () => {
  return (
    <Layout>
      <RegistrationSection />
      <ServiceSection />
      <ConditionsSection />
      <FAQSection />
    </Layout>
  );
};

export default HomePage;

export const Head: HeadFC = () => <title>Mamalama Referral</title>;