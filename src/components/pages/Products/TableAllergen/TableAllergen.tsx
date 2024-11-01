import { useEffect, useState } from "react";
import Button from "../../../ui/Button/Button";
import Allergen from "../Allergen/Allergen";
import styles from "./TableAllergen.module.css";
import { helpHttp } from "../../../../helpers/helpHttp";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";

export const TableAllergen = () => {
  // const [modalEdit, setModalEdit] = useState(true);
  const [alergenos, setAlergenos] = useState<IAlergenos[] | []>([]);

  useEffect(() => {
    helpHttp<IAlergenos>()
      .getAll("http://190.221.207.224:8090/alergenos")
      .then((res) => setAlergenos(res));
  }, []);
  return (
    <>
      <section className={styles.contenedor}>
        <div className={styles.button}>
          <Button text="Alergeno" type="tertiary" openModal={() => {}} />
        </div>
        <ul className={styles.tables}>
          <li className={`${styles.firstRow} ${styles.element}`}>
            <p className={styles.columnOne}>Nombre</p>
            <p className={styles.columnTwo}>Acciones</p>
          </li>
          {alergenos.length > 0 ? (
            alergenos.map((item) => (
              <Allergen denominacion={item.denominacion} />
            ))
          ) : (
            <li>No hay Alergenos</li>
          )}
        </ul>
      </section>
      {/* {modalEdit && <ModalAllergenEdit />} */}
    </>
  );
};
