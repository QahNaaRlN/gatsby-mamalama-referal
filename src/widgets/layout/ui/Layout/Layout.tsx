import React from "react";

import { Footer } from "@widgets/layout/ui/Footer";
import { Header } from "@widgets/layout/ui/Header";
import type { LayoutProps } from "@widgets/layout/model";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-full">
      <Header />
      <main className="bg-neutral-100">{children}</main>
      <Footer />
    </div>
  );
}