import Link from 'next/link';
import { LuArrowUpRight } from 'react-icons/lu';
import SplitArrowLink from './SplitArrowLink';
import styles from './navigationStyles';

export default function DropdownPanel({ menu, onNavigate, mobile = false }) {
  return (
    <div className={`${styles.content} ${mobile ? styles.mobileContent : ''}`}>
      <div className={styles.intro}>
        <h2>{menu.label}</h2>
        <p className={styles.description}>{menu.description}</p>
        <SplitArrowLink href={menu.href} onClick={onNavigate}>
          {menu.action}
        </SplitArrowLink>
      </div>
      <ul className={styles.links}>
        {menu.links.map(({ label, description, href, icon: Icon }, index) => (
          <li key={label}>
            <Link
              href={href}
              prefetch={false}
              onClick={onNavigate}
              className={styles.card}
            >
              <span className={`${styles.icon} ${styles[`tone${index % 4}`]}`}>
                <Icon aria-hidden="true" />
              </span>
              <span className={styles.cardCopy}>
                <span className={styles.cardTitle}>{label}</span>
                <span className={styles.cardDescription}>{description}</span>
              </span>
              <LuArrowUpRight className={styles.cardArrow} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
