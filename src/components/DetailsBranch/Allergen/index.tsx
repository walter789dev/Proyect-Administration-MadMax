import { FC, ReactNode } from "react";
import styles from "./Allergen.module.css";

interface IAllergen {
  denominacion: string;
  children: ReactNode;
}

const Allergen: FC<IAllergen> = ({ denominacion, children }) => {
  return (
    <li className={styles.element}>
      <p className={styles.columnOne}>{denominacion}</p>
      <div className={styles.columnTwo}>{children}</div>
    </li>
  );
};

export default Allergen;
