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
            {columns.map((key, id) => {
              if ("empresa" in info) {
                switch (key) {
                  case "empresa":
                    return (
                      <p key={id}>
                        <b>Empresa: </b> {info.empresa.nombre}
                      </p>
                    );
                  case "direccion":
                    return (
                      <p key={id}>
                        <b>Domicilio: </b> Calle: {info.domicilio.calle}, n°
                        {info.domicilio.numero},
                        {info.domicilio.localidad.nombre},
                        {info.domicilio.localidad.provincia.nombre},
                        {info.domicilio.localidad.provincia.pais.nombre}
                      </p>
                    );
                  default:
                    return (
                      <p key={key} className={styles.modalText}>
                        <b>{key}:</b> {info[key as keyof ISucursal]}
                      </p>
                    );
                }
              } else {
                return columns.map((key) => (
                  <p key={key} className={styles.modalText}>
                    <b>{key}:</b> {info[key as keyof IEmpresa]}
                  </p>
                ));
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
