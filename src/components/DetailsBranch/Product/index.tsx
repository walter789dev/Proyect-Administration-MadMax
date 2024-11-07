import { FC, ReactNode } from "react";
import styles from "./Product.module.css";
import { IProductos } from "../../../types/dtos/productos/IProductos";

interface ProductProps {
  product: IProductos;
  children: ReactNode;
}

const Product: FC<ProductProps> = ({ product, children }) => {
  return (
    <li className={styles.element}>
      <p className={styles.firstColumn}>{product.denominacion.toLowerCase()}</p>
      <p className={styles.column}>${product.precioVenta}</p>
      <p className={styles.column}>
        {product.descripcion || "No hay descripción"}
      </p>
      <p className={styles.column}>
        {product.categoria.denominacion.toLowerCase()}
      </p>
      <p className={styles.column}>
        <button className={styles.button}>
          <svg
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill={product.habilitado ? "green" : "red"}
          >
            <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" />
          </svg>
        </button>
      </p>
      <div className={styles.lastColumn}>{children}</div>
    </li>
  );
};

export default Product;
