import { useEffect, useState } from "react";
import Button from "../../../ui/Button/Button";
import Allergen from "../Allergen/Allergen";
import styles from "./TableAllergen.module.css";
import { helpHttp } from "../../../../helpers/helpHttp";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";
import FormAllergen from "../FormAllergen/FormAllergen";
import ModalInfo from "../../../ui/ModalInfo/ModalInfo";
import ModalOptions from "../../../ui/ModalOptions/ModalOptions";

export const TableAllergen = () => {
  const [alergenos, setAlergenos] = useState<IAlergenos[]>([]);

  const [modalEdit, setModalEdit] = useState(false);
  const [dataToEdit, setDataToEdit] = useState<IAlergenos | null>(null);

  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [infoAlergeno, setInfoAlergeno] = useState<IAlergenos | void>();

  const editAlergeno = (alergeno: IAlergenos) => {
    setModalEdit(true);
    setDataToEdit(alergeno);
  };

  const viewAlergeno = (alergeno: IAlergenos) => {
    setOpenModalInfo(true);
    setInfoAlergeno(alergeno);
  };

  const deleteAlergeno = (id: number | undefined) => {
    helpHttp<IAlergenos>()
      .del(`http://190.221.207.224:8090/alergenos/${id}`)
      .then(() => setAlergenos(alergenos.filter((item) => item.id !== id)));
  };

  useEffect(() => {
    helpHttp<IAlergenos>()
      .getAll("http://190.221.207.224:8090/alergenos")
      .then((res) => setAlergenos(res));
  }, []);
  return (
    <>
      <section className={styles.contenedor}>
        <div className={styles.button}>
          <Button
            text="Alergeno"
            type="tertiary"
            openModal={() => setModalEdit(true)}
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
                  view={viewAlergeno}
                  edit={editAlergeno}
                  del={deleteAlergeno}
                />
              </Allergen>
            ))
          ) : (
            <li>No hay Alergenos</li>
          )}
        </ul>
      </section>
      {modalEdit && (
        <FormAllergen
          closeModal={setModalEdit}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          setAlergenos={setAlergenos}
        />
      )}
      {openModalInfo && infoAlergeno && (
        <ModalInfo
          columns={["denominacion"]}
          info={infoAlergeno}
          setOpenModal={setOpenModalInfo}
        />
        //   <ModalAllergenInfo
        //     allergen={infoAlergeno}
        //     setOpenModal={setOpenModalInfo}
        //   />
      )}
    </>
  );
};
