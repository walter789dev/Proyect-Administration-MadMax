import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./TableProducts.module.css";
import { IProductos } from "../../../types/dtos/productos/IProductos";
import useModals from "../../../hooks/useModals";
import { helpHttp } from "../../../helpers/helpHttp";
import Button from "../../shared/Button";
import Product from "../Product";
import ModalOptions from "../../shared/ModalOptions";
import ModalInfo from "../../shared/ModalInfo";
import FormProduct from "../FormProduct";

interface TableProps {
  id: number | undefined;
}

interface FilterProducts {
  products: IProductos[];
  categories: string[];
}

// ------------ Componente oara Listar Productos -----------
const TableProducts: FC<TableProps> = ({ id }) => {
  const {
    modalForm,
    modalInfo,
    dataToEdit,
    info,
    openForm,
    openView,
    resetForm,
  } = useModals<IProductos>();
  const [products, setProducts] = useState<IProductos[]>([]);
  // Lista de productos filtrados por categorias
  const [filterProducts, setFilterProducts] = useState<FilterProducts>();
  const { getAll, del } = helpHttp(); // Metodos HTTP

  // Maneja la lista de productos de acuerdo al filtro aplicado
  const handlerChangeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    let filter = [] as IProductos[];
    if (e.target.value.length > 0) {
      filter = products.filter(
        (product) => product.categoria.denominacion === e.target.value
      );
    }
    setFilterProducts((state) => ({
      categories: state?.categories as string[],
      products: filter,
    }));
  };
  // Eliminar Producto
  const deleteProducto = (id: number | undefined) => {
    del<IProductos>(`articulos/${id}`).then(() =>
      setProducts(products.filter((item) => item.id !== id))
    );
  };

  useEffect(() => {
    getAll<IProductos>(`articulos/porSucursal/${id}`).then((res) => {
      setProducts(res);
      // Asigno los productos y las categorias para filtrar productos
      setFilterProducts({
        products: [],
        categories: Array.from(
          new Set(res.map((item) => item.categoria.denominacion))
        ),
      });
    });
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
            <select onChange={handlerChangeFilter}>
              <option value="">TODAS</option>
              {filterProducts?.categories.map((categ) => (
                <option key={categ} value={categ}>
                  {categ}
                </option>
              ))}
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
            filterProducts?.products.length ? (
              filterProducts.products.map((product, id) => (
                <Product key={id} product={product}>
                  <ModalOptions
                    type="custom"
                    item={product}
                    view={openView}
                    edit={openForm}
                    del={deleteProducto}
                  />
                </Product>
              ))
            ) : (
              products.map((product, id) => (
                <Product key={id} product={product}>
                  <ModalOptions
                    type="custom"
                    item={product}
                    view={openView}
                    edit={openForm}
                    del={deleteProducto}
                  />
                </Product>
              ))
            )
          ) : (
            <p className={styles.notFound}>No hay productos cargados</p>
          )}
        </ul>
      </section>
      {modalForm && (
        <FormProduct
          id={id}
          product={dataToEdit}
          closeModal={resetForm}
          setProductos={setProducts}
        />
      )}
      {modalInfo && info && (
        <ModalInfo
          title="Producto"
          columns={[
            "denominacion",
            "precioVenta",
            "descripcion",
            "categoria",
            "habilitado",
            "alergenos",
            "codigo",
          ]}
          info={info}
          setOpenModal={resetForm}
        />
      )}
    </>
  );
};

export default TableProducts;
