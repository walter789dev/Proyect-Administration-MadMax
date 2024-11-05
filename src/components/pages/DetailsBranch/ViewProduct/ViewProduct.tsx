import { IProductos } from "../../../../types/dtos/productos/IProductos";
import { FC } from "react";
import styles from "./ViewProduct.module.css";
import ButtonForm from "../../../ui/ButtonForm/ButtonForm";

interface ModalInfo {
  info: IProductos;
  setOpenModal: (state?: string) => void;
}

export const ViewProduct: FC<ModalInfo> = ({ info, setOpenModal }) => {
  return (
    <div className={styles.modal}>
      <section className={styles.modalSection}>
        <h2>{"denominacion" in info ? "Producto" : ""}</h2>
        <div className={styles.modalInfo}>
          <div className={styles.modalImage}>
            <img
              src={"imagenes" in info ? info.imagenes[0].url : "No"}
              alt="Logo"
            />
          </div>

          <div className={styles.modalInfo2}>
            <p className={styles.modalText}>
              <b>Producto: </b> {info.denominacion}
            </p>
            <p className={styles.modalText}>
              <b>Precio: </b> $ {info.precioVenta}
            </p>
            <p className={styles.modalText}>
              <b>Descripción: </b> {info.descripcion}
            </p>
            <p className={styles.modalText}>
              <b>categorías: </b> {info.categoria["denominacion"]}
            </p>
            <p className={styles.modalText}>
              <b>Habilitado: </b> {info.habilitado ? "Si" : "No"}
            </p>
            <p className={styles.modalText}>
              <b>Alergenos: </b>{" "}
              {info.alergenos.length > 0
                ? info.alergenos
                    .map((element) => element.denominacion)
                    .join(", ")
                : "No tiene"}
            </p>
            <p className={styles.modalText}>
              <b>Código: </b> {info.codigo}
            </p>
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
