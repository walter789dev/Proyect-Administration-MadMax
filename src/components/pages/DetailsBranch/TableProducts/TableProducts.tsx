import { FC, useEffect, useState } from "react";
import Button from "../../../ui/Button/Button";
import styles from "./TableProducts.module.css";
import { helpHttp } from "../../../../helpers/helpHttp";
import { IProductos } from "../../../../types/dtos/productos/IProductos";
import Product from "../Product/Product";
import FormProduct from "../FormProduct/FormProduct";
import ModalOptions from "../../../ui/ModalOptions/ModalOptions";
import useModals from "../../../../hooks/useModals";

interface TableProps {
  id: string | undefined;
}

const TableProducts: FC<TableProps> = ({ id }) => {
  const [products, setProducts] = useState<IProductos[] | []>([]);
  const {
    modalForm,
    //  modalInfo,
    //  dataToEdit,
    //  info,
    openForm,
    openView,
    //  resetForm,
  } = useModals<IProductos>();

  useEffect(() => {
    helpHttp<IProductos>()
      .getAll(`http://190.221.207.224:8090/articulos/porSucursal/${id}`)
      .then((res) => setProducts(res));
  }, []);
  return (
    <>
      <section className={styles.contenedor}>
        <header>
          <div className={styles.button}>
            <Button text="Producto" type="tertiary" openModal={openForm} />
          </div>
          <div className={styles.filter}>
            <h2>Filtrar Por Categoria: </h2>
            <select name="">
              <option value="">Selecione una categoria</option>
            </select>
          </div>
        </header>
        <ul className={styles.tables}>
          <li className={`${styles.firstRow} ${styles.element}`}>
            <p className={styles.column}>Nombre</p>
            <p className={styles.column}>Precio</p>
            <p className={styles.column}>Descripción</p>
            <p className={styles.column}>Categoria</p>
            <p className={styles.column}>Habilitado</p>
            <p className={styles.lastColumn}>Acciones</p>
          </li>
          {products.length ? (
            products.map((product, id) => (
              <Product key={id} product={product}>
                <ModalOptions
                  type="custom"
                  item={product}
                  view={openView}
                  edit={openForm}
                  del={() => {}}
                />
              </Product>
            ))
          ) : (
            <p>No hay productos</p>
          )}
        </ul>
      </section>
      {modalForm && <FormProduct />}
    </>
  );
};

export default TableProducts;
