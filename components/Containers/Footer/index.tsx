import type { FC, SVGProps } from 'react';

import NavItem from '@/components/Containers/NavBar/NavItem';
import Discord from '@/components/Icons/Social/Discord';
import GitHub from '@/components/Icons/Social/GitHub';
import LinkedIn from '@/components/Icons/Social/LinkedIn';
import Mastodon from '@/components/Icons/Social/Mastodon';
import Slack from '@/components/Icons/Social/Slack';
import Twitter from '@/components/Icons/Social/Twitter';
import { siteNavigation } from '@/next.json.mjs';

import styles from './index.module.css';

const footerSocialIcons: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {
  github: GitHub,
  mastodon: Mastodon,
  twitter: Twitter,
  slack: Slack,
  linkedin: LinkedIn,
  discord: Discord,
};

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.sectionPrimary}>
        {siteNavigation.footerLinks.slice(0, -1).map(item => (
          <NavItem type="footer" href={item.link} key={item.link}>
            item.text
          </NavItem>
        ))}
      </div>

      <div className={styles.sectionSecondary}>
        <div className={styles.social}>
          {siteNavigation.socialLinks.map(link => {
            const SocialIcon = footerSocialIcons[link.icon];

            return (
              <NavItem key={link.icon} href={link.link} type="footer">
                <SocialIcon width={20} height={20} aria-label={link.link} />
              </NavItem>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
