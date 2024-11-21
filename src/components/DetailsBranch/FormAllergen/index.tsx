import { FC, useEffect } from "react";
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";
import styles from "./FormAllergen.module.css";
import { ICreateAlergeno } from "../../../types/dtos/alergenos/ICreateAlergeno";
import useImage from "../../../hooks/useImage";
import useForm from "../../../hooks/useForm";
import Modal from "../../shared/Modal";
import Loader from "../../shared/Loader";
import ButtonForm from "../../shared/ButtonForm";
import { AlergenoService } from "../../../services/DetailsBranch/AlergenoService";

interface ModalProps {
  dataToEdit: IAlergenos | null;
  closeModal: (state?: string) => void;
  setAlergenos: (updater: (state: IAlergenos[]) => IAlergenos[]) => void;
}

// ----------- Componente de Formulario Alergeno -----------
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

  const alergenoService = new AlergenoService("alergenos");
  // Manejo de imagen para cargar al servidor
  const { image, loading, handler, service } = useImage();

  const handlerSubmit = async () => {
    const voidValues = Object.keys(dataForm).some((item) => item.length === 0);
    let newData = dataForm.imagen.url;

    if (voidValues) {
      alert("Faltan campos por completar");
      return;
    }

    if (image) newData = await service();

    let resInfo = {
      ...dataForm,
      imagen: {
        name: dataForm.denominacion,
        url: newData,
      },
    };

    if (dataToEdit) {
      const editAlergeno = await alergenoService.put(`${dataForm.id}`, resInfo);
      if (editAlergeno) {
        setAlergenos((state: IAlergenos[]) =>
          state.map((item) =>
            item.id === editAlergeno.id ? editAlergeno : item
          )
        );
      }
    } else {
      const newAlergeno = await alergenoService.post("", resInfo);
      if (newAlergeno)
        setAlergenos((state: IAlergenos[]) => [...state, newAlergeno]);
    }
    closeModal();
  };

  useEffect(() => {
    if (dataToEdit) {
      if (dataToEdit.imagen === null) {
        setDataForm({
          ...dataToEdit,
          imagen: {
            name: "",
            url: "",
          },
        });
      } else {
        setDataForm(dataToEdit);
      }
    }
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
          <label htmlFor="file">
            Ingrese una imagen:{" "}
            {(dataForm.imagen.url || image) && <b>Tiene una imagen cargada</b>}
          </label>
          <label className={styles.customFileUpload}>
            <svg viewBox="0 -960 960 960">
              <path d="M440-440ZM120-120q-33 0-56.5-23.5T40-200v-480q0-33 23.5-56.5T120-760h126l74-80h240v80H355l-73 80H120v480h640v-360h80v360q0 33-23.5 56.5T760-120H120Zm640-560v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM440-260q75 0 127.5-52.5T620-440q0-75-52.5-127.5T440-620q-75 0-127.5 52.5T260-440q0 75 52.5 127.5T440-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Z" />
            </svg>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handler}
              accept="image/jpge, image/jpg"
            />
          </label>
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
