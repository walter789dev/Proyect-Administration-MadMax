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
// Muestra Información de la Empresa | Sucursal seleccionada
const ModalInfo: FC<ModalInfoProps> = ({ columns, info, setOpenModal }) => {
  return (
    <div className={styles.modal}>
      <section className={styles.modalSection}>
        <h2>{"empresa" in info ? "Sucursal" : "Empresa"}</h2>
        <div className={styles.modalInfo}>
          <div className={styles.modalImage}>
            <img src={info["logo"] as string} alt="Logo" />
          </div>
          <div className={styles.modal2}>
            {columns.map((key, id) => {
              if ("esCasaMatriz" in info) {
                switch (key) {
                  case "empresa":
                    return (
                      <p key={id} className={styles.modalText}>
                        <b>Empresa: </b> {info.empresa.nombre}
                      </p>
                    );
                  case "domicilio": {
                    const elm = info.domicilio;
                    return (
                      <p key={id} className={styles.modalText}>
                        <b>Domicilio: </b> Calle: {elm.calle}, n°
                        {elm.numero}, {elm.localidad.nombre},{" "}
                        {elm.localidad.provincia.nombre},{" "}
                        {elm.localidad.provincia.pais.nombre}
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
              } else {
                return (
                  <p key={key} className={styles.modalText}>
                    <b>{key}:</b> {info[key as keyof IEmpresa]}
                  </p>
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
