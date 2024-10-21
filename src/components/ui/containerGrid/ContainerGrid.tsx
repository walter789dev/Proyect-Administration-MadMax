import { FC, ReactNode } from "react";
import styles from "./containerGrid.module.css";

interface GridProps {
  children: ReactNode | ReactNode[];
}

const ContainerGrid: FC<GridProps> = ({ children }) => {
  return <main className={styles.container}>{children}</main>;
};

export default ContainerGrid;
