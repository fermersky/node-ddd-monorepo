import type { Driver } from 'shared';

import styles from './driver-card.module.css';

export type DriverCardData = Omit<Driver, 'password'>;

export function DriverCard({ driver }: { driver: DriverCardData }) {
  const getDriverFullName = (driver: DriverCardData) => {
    return [driver.firstName, driver.lastName].join(' ');
  };

  return (
    <div className={styles.card}>
      <p>{getDriverFullName(driver)}</p>
    </div>
  );
}
