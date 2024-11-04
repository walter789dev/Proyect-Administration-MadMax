import { IProductos } from "../../../../types/dtos/productos/IProductos";
import styles from "./FormProduct.module.css";

interface ModalProps {
  product: IProductos;
}

const FormProduct = () => {
  return (
    <div className={styles.modal}>
      <section className={styles.modalSection}>
        <h2>Añadir Articulo</h2>
      </section>
    </div>
  );
};

export default FormProduct;
