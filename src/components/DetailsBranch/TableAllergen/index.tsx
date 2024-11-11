import { useEffect, useState } from "react";
import styles from "./TableAllergen.module.css";
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";
import useModals from "../../../hooks/useModals";
import { helpHttp } from "../../../helpers/helpHttp";
import Button from "../../shared/Button";
import Allergen from "../Allergen";
import ModalOptions from "../../shared/ModalOptions";
import FormAllergen from "../FormAllergen";
import ModalInfo from "../../shared/ModalInfo";

// ---------- Componente para listar Alergenos -----------
export const TableAllergen = () => {
  const [alergenos, setAlergenos] = useState<IAlergenos[]>([]);
  const {
    modalForm,
    modalInfo,
    dataToEdit,
    info,
    openForm,
    openView,
    resetForm,
  } = useModals<IAlergenos>();

  const { getAll, del } = helpHttp();

  const deleteAlergeno = (id: number | undefined) => {
    del<IAlergenos>(`alergenos/${id}`).then(() =>
      setAlergenos(alergenos.filter((item) => item.id !== id))
    );
  };

  useEffect(() => {
    getAll<IAlergenos>("alergenos").then((res) => setAlergenos(res));
  }, []);
  return (
    <>
      <section className={styles.contenedor}>
        <div className={styles.button}>
          <Button text="Alergeno" type="tertiary" openModal={openForm} />
        </div>
        <div className={styles.title}>
          <h2>Lista de Alergenos: </h2>
        </div>
        <ul className={styles.tables}>
          <li className={`${styles.firstRow} ${styles.element}`}>
            <p className={styles.columnOne}>Nombre</p>
            <p className={styles.columnTwo}>Acciones</p>
          </li>
          {alergenos.length > 0 ? (
            alergenos.map((alergeno, id) => (
              <Allergen key={id} denominacion={alergeno.denominacion}>
                <ModalOptions
                  type="custom"
                  item={alergeno}
                  view={openView}
                  edit={openForm}
                  del={deleteAlergeno}
                />
              </Allergen>
            ))
          ) : (
            <li>No hay Alergenos</li>
          )}
        </ul>
      </section>
      {modalForm && (
        <FormAllergen
          dataToEdit={dataToEdit}
          closeModal={resetForm}
          setAlergenos={setAlergenos}
        />
      )}
      {modalInfo && info && (
        <ModalInfo
          title="Alergeno"
          columns={["denominacion"]}
          info={info}
          setOpenModal={resetForm}
        />
      )}
    </>
  );
};
