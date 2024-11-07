import { ChangeEvent, FC, useState, useEffect } from "react";
import styles from "./FormProduct.module.css";
import { IProductos } from "../../../types/dtos/productos/IProductos";
import { ICreateProducto } from "../../../types/dtos/productos/ICreateProducto";
import { IUpdateProducto } from "../../../types/dtos/productos/IUpdateProducto";
import { helpHttp } from "../../../helpers/helpHttp";
import Modal from "../../shared/Modal";
import ButtonForm from "../../shared/ButtonForm";

interface ModalProps {
  product: IProductos | null;
  closeModal: (state?: string) => void;
  setProductos: (updater: (state: IProductos[]) => IProductos[]) => void;
}

const initial: ICreateProducto = {
  denominacion: "",
  precioVenta: 0,
  descripcion: "string",
  habilitado: false,
  codigo: "",
  idCategoria: 0,
  idAlergenos: [],
  imagenes: [],
};

const FormProduct: FC<ModalProps> = ({ 
  product, 
  closeModal, 
  setProductos 
}) => {
  const [dataForm, setDataForm] = useState<ICreateProducto | IProductos> (
    product ? { ...product } : initial
  );

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataForm((data) => ({
      ...data,
      [name]: value,
    }));

  const handlerSubmit = () => {
    if (product) {
      helpHttp()
        .put<IUpdateProducto>(`articulos/update/${product.id}`, dataForm)
        .then(() => {
          setProductos((state: IProductos[]) => {
            const updated = state.map((item) =>
              item.id === product.id ? { ...item, ...dataForm } : item
            );
            return updated;
          });
          closeModal();
        });
    } else {
      helpHttp()
        .post<ICreateProducto>(`articulos`, dataForm)
        .then((newProduct) => {
          setProductos((state: IProductos[]) => [...state, newProduct]);
          closeModal();
        });
    }
  };

  useEffect(() => {
    if (product) setDataForm(product);
  }, [product]);

  return (
    <Modal>
      <section className={styles.modalSection}>
        <h2 className={styles.modalTitle}>
          {product ? "Editar" : "Añadir"} Producto
        </h2>
        <form className={styles.modalForm}>
          <input
            className={styles.modalInput}
            name="denominacion"
            type="text"
            placeholder="Ingresa denominacion"
            value={dataForm.denominacion}
            onChange={handlerChange}
          />
          <input
            className={styles.modalInput}
            name="precioventa"
            type="number"
            placeholder="Ingresa precio"
            value={dataForm.precioVenta}
            onChange={handlerChange}
          />
          <input
            className={styles.modalInput}
            name="descripcin"
            type="text"
            placeholder="Ingresa descripción"
            value={dataForm.descripcion}
            onChange={handlerChange}
          />
          
          <input
            className={styles.modalInput}
            name="codigo"
            type="text"
            placeholder="Ingresa código"
            value={dataForm.codigo}
            onChange={handlerChange}
          />


          <label htmlFor="file">Ingrese una imagen:</label>
          <input id="file" type="file" />
          <div className={styles.modalButtons}>
            <ButtonForm
              type="cancel"
              text="Cancelar"
              event={() => closeModal()}
            />
            <ButtonForm type="confirm" text="Confirmar" event={handlerSubmit} />
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default FormProduct;
