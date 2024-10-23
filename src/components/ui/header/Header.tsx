import { FC } from "react";
import styles from "./header.module.css";

interface HeaderProps {
  title: string;
  type: "primary" | "secondary";
}

const Header: FC<HeaderProps> = ({ title, type }) => {
  return (
    <header className={`${styles.header} ${styles[type]}`}>
      <h1 className={styles.headerTitle}>
        {title ? `Sucursales: ${title}` : "MadMax Administration"}
      </h1>
    </header>
  );
};

export default Header;
