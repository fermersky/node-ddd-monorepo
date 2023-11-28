import styles from './layout.module.css';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.login}>{children}</div>;
}
