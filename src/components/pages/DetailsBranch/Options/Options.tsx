import { FC } from "react";
import styles from "./Options.module.css";

interface OptionsProps {
  setRoutes: (index: number) => void;
  routes: number;
}

export const Options: FC<OptionsProps> = ({ routes, setRoutes }) => {
  return (
    <>
      <nav className={styles.opciones}>
        <h2 className={styles.opcionesTitle}>Administración</h2>
        <ul className={styles.opcionesUl}>
          <li
            className={`${styles.opcion} ${routes == 0 && styles.active}`}
            onClick={() => setRoutes(0)}
          >
            Categorías
          </li>
          <li
            className={`${styles.opcion} ${routes == 1 && styles.active}`}
            onClick={() => setRoutes(1)}
          >
            Productos
          </li>
          <li
            className={`${styles.opcion} ${routes == 2 && styles.active}`}
            onClick={() => setRoutes(2)}
          >
            Alérgenos
          </li>
        </ul>
      </nav>
    </>
  );
};
