import Image from 'next/image';
import type { FC } from 'react';

import Logo from '@/components/Icons/Logos/logo.png';
import type { LogoVariant } from '@/types';

type NodejsLogoProps = {
  variant?: LogoVariant;
};

const NodejsLogo: FC<NodejsLogoProps> = ({ variant = 'default' }) => (
  <>
    {variant === 'default' && (
      <>
        <Image
          className="rounded"
          src={Logo}
          alt="January Logo"
          width={40}
          height={40}
        />
        {/* <NodejsDark className={style.nodejsLogoDark} />
        <NodejsLight className={style.nodejsLogoLight} /> */}
      </>
    )}
  </>
);

export default NodejsLogo;
