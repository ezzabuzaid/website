import type { FC, PropsWithChildren } from 'react';

import CodeBox from '@/components/Common/CodeBox';

type CodeBoxProps = { className?: string; showCopyButton?: string };

const MDXCodeBox: FC<PropsWithChildren<CodeBoxProps>> = ({
  children: code,
  className,
  showCopyButton,
}) => {
  const matches = className?.match(/language-(?<language>.*)/);
  const language = matches?.groups?.language ?? '';

  return (
    <CodeBox
      language={language}
      showCopyButton={showCopyButton ? showCopyButton === 'true' : undefined}
    >
      {code}
    </CodeBox>
  );
};

export default MDXCodeBox;
