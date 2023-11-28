'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './nav-links.module.css';

export interface NavLinkData {
  href: string;
  name: string;
}

export default function NavLinks({ links }: { links: NavLinkData[] }) {
  const pathname = usePathname();

  return (
    <ul className={styles.links}>
      {links.map((l) => (
        <li key={l.name}>
          <Link
            className={clsx(styles.link, { [styles.active]: pathname === l.href })}
            key={l.name}
            href={l.href}
          >
            {l.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
