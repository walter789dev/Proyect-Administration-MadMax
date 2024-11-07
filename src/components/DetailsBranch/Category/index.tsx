import { FC, ReactNode } from "react";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";
import styles from "./Category.module.css";

interface CategoryProps {
  category: ICategorias;
  children: ReactNode;
}

const Category: FC<CategoryProps> = ({ category, children }) => {
  return (
    <details className={styles.row}>
      <summary className={styles.containerCategory}>
        {category.denominacion}
        {children}
      </summary>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
        dolorem dignissimos voluptas? Harum ullam iure laborum repellendus enim
        veniam aliquam rerum explicabo ratione, sapiente inventore quidem odit
        atque accusantium debitis?
      </div>
    </details>
  );
};

export default Category;
