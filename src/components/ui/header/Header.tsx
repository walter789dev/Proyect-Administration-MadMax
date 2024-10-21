import { FC } from "react";
import styles from './header.module.css'

interface HeaderProps {
  title: string;
  color: string;
}

const Header: FC<HeaderProps> = ({ title, color }) => {
  return (
     <header className={styles.header} style={{ backgroundColor: color }}>
      <h1 className={styles.headerTitle}>{title}</h1>
    </header>
  );
};

export default Header;
