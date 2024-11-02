import styles from "./Options.module.css";

export const Options = () => {
  return (
    <>
      <nav className={styles.opciones}>
        <h2 className={styles.opcionesTitle}>Administración</h2>
        <ul className={styles.opcionesUl}>
          <li className={styles.opcion}>Categorías</li>
          <li className={styles.opcion}>Productos</li>
          <li className={styles.opcion}>Alérgenos</li>
        </ul>
      </nav>
    </>
  );
};
