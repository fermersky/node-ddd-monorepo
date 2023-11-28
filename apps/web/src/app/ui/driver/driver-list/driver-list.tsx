import { inter } from '@/app/ui/fonts';

import { DriverCard, type DriverCardData } from '../driver-card/driver-card';
import styles from './driver-list.module.css';

export function DriversList({ drivers }: { drivers: DriverCardData[] }) {
  const driversList = drivers.map((d) => (
    <li className={styles.item} key={d.id}>
      <DriverCard driver={d} />
    </li>
  ));

  return <ul className={`${styles.list} ${inter.className}`}>{driversList}</ul>;
}
