import styles from './layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={styles.login}>{children}</div>;
}
