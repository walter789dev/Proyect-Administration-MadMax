import { FC } from "react";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import Modal from "../../../ui/Modal/Modal";
import styles from "./ViewBranch.module.css";
import ButtonForm from "../../../ui/ButtonForm/ButtonForm";

interface ModalInfoProps {
  info: ISucursal;
  columns: string[];
  setOpenModal: (state?: string) => void;
}

const ViewBranch: FC<ModalInfoProps> = ({ info, columns, setOpenModal }) => {
  return (
    <Modal>
      <section className={styles.modalSection}>
        <h2>Sucursal</h2>
        <div className={styles.modalInfo}>
          <div className={styles.modalImage}>
            <img src={info.logo} alt="Logo" />
          </div>
          <div className={styles.modal2}>
            {columns.map((key, id) => {
              switch (key) {
                case "empresa":
                  return (
                    <p key={id} className={styles.modalText}>
                      <b>Empresa: </b> {info.empresa?.nombre}
                    </p>
                  );
                case "domicilio": {
                  const elm = info.domicilio;
                  return (
                    <p key={id} className={styles.modalText}>
                      <b>Domicilio: </b> Calle: {elm.calle}, n°
                      {elm.numero}, {elm.localidad?.nombre},{" "}
                      {elm.localidad?.provincia.nombre},{" "}
                      {elm.localidad?.provincia.pais.nombre}
                    </p>
                  );
                }
                case "esCasaMatriz":
                  return (
                    <p key={key} className={styles.modalText}>
                      <b>{key}:</b> {info[key] ? "Si" : "No"}
                    </p>
                  );
                case "nombre":
                case "horarioApertura":
                case "horarioCierre":
                  return (
                    <p key={key} className={styles.modalText}>
                      <b>{key}:</b> {info[key]}
                    </p>
                  );
              }
            })}
          </div>
        </div>
        <ButtonForm
          text="Cerrar"
          type="cancel"
          event={() => setOpenModal("info")}
        />
      </section>
    </Modal>
  );
};

export default ViewBranch;
