import { useEffect, useRef } from 'react';

interface RenderDebugOptions {
  name: string;
  logProps?: boolean;
  logDeps?: boolean;
}

export const useRenderCount = (props: any, options: RenderDebugOptions) => {
  const renderCount = useRef(0);
  const prevProps = useRef(props);

  useEffect(() => {
    renderCount.current += 1;

    console.group(`[Debug] ${options.name} render #${renderCount.current}`);
    console.log('Render count:', renderCount.current);

    if (options.logProps) {
      console.log('Current props:', props);
      // Находим изменившиеся пропсы
      const changedProps: Record<string, { old: any; new: any }> = {};
      Object.entries(props).forEach(([key, value]) => {
        if (prevProps.current[key] !== value) {
          changedProps[key] = {
            old: prevProps.current[key],
            new: value,
          };
        }
      });

      if (Object.keys(changedProps).length > 0) {
        console.log('Changed props:', changedProps);
      }
    }

    console.groupEnd();

    prevProps.current = props;
  });

  return renderCount.current;
};