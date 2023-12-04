import Image from 'next/image';
import { Suspense } from 'react';

import styles from './page.module.css';
import { DriversList } from './ui/driver/driver-list/driver-list';

export default async function Home() {
  return (
    <main className={styles.main}>
      <Image src="/truck.svg" alt="Image of the delivery car and its driver" width={200} height={100} />
      <h1>Drivers</h1>
      <DriversList />
    </main>
  );
}
