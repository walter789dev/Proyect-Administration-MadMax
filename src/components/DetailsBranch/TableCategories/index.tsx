import { FC, useEffect, useState } from "react";
import styles from "./TableCategories.module.css";
import { IUpdateCategoria } from "../../../types/dtos/categorias/IUpdateCategoria";
import { helpHttp } from "../../../helpers/helpHttp";
import Button from "../../shared/Button";
import Category from "../Category";
import useModals from "../../../hooks/useModals";
import FormCategory from "../FormCategory";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";

interface TableCategoriesProps {
  id: string | undefined;
}

const TableCategories: FC<TableCategoriesProps> = ({ id }) => {
  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  const { modalForm, dataToEdit, openForm, resetForm } =
    useModals<IUpdateCategoria>();

  useEffect(() => {
    helpHttp()
      .getAll<ICategorias>(`categorias/allCategoriasPorSucursal/${id}`)
      .then((res) => setCategorias(res));
  }, []);
  return (
    <>
      <section className={styles.contenedor}>
        <header>
          <div className={styles.button}>
            <Button text="Categoria" type="tertiary" openModal={openForm} />
          </div>
          <div className={styles.title}>
            <h2>Lista de Categorias: </h2>
          </div>
        </header>
        <ul className={styles.tables}>
          {categorias?.map((category) => (
            <Category key={category.id} id={id} category={category} />
          ))}
        </ul>
      </section>
      {modalForm && (
        <FormCategory
          id={id}
          type="Padre"
          dataToEdit={dataToEdit}
          closeModal={resetForm}
          setCategorias={setCategorias}
        />
      )}
    </>
  );
};

export default TableCategories;
