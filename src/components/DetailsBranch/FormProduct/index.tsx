import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./FormProduct.module.css";
import { IProductos } from "../../../types/dtos/productos/IProductos";
import { ICreateProducto } from "../../../types/dtos/productos/ICreateProducto";
import { IUpdateProducto } from "../../../types/dtos/productos/IUpdateProducto";
import { helpHttp } from "../../../helpers/helpHttp";
import Modal from "../../shared/Modal";
import ButtonForm from "../../shared/ButtonForm";
import useForm from "../../../hooks/useForm";
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";
import { ICreateCategoria } from "../../../types/dtos/categorias/ICreateCategoria";
import { IImagen } from "../../../types/IImagen";
import useImage from "../../../hooks/useImage";
import Loader from "../../shared/Loader";

interface FormProductProps {
  id: number | undefined;
  product: IProductos | null;
  closeModal: (state?: string) => void;
  setProductos: (updater: (state: IProductos[]) => IProductos[]) => void;
}

interface SelectProps {
  categories: ICreateCategoria[];
  alergenos: IAlergenos[];
}

const FormProduct: FC<FormProductProps> = ({
  id,
  product,
  closeModal,
  setProductos,
}) => {
  const { dataForm, setDataForm, handlerChange, handlerCheck } = useForm<
    ICreateProducto | IUpdateProducto
  >({
    denominacion: "",
    precioVenta: 0,
    descripcion: "",
    habilitado: false,
    codigo: "",
    imagenes: [],
    idCategoria: 0,
    idAlergenos: [0],
  });

  const [select, setSelect] = useState<SelectProps>();
  const { image, loading, handler, setLoading, service } = useImage();
  const { getAll, post, put } = helpHttp();

  const handlerAlergeno = (e: ChangeEvent<HTMLSelectElement>) => {
    setDataForm({
      ...dataForm,
      idAlergenos: [Number(e.target.value)],
    });
  };

  const handlerSubmit = async () => {
    setLoading(true);

    if (product) {
      let newImage = dataForm.imagenes[0];

      if (image) {
        newImage = {
          name: dataForm.denominacion,
          url: await service(),
        };
      }

      const res = await put<IUpdateProducto>(`articulos/update/${product.id}`, {
        ...dataForm,
        imagenes: [newImage],
      });

      if (res) {
        setProductos((state: IProductos[]) => {
          const updated = state.filter((item) => item.id !== res.id);
          return [...updated, res] as IProductos[];
        });
      }
    } else {
      if (!image) {
        alert("No ha cargado una imagen");
        return;
      }

      const imagenServer = await service();
      const imagen: IImagen = {
        name: dataForm.denominacion,
        url: imagenServer,
      };

      const res = await post<ICreateProducto>(`articulos/create`, {
        ...dataForm,
        imagenes: [imagen],
      });

      if (res)
        setProductos((state: IProductos[]) => [...state, res] as IProductos[]);
    }
    closeModal();
  };

  useEffect(() => {
    if (product) {
      const idAlergenos = product.alergenos.map((alergen) =>
        Number(alergen.id)
      );
      setDataForm({
        ...product,
        idCategoria: product.categoria.id,
        idAlergenos,
      });
    }
  }, [product]);

  useEffect(() => {
    Promise.all([
      getAll<IAlergenos>("alergenos"),
      getAll<ICreateCategoria>(`categorias/allCategoriasPorSucursal/${id}`),
    ]).then((res) =>
      setSelect({
        alergenos: res[0],
        categories: res[1],
      })
    );
  }, []);

  return (
    <Modal>
      <section className={styles.modalContent}>
        <h2 className={styles.modalTitle}>
          {product ? "Editar" : "Añadir"} Producto
        </h2>
        <form className={styles.modalForm}>
          <div className={styles.first}>
            <label>Ingrese denominacion: </label>
            <input
              className={styles.formGroup}
              name="denominacion"
              type="text"
              placeholder="Ej: Bife"
              value={dataForm.denominacion}
              onChange={handlerChange}
            />
            <label>Ingrese precio de venta: </label>
            <input
              className={styles.formGroup}
              name="precioVenta"
              type="number"
              placeholder="Ingresa precio"
              value={dataForm.precioVenta}
              onChange={handlerChange}
            />
            <label>Ingrese descripción: </label>
            <input
              className={styles.formGroup}
              name="descripcion"
              type="text"
              placeholder="Ingresa descripción"
              value={dataForm.descripcion}
              onChange={handlerChange}
            />
            <label>Ingrese código: </label>
            <input
              className={styles.modalInput}
              name="codigo"
              type="text"
              placeholder="Ingresa código"
              value={dataForm.codigo}
              onChange={handlerChange}
            />
          </div>
          <div className={styles.second}>
            <div className={styles.formGroup}>
              <label>Seleccione alergeno: </label>
              <select
                name="idAlergenos"
                value={dataForm.idAlergenos[0]}
                onChange={handlerAlergeno}
              >
                <option value="">Seleccione...</option>
                {select?.alergenos.map((alergen, id) => (
                  <option key={id} value={alergen.id}>
                    {alergen.denominacion}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Seleccione categoria: </label>
              <select
                name="idCategoria"
                value={dataForm.idCategoria}
                onChange={handlerChange}
              >
                <option value="">Seleccione...</option>
                {select?.categories.map((categ, id) => (
                  <option key={id} value={categ.id}>
                    {categ.denominacion}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="image">
                Elija una imagen:{" "}
                {(dataForm.imagenes[0] || image) && (
                  <b>Tiene una imagen cargada</b>
                )}
              </label>
              <label className={styles.customFileUpload}>
                <input type="file" id="image" name="image" onChange={handler} />
              </label>
            </div>
            <label>
              <input
                type="checkbox"
                name="habilitado"
                checked={dataForm.habilitado}
                onChange={handlerCheck}
              />
              Habilitado
            </label>
          </div>
          <div>
            <div className={styles.modalButtons}>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <ButtonForm
                    type="cancel"
                    text="Cancelar"
                    event={() => closeModal()}
                  />
                  <ButtonForm
                    type="confirm"
                    text="Confirmar"
                    event={handlerSubmit}
                  />
                </>
              )}
            </div>
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default FormProduct;
