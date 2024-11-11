import { FC } from "react";
import styles from "./DetailsBranch.module.css";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../../components/shared/Header";
import ContainerGrid from "../../components/shared/ContainerGrid";

interface DetailsBranchProps {
  title: string | undefined;
}

export const DetailsBranch: FC<DetailsBranchProps> = ({ title }) => {
  return (
    <>
      <Header title={title} type="sucursal" />
      <ContainerGrid type="secondary">
        <nav className={styles.opciones}>
          <h2 className={styles.opcionesTitle}>Administración</h2>
          <ul className={styles.opcionesUl}>
            <NavLink
              to="."
              end
              className={({ isActive }) =>
                isActive
                  ? `${styles.opcion} ${styles.active}`
                  : `${styles.opcion}`
              }
            >
              Productos
            </NavLink>
            <NavLink
              to="categorias"
              className={({ isActive }) =>
                isActive
                  ? `${styles.opcion} ${styles.active}`
                  : `${styles.opcion}`
              }
            >
              Categorias
            </NavLink>
            <NavLink
              to="alergenos"
              className={({ isActive }) =>
                isActive
                  ? `${styles.opcion} ${styles.active}`
                  : `${styles.opcion}`
              }
            >
              Alérgenos
            </NavLink>
          </ul>
        </nav>
        <Outlet />
      </ContainerGrid>
    </>
  );
};
