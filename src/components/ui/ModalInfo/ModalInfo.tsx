import styles from "./ModalInfo.module.css";
import ButtonForm from "../ButtonForm/ButtonForm";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { FC } from "react";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";

interface ModalInfoProps {
   title: string
  info: IEmpresa | ISucursal | IAlergenos;
  columns: string[];
  setOpenModal: (state?: string) => void;
}

// Muestra Información de la Empresa | Sucursal seleccionada
const ModalInfo: FC<ModalInfoProps> = ({ title, columns, info, setOpenModal }) => {
  return (
    <div className={styles.modal}>
      <section className={styles.modalSection}>
        <h2>{title}</h2>
        <div className={styles.modalInfo}>
          <div className={styles.modalImage}>
            <img
              src={"imagen" in info ? info.imagen?.url : info["logo"]}
              alt="Logo"
            />
          </div>
          <div className={styles.modal2}>
            {columns.map((key, id) => {
              if ("esCasaMatriz" in info) {
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
              } else {
                return (
                  <p key={key} className={styles.modalText}>
                    <b>{key}:</b> {info[key as keyof (IEmpresa | IAlergenos)]}
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
    </div>
  );
};

export default ModalInfo;
