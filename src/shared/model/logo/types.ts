import React, { CSSProperties } from "react";

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  primaryFill?: string;
  secondaryFill?: string;
  className?: string;
  style?: CSSProperties;
}
