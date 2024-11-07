import { FC } from "react";
import styles from "./Options.module.css";

interface OptionsProps {
  setRoutes: (index: number) => void;
  routes: number;
}

export const Options: FC<OptionsProps> = ({ routes, setRoutes }) => {
  const columns = ["Categorías", "Productos", "Alérgenos"];
  return (
    <>
      <nav className={styles.opciones}>
        <h2 className={styles.opcionesTitle}>Administración</h2>
        <ul className={styles.opcionesUl}>
          {columns.map((column, id) => (
            <li
              key={id}
              className={`${styles.opcion} ${routes == id && styles.active}`}
              onClick={() => setRoutes(id)}
            >
              {column}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
