import styles from "./FormAllergen.module.css";
import ButtonForm from "../../../ui/ButtonForm/ButtonForm";
import { FC, useEffect } from "react";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";
import { helpHttp } from "../../../../helpers/helpHttp";
import Modal from "../../../ui/Modal/Modal";
import Loader from "../../../ui/Loader/Loader";
import { ICreateAlergeno } from "../../../../types/dtos/alergenos/ICreateAlergeno";
import { IUpdateAlergeno } from "../../../../types/dtos/alergenos/IUpdateAlergeno";
import useImage from "../../../../hooks/useImage";
import useForm from "../../../../hooks/useForm";

interface ModalProps {
  dataToEdit: IAlergenos | null;
  closeModal: (state?: string) => void;
  setAlergenos: (updater: (state: IAlergenos[]) => IAlergenos[]) => void;
}

const FormAllergen: FC<ModalProps> = ({
  dataToEdit,
  closeModal,
  setAlergenos,
}) => {
  const { dataForm, setDataForm, handlerChange } = useForm<ICreateAlergeno>({
    denominacion: "",
    imagen: {
      name: "",
      url: "",
    },
  });

  const { post, put } = helpHttp();
  const { image, loading, handler, service } = useImage();

  const handlerSubmit = async () => {
    const voidValues = Object.keys(dataForm).some((item) => item.length === 0);

    if (voidValues || !image) {
      alert("Faltan campos por completar");
      return;
    }

    const newData = await service();
    let resInfo = { ...dataForm, logo: newData };

    if (dataToEdit) {
      const res = await put<IUpdateAlergeno>(
        `alergenos/${dataForm.id}`,
        resInfo
      );
      if (res) {
        setAlergenos((state: IAlergenos[]) => {
          const filter = state.filter((item) => item.id != dataForm.id);
          return [...filter, resInfo];
        });
      }
    } else {
      const res = await post<ICreateAlergeno>(`alergenos`, resInfo);
      if (res) setAlergenos((state: IAlergenos[]) => [...state, resInfo]);
    }

    closeModal();
  };

  useEffect(() => {
    if (dataToEdit) setDataForm(dataToEdit);
  }, [dataToEdit]);

  return (
    <Modal>
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
            value={dataForm.denominacion}
            onChange={handlerChange}
          />
          <label htmlFor="file">Ingrese una imagen:</label>
          <input id="file" type="file" onChange={handler} />
          <div className={styles.modalButtons}>
            {loading ? (
              <Loader />
            ) : (
              <>
                <ButtonForm
                  type="cancel"
                  text="Cancelar"
                  event={() => closeModal()}
                />
                <ButtonForm
                  type="confirm"
                  text="Confirmar"
                  event={handlerSubmit}
                />
              </>
            )}
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default FormAllergen;
