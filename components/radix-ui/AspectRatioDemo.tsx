import React from 'react';
import { styled } from '@stitches/react';
import { blackA } from '@radix-ui/colors';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';

const AspectRatio = AspectRatioPrimitive;

export default function AspectRatioDemo ({ children }){
  return (
    <div
      style={{
        width: 300,
        borderRadius: 6,
        overflow: 'hidden',
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
      }}
    >
      <AspectRatio.Root ratio={16 / 9}>{children}</AspectRatio.Root>
    </div>
  );
};

// Image with src "https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80" may not render properly with a parent using position:"absolute". Consider changing the parent style to position:"relative" with a width and height.
