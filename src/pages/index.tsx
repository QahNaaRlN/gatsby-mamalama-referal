import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import React from "react";

import { ConditionsSection } from "@widgets/conditions-section/ui";
import { FAQSection } from "@widgets/faq-section/ui";
import { Layout } from "@widgets/layout";
import { RegistrationSection } from "@widgets/registration-section/ui/RegistrationSection";
import { ServiceSection } from "@widgets/service-section/ui/ServiceSection";

import "@app/styles";

interface SiteMetadata {
  documentId: string;
  domain: string;
  siteName: string;
  metaTitle: string;
  metaDescription: string;
  isActive: boolean;
}

interface HomePageData {
  strapi: {
    sites: SiteMetadata[];
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

export const query = graphql`
  query SiteMetadataQuery {
    strapi {
      sites(filters: { isActive: { eq: true } }) {
        documentId
        domain
        siteName
        metaTitle
        metaDescription
        metaKeywords
        isActive
        discount
      }
    }
  }
`;

export const Head: HeadFC<HomePageData> = ({ data }) => {
  const domain = typeof window !== "undefined" ? window.location.hostname : "";
  const siteMetadata = data?.strapi?.sites?.find(site => site.domain === domain);

  return (
    <>
      <title>{siteMetadata?.metaTitle || "Mamalama Referral"}</title>
      <meta
        name="description"
        content={siteMetadata?.metaDescription || ""}
      />
    </>
  );
};

export default HomePage;