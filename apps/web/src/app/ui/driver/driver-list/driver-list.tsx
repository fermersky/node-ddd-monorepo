'use client';

import { getDrivers } from '@/app/actions';
import { inter } from '@/app/ui/fonts';
import { useEffect, useState } from 'react';

import type { GetDriversResponseBody } from '@shared/http/driver.dto';

import { DriverCard } from '../driver-card/driver-card';
import styles from './driver-list.module.css';

export function DriversList() {
  const [drivers, setDrivers] = useState<GetDriversResponseBody>([]);

  useEffect(() => {
    getDrivers().then((drivers) => {
      setDrivers(drivers);
    });
  }, []);

  const driversList = drivers.map((d) => (
    <li className={styles.item} key={d.id}>
      <DriverCard driver={d} />
    </li>
  ));

  return <ul className={`${styles.list} ${inter.className}`}>{driversList}</ul>;
}
