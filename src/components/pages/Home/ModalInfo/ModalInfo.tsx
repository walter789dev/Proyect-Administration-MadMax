import { FC } from "react";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import styles from "./ModalInfo.module.css";
import ButtonForm from "../../../ui/ButtonForm/ButtonForm";

interface ModalInfoProps {
  info: IEmpresa;
  type: "sucursal" | "empresa";
  setOpenModal: (state: boolean) => void;
}

interface ICampos {
  empresa: string[];
  sucursal: string[];
}

const ModalInfo: FC<ModalInfoProps> = ({ type, info, setOpenModal }) => {
  const campos: ICampos = {
    empresa: ["nombre", "razonSocial", "cuit"],
    sucursal: [],
  };

  return (
    <div className={styles.modal}>
      <section className={styles.modalSection}>
        <h2>Empresa: {info.nombre}</h2>
        <div className={styles.modalInfo}>
          <div className={styles.modalImage}>
            <img src={info.logo} alt="Logo" />
          </div>
          <div>
            {Object.keys(info).map((key, id) => {
              if (campos[type].includes(key)) {
                return (
                  <span className={styles.modalText} key={id}>
                    <b>{key}:</b> {info[key as keyof IEmpresa]}
                  </span>
                );
              }
            })}
          </div>
        </div>
        <ButtonForm
          text="Cerrar"
          type="cancel"
          event={() => setOpenModal(false)}
        />
      </section>
    </div>
  );
};

export default ModalInfo;
