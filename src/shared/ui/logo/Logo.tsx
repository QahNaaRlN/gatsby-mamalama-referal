import React, { CSSProperties } from "react";

import { ReactComponent as LogoIcon } from "@shared/assets/icons/logo-header.svg";


export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  primaryFill?: string;
  secondaryFill?: string;
  className?: string;
  style?: CSSProperties;
}


export const Logo = ({
  primaryFill = "currentColor",
  secondaryFill = "currentColor",
  className,
  style,
  ...props
}: LogoProps) => {
  const svgStyles: CSSProperties = {
    "--primary-fill": primaryFill,
    "--secondary-fill": secondaryFill,
  } as CSSProperties;

  return (
    <span style={{ display: "inline-block", ...style }} className={className}>
      <style>
        {`
          svg .logo-primary { fill: var(--primary-fill) !important; }
          svg .logo-secondary { fill: var(--secondary-fill) !important; }
        `}
      </style>
      <LogoIcon {...props} style={svgStyles} />
    </span>
  );
};
