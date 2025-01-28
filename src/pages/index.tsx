import type { HeadFC, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";

import { Button } from "@ui/button";
import { ConditionsSection } from "@widgets/conditions-section/ui";
import { FAQSection } from "@widgets/faq-section/ui";
import { Layout } from "@widgets/layout";
import { ServiceSection } from "@widgets/service-section/ui/ServiceSection/ServiceSection";

import type { HomePageData } from "./model/types";


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