import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";
import { helpHttp } from "../../../helpers/helpHttp";
import Button from "../../shared/Button";

interface TableCategoriesProps {
  id: string | undefined;
}

const TableCategories: FC<TableCategoriesProps> = ({ id }) => {
  const [categorias, setCategorias] = useState<ICategorias[]>();

  useEffect(() => {
    helpHttp()
      .getAll(`categorias/allCategoriasPorSucursal/${id}`)
      .then((res) => setCategorias(res as ICategorias[]));
  }, []);
  return (
    <>
      <section className={styles.contenedor}>
        <header>
          <div className={styles.button}>
            <Button text="Categoria" type="tertiary" openModal={() => {}} />
          </div>
          <div className={styles.title}>
            <h2>Lista de Categorias: </h2>
          </div>
        </header>
        <ul className={styles.tables}>
          {categorias?.map((category) => (
            <li key={category.id}>{category.denominacion}</li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default TableCategories;
