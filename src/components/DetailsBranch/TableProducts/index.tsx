import { FC, useEffect, useState } from "react";
import styles from "./TableProducts.module.css";
import { IProductos } from "../../../types/dtos/productos/IProductos";
import useModals from "../../../hooks/useModals";
import Button from "../../shared/Button";
import Product from "../Product";
import ModalOptions from "../../shared/ModalOptions";
import ModalInfo from "../../shared/ModalInfo";
import FormProduct from "../FormProduct";
import { ProductoService } from "../../../services/DetailsBranch/ProductoService";

interface TableProps {
  id: number | undefined;
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
  const [pages, setPages] = useState({
    page: 1,
    totalPage: 0,
    totalProducts: 0,
  });
  // Lista de productos filtrados por categorias
  const [filterProducts, setFilterProducts] = useState<IProductos[]>([]);
  const productoService = new ProductoService("articulos");

  // Eliminar Producto
  const deleteProducto = async (id: number) => {
    await productoService.delete(id);
    const filter = products.filter((item) => item.id !== id);
    setProducts(filter);

    setPages({
      page: 1,
      totalProducts: products.length,
      totalPage: Math.ceil(products.length / 7) || 1,
    });
    setFilterProducts(filter.slice(0, 7));
  };

  const paged = (res: IProductos[], index?: number) => {
    if (index && pages.page != index) {
      setFilterProducts(products.slice((index - 1) * 7, 7 * index));
      setPages({
        ...pages,
        page: index,
      });
    } else {
      setPages((data) => ({
        ...data,
        totalProducts: res.length,
        totalPage: Math.ceil(res.length / 7),
      }));
      setFilterProducts(res.slice(0, 7));
    }
  };

  useEffect(() => {
    const getProductos = async () => {
      const productos = await productoService.getAll(`porSucursal/${id}`);
      setProducts(productos as IProductos[]);
      if (pages.totalPage !== pages.page) paged(productos as IProductos[]);
    };
    getProductos();
  }, []);
  return (
    <>
      <section className={styles.contenedor}>
        <header>
          <div className={styles.button}>
            <Button text="Producto" type="tertiary" openModal={openForm} />
          </div>
          <div className={styles.filter}>
            <h3>Total de productos: {products.length}</h3>
            <ul className={styles.pagedProducts}>
              {filterProducts.length &&
                [...Array(pages.totalPage)].map((_, index) => {
                  const validate = pages.page === index + 1;
                  return (
                    <li
                      onClick={
                        !validate ? () => paged([], index + 1) : () => {}
                      }
                      className={`${styles.page} ${validate && styles.active}`}
                      key={index}
                    >
                      {index + 1}
                    </li>
                  );
                })}
            </ul>
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
            filterProducts.length ? (
              filterProducts.map((product, id) => (
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
          addFilter={paged}
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
