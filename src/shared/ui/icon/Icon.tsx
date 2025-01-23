import React from "react";

import { IconProps } from '@shared/model/icon/types';

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