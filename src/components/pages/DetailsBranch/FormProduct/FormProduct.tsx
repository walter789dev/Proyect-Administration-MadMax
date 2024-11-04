import { IProductos } from "../../../../types/dtos/productos/IProductos";
import Modal from "../../../ui/Modal/Modal";
import styles from "./FormProduct.module.css";

interface ModalProps {
  product: IProductos;
}

const FormProduct = () => {
  return (
    <Modal>
      <section className={styles.modalSection}>
        <h2>Añadir Articulo</h2>
      </section>
    </Modal>
  );
};

export default FormProduct;
