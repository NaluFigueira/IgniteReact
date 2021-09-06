import Link from 'next/link';
import styles from './header.module.scss';

interface HeaderProps {
  currentPath: string;
}

const Header: React.FC<HeaderProps> = ({ currentPath }) => {
  const isCurrentPageHome = currentPath === '/';
  const headerContainerClassName = `${styles.headerContainer} ${
    isCurrentPageHome ? styles.home : ''
  }`;

  return (
    <div className={headerContainerClassName}>
      <Link href="/">
        <img src="/images/Logo.svg" alt="logo" />
      </Link>
    </div>
  );
};

export default Header;
