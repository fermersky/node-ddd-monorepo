import Sidebar from '@/app/ui/dashboard/sidebar/sidebar';

import styles from './layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
