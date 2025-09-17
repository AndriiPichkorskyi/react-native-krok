import React, { useEffect, useRef } from 'react';

export const useWhyDidYouUpdate = (name: string, props: object) => {
  const previousProps = useRef();
  useEffect(() => {
    if (previousProps.current) {
      const changes = Object.entries(props).reduce((acc, [key, value]) => {
        if (previousProps.current[key] !== value) {
          acc[key] = { before: previousProps.current[key], after: value };
        }
        return acc;
      }, {});
      if (Object.keys(changes).length > 0) {
        console.log('[why-did-you-update]', name, changes);
      }
    }
    previousProps.current = props;
  });
};
