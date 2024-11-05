import { useEffect, useState } from "react";
import Button from "../../../ui/Button/Button";
import Allergen from "../Allergen/Allergen";
import styles from "./TableAllergen.module.css";
import { helpHttp } from "../../../../helpers/helpHttp";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";
import FormAllergen from "../FormAllergen/FormAllergen";
import ModalInfo from "../../../ui/ModalInfo/ModalInfo";
import ModalOptions from "../../../ui/ModalOptions/ModalOptions";
import useModals from "../../../../hooks/useModals";

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

  const deleteAlergeno = (id: number | undefined) => {
    helpHttp<IAlergenos>()
      .del(`alergenos/${id}`)
      .then(() => setAlergenos(alergenos.filter((item) => item.id !== id)));
  };

  useEffect(() => {
    helpHttp<IAlergenos>()
      .getAll("alergenos")
      .then((res) => setAlergenos(res));
  }, []);
  return (
    <>
      <section className={styles.contenedor}>
        <div className={styles.button}>
          <Button
            text="Alergeno"
            type="tertiary"
            openModal={() => openForm()}
          />
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
