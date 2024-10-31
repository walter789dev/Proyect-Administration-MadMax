import styles from "./Options.module.css";

export const Options = () => {
  return (
    <>
     <nav className={styles.opciones}>
        {/*Poner nombre de la sucursal*/}
        <h2 className={styles.opcionesTitle}>Administración </h2>
        <ul className={styles.opcionesUl}>
            <li className={styles.opcion}>CATEGORÍAS</li>
            <li className={styles.opcion}>PRODUCTOS</li>
            <li className={styles.opcion}>ALÉRGENOS</li>

        </ul>
      </nav>
    </>
  )
}
