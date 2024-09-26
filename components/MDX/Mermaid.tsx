'use client';
import { Suspense, useEffect, useRef } from 'react';

const Mermaid = ({ chart }: { chart: string }) => {
  const mermaidRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { default: mermaid } = await import('mermaid');
      if (mermaidRef.current) {
        mermaid.initialize({
          startOnLoad: true,

          theme: 'dark',
          fontFamily: 'var(--font-inter)',
          fontSize: 16,
          securityLevel: 'loose',

          themeCSS: `
    g.classGroup rect {
      fill: #282a36;
      stroke: #6272a4;
    }
    g.classGroup text {
      fill: #f8f8f2;
    }
    g.classGroup line {
      stroke: #f8f8f2;
      stroke-width: 0.5;
    }
    .classLabel .box {
      stroke: #21222c;
      stroke-width: 3;
      fill: #21222c;
      opacity: 1;
    }
    .classLabel .label {
      fill: #f1fa8c;
    }
    .relation {
      stroke: #ff79c6;
      stroke-width: 1;
    }
    #compositionStart, #compositionEnd {
      fill: #bd93f9;
      stroke: #bd93f9;
      stroke-width: 1;
    }
    #aggregationEnd, #aggregationStart {
      fill: #21222c;
      stroke: #50fa7b;
      stroke-width: 1;
    }
    #dependencyStart, #dependencyEnd {
      fill: #00bcd4;
      stroke: #00bcd4;
      stroke-width: 1;
    }
    #extensionStart, #extensionEnd {
      fill: #f8f8f2;
      stroke: #f8f8f2;
      stroke-width: 1;
    }`,
        });
        mermaid.contentLoaded();
      }
    })();
  }, [chart]);

  return (
    <Suspense>
      <div ref={mermaidRef} className="mermaid [&_svg]:min-w-full">
        {chart}
      </div>
    </Suspense>
  );
};

export default Mermaid;