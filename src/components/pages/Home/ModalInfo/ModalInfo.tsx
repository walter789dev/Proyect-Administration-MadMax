import styles from "./ModalInfo.module.css";
import ButtonForm from "../../../ui/ButtonForm/ButtonForm";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import { FC } from "react";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";

interface ModalInfoProps {
  info: IEmpresa | ISucursal;
  columns: string[];
  setOpenModal: (state: boolean) => void;
}

const ModalInfo: FC<ModalInfoProps> = ({ columns, info, setOpenModal }) => {
  return (
    <div className={styles.modal}>
      <section className={styles.modalSection}>
        <h2>Empresa</h2>
        <div className={styles.modalInfo}>
          <div className={styles.modalImage}>
            {"logo" in info && <img src={info["logo"] as string} alt="Logo" />}
          </div>
          <div>
            {Object.keys(info).map((key, id) => {
              if (columns.includes(key)) {
                return (
                  <span className={styles.modalText} key={id}>
                    <b>{key}:</b> {info[key as keyof (IEmpresa | ISucursal)]}
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
