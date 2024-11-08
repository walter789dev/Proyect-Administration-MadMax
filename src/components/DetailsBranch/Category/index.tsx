import { FC, useEffect, useState } from "react";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";
import styles from "./Category.module.css";
import { helpHttp } from "../../../helpers/helpHttp";
import CategoryOptions from "../CategoryOptions";

interface CategoryProps {
  id: string | undefined;
  category: ICategorias;
}

const Category: FC<CategoryProps> = ({ id, category }) => {
  const [changeIcon, setChangeIcon] = useState(true);
  const [subCategories, setSubCategories] = useState<ICategorias[]>([]);

  useEffect(() => {
    helpHttp()
      .getAll(
        `categorias/allSubCategoriasPorCategoriaPadre/${category.id}/${id}`
      )
      .then((res) => setSubCategories(res as ICategorias[]));
  }, []);
  return (
    <details
      className={styles.row}
      onToggle={() => setChangeIcon((state) => !state)}
    >
      <summary className={styles.containerCategory}>
        {category.denominacion}
        <CategoryOptions change={changeIcon} />
      </summary>
      <ul className={styles.content}>
        {subCategories?.map((subCateg, i) => (
          <li key={i} className={styles.contentLi}>
            {subCateg.denominacion}
            <button className={styles.button}>
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
