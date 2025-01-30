import { StaticImage } from "gatsby-plugin-image";
import React, { useState } from "react";

import { useUTM } from "@features/registration/hooks/useUTM";
import { RegistrationPromo } from "@features/registration/ui";
import { Button } from "@ui/button";

export const RegistrationSection: React.FC = () => {
  // const { utmParams } = useUTM();
  // const [isSuccess, setIsSuccess] = useState(false);
  //
  // const handleSuccess = () => {
  //   setIsSuccess(true);
  // };

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
      <RegistrationPromo/>
    </section>
  );
};