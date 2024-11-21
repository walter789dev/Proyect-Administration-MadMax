import { FC, useEffect, useState } from "react";
import styles from "./Category.module.css";
import { IUpdateCategoria } from "../../../types/dtos/categorias/IUpdateCategoria";
import { ICreateCategoria } from "../../../types/dtos/categorias/ICreateCategoria";
import CategoryOptions from "../CategoryOptions";
import { CategoriaService } from "../../../services/DetailsBranch/CategoriaService";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";
import { useAppSelector } from "../../../hooks/redux";

interface CategoryProps {
  id: number | null;
  active: boolean;
  category: ICreateCategoria;
  setType: (state: { type: "Padre" | "Hija"; id: number | null }) => void;
  openForm: (state?: IUpdateCategoria) => void;
}

// ---------- Componente Categoria -----------
const Category: FC<CategoryProps> = ({
  id,
  category,
  setType,
  openForm,
  active,
}) => {
  const [subCategories, setSubCategories] = useState<ICategorias[]>([]);
  const categoriaService = new CategoriaService("categorias");
  const idEmpresa = useAppSelector((state) => state.companyReducer.active?.id);
  const [open, setOpen] = useState<boolean>(false); // Maneja el icono Arrow top y bottom

  useEffect(() => {
    const getSubCategorias = async () => {
      if (open) {
        const subCategorias = await categoriaService.getAll(
          `allSubCategoriasPorCategoriaPadre/${category.id}/${id}`
        );
        setSubCategories(subCategorias as ICategorias[]);
      }
    };
    getSubCategorias();
  }, [open]);

  useEffect(() => setOpen(active), [active]);
  return (
    <details className={styles.row} open={open}>
      <summary
        className={styles.containerCategory}
        onClick={(e) => e.preventDefault()}
      >
        {category.denominacion.toLowerCase() || "No disponible"}
        <CategoryOptions
          change={open}
          setOpen={setOpen}
          edit={() => {
            setType({
              type: "Padre",
              id: null,
            });
            openForm(category as IUpdateCategoria);
          }}
          add={() => {
            setType({
              type: "Hija",
              id: category.id || null,
            });
            openForm();
          }}
        />
      </summary>
      <ul className={styles.content}>
        {open &&
          subCategories?.map((subCateg, i) => (
            <li key={i} className={styles.contentLi}>
              {subCateg.denominacion.toLowerCase() || "No disponible"}
              <button
                className={styles.button}
                onClick={() => {
                  setType({
                    type: "Hija",
                    id: category.id || null,
                  });
                  const { categoriaPadre, sucursales, ...finalSubcat } =
                    subCateg;
                  openForm({
                    ...finalSubcat,
                    idEmpresa: idEmpresa as number,
                    idCategoriaPadre: categoriaPadre?.id as number,
                    idSucursales: sucursales.map(
                      (sucursal) => sucursal.id
                    ) as number[],
                  });
                }}
              >
                <svg className={styles.second} viewBox="0 0 512 512">
                  <path d="M290.7 93.2l128 128-278 278-114.1 12.6C11.4 513.5-1.6 500.6 .1 485.3l12.7-114.2 277.9-277.9zm207.2-19.1l-60.1-60.1c-18.8-18.8-49.2-18.8-67.9 0l-56.6 56.6 128 128 56.6-56.6c18.8-18.8 18.8-49.2 0-67.9z" />
                </svg>
              </button>
            </li>
          ))}
      </ul>
    </details>
  );
};

export default Category;
