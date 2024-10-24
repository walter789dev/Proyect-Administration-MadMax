import ButtonForm from "../../../ui/ButtonForm/ButtonForm";
import styles from "./ModalForm.module.css";
import closeImage from "../../../../assets/svg/close.svg";
import InputForm from "../../../ui/InputForm/InputForm";
import { FC } from "react";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";

interface ModalProps {
  editCompany: IEmpresa | null;
  setEditCompany: (state: IEmpresa | null) => void;
  closeModal: (state: boolean) => void;
}

// Props: editCompany -> Empresa a Actualizar
const ModalForm: FC<ModalProps> = ({
  editCompany,
  setEditCompany,
  closeModal,
}) => {
  // Campos a llenar por Usuario
  const fields = [
    ["Nombre", "text"],
    ["Razon social", "text"],
    ["Ciut", "number"],
  ];

  // Elimina la Empresa a Editar del Modal
  const resetForm = () => {
    if (editCompany) setEditCompany(null);
    closeModal(false);
  };

  return (
    <div className={styles.modal}>
      <section className={styles.modalSection}>
        <h2>{editCompany ? "Editar" : "Añadir"} Empresa</h2>
        <form className={styles.modalForm}>
          {fields.map((item, i) => (
            <InputForm key={i} type={item[1]} text={item[0]} />
          ))}
          <label className={styles.modalLabel} htmlFor="image">
            Ingrese Logo:
          </label>
          <input id="image" type="file" accept="image/jpge, image/jpg" />
          {/* Cancelar y Enviar/Actualizar Empresa en BBDD */}
          <div className={styles.modalButtons}>
            <ButtonForm type="cancel" event={resetForm} />
            <ButtonForm type="confirm" event={closeModal} />
          </div>
        </form>
        {/* Icono de Cerrar Modal*/}
        <img
          className={styles.modalClose}
          src={closeImage}
          alt="Cerrar Modal"
          onClick={resetForm}
        />
      </section>
    </div>
  );
};

export default ModalForm;
