import Image from 'next/image';

import NavLinks, { type NavLinkData } from './nav-links/nav-links';
import styles from './sidebar.module.css';

export default function Sidebar() {
  const links: NavLinkData[] = [
    {
      name: 'Drivers',
      href: '/dashboard/drivers',
    },
    {
      name: 'Shipments',
      href: '/dashboard/shipments',
    },
  ];

  return (
    <div className={styles.sidebar}>
      <Image src="/delivery.svg" alt="Delivery" width={200} height={350} />
      <NavLinks links={links} />
    </div>
  );
}
