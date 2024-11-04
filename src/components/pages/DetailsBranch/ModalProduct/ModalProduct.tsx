import { IProductos } from "../../../../types/dtos/productos/IProductos";
import styles from "./ModalProduct.module.css";

interface ModalProductProps {
  product: IProductos;
}

const ModalProduct = () => {
  return (
    <div className={styles.modal}>
      <section className={styles.modalSection}>
        <h2>Añadir Articulo</h2>
      </section>
    </div>
  );
};

export default ModalProduct;
