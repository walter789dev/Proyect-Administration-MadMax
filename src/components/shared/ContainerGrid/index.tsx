import { FC, ReactNode } from "react";
import styles from "./ContainerGrid.module.css";

interface GridProps {
  type?: "primary" | "secondary";
  children: ReactNode | ReactNode[];
}
// -------- Define la grilla 2x1 de las Páginas ------------
const ContainerGrid: FC<GridProps> = ({ type = "primary", children }) => {
  return (
    <main className={`${styles.container} ${styles[type]}`}>{children}</main>
  );
};

export default ContainerGrid;
