import { FC, ReactNode } from "react";
import defaultImage from "../../../../assets/images/image-default.jpg";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import styles from "./Branch.module.css";

interface BranchProps {
  branch: ISucursal;
  children: ReactNode;
}

const Branch: FC<BranchProps> = ({ branch, children }) => {
  return (
    <figure className={styles.card}>
      <img src={branch.logo || defaultImage} />
      <figcaption className={styles.cardInfo}>
        <h3>{branch.nombre}</h3>
        <h4>
          {branch.horarioApertura} hrs a {branch.horarioCierre} hrs
        </h4>
        {children}
      </figcaption>
    </figure>
  );
};

export default Branch;
