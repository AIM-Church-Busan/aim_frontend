import Link from 'next/link';
import { LuArrowRight } from 'react-icons/lu';
import styles from './NavigationBar.module.css';

export default function SplitArrowLink({ href, children, onClick }) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={`rounded-full ${styles.actionLink}`}
      onClick={onClick}
    >
      <span className={`rounded-full ${styles.actionLabel}`}>{children}</span>
      <span className={`rounded-full ${styles.actionArrow}`} aria-hidden="true">
        <LuArrowRight />
      </span>
    </Link>
  );
}
