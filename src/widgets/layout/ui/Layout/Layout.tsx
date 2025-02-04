import React from "react";

import type { LayoutProps } from "@widgets/layout/model";
import { Footer } from "@widgets/layout/ui/Footer";
import { Header } from "@widgets/layout/ui/Header";

export const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className="h-full">
      <Header />
      <main className="bg-neutral-100">{children}</main>
      <Footer />
    </div>
  );
};

Layout.whyDidYouRender = true;
