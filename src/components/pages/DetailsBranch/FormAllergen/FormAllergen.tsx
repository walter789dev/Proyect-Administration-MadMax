import styles from "./FormAllergen.module.css";
import ButtonForm from "../../../ui/ButtonForm/ButtonForm";
import { FC, useState, ChangeEvent, useEffect } from "react";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";
import { helpHttp } from "../../../../helpers/helpHttp";
import Modal from "../../../ui/Modal/Modal";
import Loader from "../../../ui/Loader/Loader";
import { ICreateAlergeno } from "../../../../types/dtos/alergenos/ICreateAlergeno";
import { IUpdateAlergeno } from "../../../../types/dtos/alergenos/IUpdateAlergeno";

interface ModalProps {
  dataToEdit: IAlergenos | null;
  closeModal: (state?: string) => void;
  setAlergenos: (updater: (state: IAlergenos[]) => IAlergenos[]) => void;
}

const initial: ICreateAlergeno = {
  denominacion: "",
  imagen: {
    name: "",
    url: "",
  },
};

// ------------ Añadir - Editar Alergeno --------------
const FormAllergen: FC<ModalProps> = ({
  dataToEdit,
  closeModal,
  setAlergenos,
}) => {
  const [fileImage, setFileImage] = useState<FormData>();
  const [loading, setLoading] = useState(false);
  const [alergeno, setAlergeno] = useState(initial);

  const handlerImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("uploads", e.target.files[0]);
      setFileImage(formData);
    }
  };

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAlergeno((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handlerSubmit = async () => {
    setLoading(true);

    const voidValues = Object.keys(alergeno).some((item) => item.length === 0);

    if (voidValues || !fileImage) {
      setLoading(false);
      alert("Faltan campos por completar");
      return;
    }

    const resImage = await fetch(`http://190.221.207.224:8090/images/uploads`, {
      method: "POST",
      body: fileImage,
    });

    const newData = await resImage.text();
    let resInfo = { ...alergeno, logo: newData };

    if (dataToEdit) {
      const res = await helpHttp<IUpdateAlergeno>().put(
        `alergenos/${alergeno.id}`,
        resInfo
      );
      if (res) {
        setAlergenos((state: IAlergenos[]) => {
          const filter = state.filter((item) => item.id != alergeno.id);
          return [...filter, resInfo];
        });
        closeModal();
      }
    } else {
      const res = await helpHttp<ICreateAlergeno>().post(`alergenos`, resInfo);
      if (res) {
        setAlergenos((state: IAlergenos[]) => [...state, resInfo]);
        closeModal();
      }
    }
  };

  useEffect(() => {
    if (dataToEdit) setAlergeno(dataToEdit);
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
            value={alergeno.denominacion}
            onChange={handlerChange}
          />
          <label htmlFor="file">Ingrese una imagen:</label>
          <input id="file" type="file" onChange={handlerImage} />
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
