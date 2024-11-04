import styles from "./FormAllergen.module.css";
import ButtonForm from "../../../ui/ButtonForm/ButtonForm";
import { FC, useState, ChangeEvent, useEffect } from "react";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";
import { helpHttp } from "../../../../helpers/helpHttp";

interface ModalProps {
  dataToEdit: IAlergenos | null;
  setDataToEdit: (data: IAlergenos | null) => void;
  closeModal: (state: boolean) => void;
  setAlergenos: (updater: (state: IAlergenos[]) => IAlergenos[]) => void;
}

const initial: IAlergenos = {
  denominacion: "",
  imagen: null,
};

// ------------ Añadir - Editar Alergeno --------------
const FormAllergen: FC<ModalProps> = ({
  closeModal,
  dataToEdit,
  setDataToEdit,
  setAlergenos,
}) => {
  const [alergeno, setAlergeno] = useState(initial);

  const resetForm = () => {
    setDataToEdit(null);
    closeModal(false);
  };

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAlergeno((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handlerSubmit = () => {
    if (dataToEdit) {
      helpHttp<IAlergenos>()
        .put(`http://190.221.207.224:8090/alergenos/${alergeno.id}`, alergeno)
        .then(() => {
          setAlergenos((state: IAlergenos[]) => {
            const filter = state.filter((item) => item.id != alergeno.id);
            return [...filter, alergeno];
          });
          resetForm();
        });
    } else {
      helpHttp<IAlergenos>()
        .post(`http://190.221.207.224:8090/alergenos`, alergeno)
        .then(() => {
          setAlergenos((state: IAlergenos[]) => [...state, alergeno]);
          resetForm();
        });
    }
  };

  useEffect(() => {
    if (dataToEdit) setAlergeno(dataToEdit);
  }, [dataToEdit]);

  return (
    <div className={styles.modal}>
      <section className={styles.modalSection}>
        <h2 className={styles.modalTitle}>
          {dataToEdit ? "Editar" : "Añadir"} Alergeno
        </h2>
        <form className={styles.modalForm}>
          <input
            className={styles.modalInput}
            name="denominacion"
            type="text"
            placeholder="Ingresa denominacion"
            value={alergeno.denominacion}
            onChange={handlerChange}
          />
          <label htmlFor="file">Ingrese una imagen:</label>
          <input id="file" type="file" />
          <div className={styles.modalButtons}>
            <ButtonForm
              type="cancel"
              text="Cancelar"
              event={() => resetForm()}
            />
            <ButtonForm type="confirm" text="Confirmar" event={handlerSubmit} />
          </div>
        </form>
      </section>
    </div>
  );
};

export default FormAllergen;
