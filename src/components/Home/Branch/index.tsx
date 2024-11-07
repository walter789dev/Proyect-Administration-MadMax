import { FC, ReactNode } from "react";
import styles from "./styles.module.css";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import defaultImage from "../../../assets/images/image-default.jpg";

interface BranchProps {
  branch: ISucursal;
  children: ReactNode;
}
// -- Componente Card Sucursal --------
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
