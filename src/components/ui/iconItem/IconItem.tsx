import { FC, ReactNode } from "react";
import styles from "./iconItem.module.css";

interface IconProps {
  children: ReactNode;
}

const IconItem: FC<IconProps> = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};

export default IconItem;
