import styles from "./ModalInfo.module.css";
import ButtonForm from "../ButtonForm";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { FC } from "react";
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";
import Modal from "../Modal";
import { IProductos } from "../../../types/dtos/productos/IProductos";

interface ModalInfoProps {
  title: string;
  info: IEmpresa | IAlergenos | IProductos;
  columns: string[];
  setOpenModal: (state?: string) => void;
}

// Muestra Información de la Empresa | Sucursal seleccionada
const ModalInfo: FC<ModalInfoProps> = ({
  title,
  columns,
  info,
  setOpenModal,
}) => {
  const validateImage = () => {
    if ("imagen" in info) {
      return info.imagen ? info.imagen?.url : "";
    }
    if ("imagenes" in info) {
      return info.imagenes.length ? info.imagenes[0].url : "";
    }
    return info.logo || "";
  };
  return (
    <Modal>
      <section className={styles.modalSection}>
        <h2>{title}</h2>
        <div className={styles.modalInfo}>
          <div className={styles.modalImage}>
            <img src={validateImage()} alt="Logo" />
          </div>
          <div className={styles.modal2}>
            {columns.map((key) => {
              if ("categoria" in info && key === "categoria") {
                return (
                  <p key={key} className={styles.modalText}>
                    <b>{key}:</b> {info.categoria["denominacion"]}
                  </p>
                );
              }
              if ("habilitado" in info && key === "habilitado") {
                <p key={key} className={styles.modalText}>
                  <b>{key}: </b> {info.habilitado ? "Si" : "No"}
                </p>;
              }

              if ("alergenos" in info && key === "alergenos") {
                return (
                  <p key={key} className={styles.modalText}>
                    <b>Alergenos: </b>{" "}
                    {info.alergenos.length > 0
                      ? info.alergenos
                          .map((element) => element.denominacion)
                          .join(", ")
                      : "No tiene"}
                  </p>
                );
              }
              return (
                <p key={key} className={styles.modalText}>
                  <b>{key}:</b>{" "}
                  {info[key as keyof (IEmpresa | IAlergenos | IProductos)]}
                </p>
              );
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

export default ModalInfo;
