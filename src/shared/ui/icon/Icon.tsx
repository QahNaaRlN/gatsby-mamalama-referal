import React from "react";

/**
 * Props for the Icon component.
 */
export interface IconProps {
  src: string;
  /** The width of the icon. */
  width?: string | number;
  alt?: string;
  /** The height of the icon. */
  height?: string | number;
  /** The fill color of the icon. */
  fill?: string;
  /** Additional CSS classes to apply to the icon. */
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
                                            src,
                                            width = '24',
                                            height = '24',
                                            alt = '',
                                            className = '',
                                          }) => {

  return (
      <img
        src={src}
        width={width}
        height={height}
        alt={alt}
        className={className}
        loading="lazy"
      />
  );
};