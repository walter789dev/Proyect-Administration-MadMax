import { FC, useEffect, useState } from "react";
import styles from "./TableCategories.module.css";
import { IUpdateCategoria } from "../../../types/dtos/categorias/IUpdateCategoria";
import Button from "../../shared/Button";
import Category from "../Category";
import useModals from "../../../hooks/useModals";
import FormCategory from "../FormCategory";
import { ICreateCategoria } from "../../../types/dtos/categorias/ICreateCategoria";
import { CategoriaService } from "../../../services/DetailsBranch/CategoriaService";

interface TableCategoriesProps {
  id: number | undefined;
}

interface Type {
  type: "Padre" | "Hija";
  id: number | null;
}

// ---------- Componente para listar Categorias -----------
const TableCategories: FC<TableCategoriesProps> = ({ id }) => {
  const [categorias, setCategorias] = useState<ICreateCategoria[]>([]);
  const { modalForm, dataToEdit, openForm, resetForm } =
    useModals<IUpdateCategoria>();

  const categoriaService = new CategoriaService(`categorias`);
  const [active, setActive] = useState(false);
  // Indica si se Crea/Edita Categoria Padre/Hija
  const [type, setType] = useState<Type>({
    type: "Padre",
    id: null,
  });

  useEffect(() => {
    const getCategorias = async () => {
      setCategorias(
        await categoriaService.getAll(`allCategoriasPorSucursal/${id}`)
      );
    };
    getCategorias();
  }, []);
  return (
    <>
      <section className={styles.contenedor}>
        <header>
          <div className={styles.button}>
            <Button
              text="Categoria"
              type="tertiary"
              openModal={() => {
                setType({
                  type: "Padre",
                  id: null,
                });
                openForm();
              }}
            />
          </div>
          <div className={styles.title}>
            <h2>Lista de Categorias: </h2>
          </div>
        </header>
        <ul className={styles.tables}>
          {categorias.length > 0 ? (
            categorias?.map((category) => (
              <Category
                key={category.id}
                active={active}
                id={id || null}
                category={category}
                setType={setType}
                openForm={openForm}
              />
            ))
          ) : (
            <h3 style={{ marginTop: "10px", textAlign: "center" }}>
              No hay categorias
            </h3>
          )}
        </ul>
      </section>
      {modalForm && (
        <FormCategory
          id={id}
          type={type}
          dataToEdit={dataToEdit}
          closeModal={resetForm}
          setActive={setActive}
          setCategorias={setCategorias}
        />
      )}
    </>
  );
};

export default TableCategories;
