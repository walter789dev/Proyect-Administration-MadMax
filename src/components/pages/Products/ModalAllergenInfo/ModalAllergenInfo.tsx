import styles from "./ModalAllergenInfo.module.css";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";
import { FC } from "react";
import ButtonForm from "../../../ui/ButtonForm/ButtonForm";

interface ModalInfoProps {
  allergen: IAlergenos;
  setOpenModal: (state: boolean) => void;
}

export const ModalAllergenInfo: FC<ModalInfoProps> = ({
 allergen, setOpenModal
}) => {

  return (
    <div className={styles.modal}>
      <section className={styles.modalSection}>
        <h2>Alergeno</h2>
        <div className={styles.modalInfo}>
          <div className={styles.modalImage}>
            <img src={allergen.imagen?.url} alt="imagen" />
          </div>
          <div className={styles.modalDatos}>
            <p><b>Nombre: </b> {allergen.denominacion}</p>
          </div>
          <ButtonForm
          text="Cerrar"
          type="cancel"
          event={() => setOpenModal(false)}
        />
        </div>
      </section>
    </div>
  );
};
