import Button from "../../../ui/Button/Button"
import styles from './TableAllergen.module.css'

export const TableAllergen = () => {
  return (
    <>
    <section className={styles.contenedor}>
        <div className={styles.button}>
            <Button text="Alergeno" type="tertiary" openModal={() => { }} />
        </div>
        <ul className={styles.tables}>
            <li className={styles.headerTable}>
                <p className={styles.columnOne}>Nombre</p>
                <p className={styles.columnTwo}>Acciones</p>
            </li>
            <li className={styles.element}></li>
        </ul>
    </section>
    </>

  )
}
