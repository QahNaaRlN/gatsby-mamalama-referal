// widgets/RegistrationSection/index.tsx
import { StaticImage } from "gatsby-plugin-image";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import { RegistrationFormPromo, RegistrationFormSuccess } from "@features/registration";

interface RegistrationSectionProps {
  className?: string;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
                                                                          className
                                                                        }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  // Флаг для режима разработки
  const isDevelopment = process.env.NODE_ENV === 'development';

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  const toggleView = () => {
    setIsSuccess(prev => !prev);
  };

  return (
    <section
      className={twMerge(
        "relative min-h-dvh overflow-hidden bg-cyan-300 pb-24 flex items-center justify-center",
        className
      )}
    >
      {/* Кнопка для переключения в режиме разработки */}
      {isDevelopment && (
        <button
          onClick={toggleView}
          className="fixed top-4 right-4 z-50 rounded-md bg-gray-800 px-4 py-2 text-sm text-white"
        >
          Toggle View: {isSuccess ? 'Success' : 'Form'}
        </button>
      )}

      <StaticImage
        src="@shared/assets/images/cloud.png"
        alt="cloud"
        placeholder="blurred"
        layout="constrained"
        width={2560}
        className="absolute -bottom-1/3 left-0 right-0 z-0 max-w-full"
      />
      {isSuccess ? (
        <RegistrationFormSuccess />
      ) : (
        <RegistrationFormPromo onSuccess={handleSuccess} />
      )}
    </section>
  );
};