import { FC } from "react";
import styles from "./CategoryOptions.module.css";

interface CategoryOptProps {
  change: boolean;
  edit: () => void;
  add: () => void;
  setOpen: (state: boolean) => void;
}

// ------- Componente de Opciones para Categoria (Añadir, editar, Abrir/Cerrar)-----------
const CategoryOptions: FC<CategoryOptProps> = ({
  change,
  edit,
  add,
  setOpen,
}) => {
  return (
    <div className={styles.buttons}>
      {change ? (
        <button className={styles.button} onClick={() => setOpen(false)}>
          <svg className={styles.first} viewBox="0 -960 960 960">
            <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
          </svg>
        </button>
      ) : (
        <button className={styles.button} onClick={() => setOpen(true)}>
          <svg className={styles.first} viewBox="0 -960 960 960">
            <path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" />
          </svg>
        </button>
      )}
      <button className={styles.button} onClick={edit}>
        <svg className={styles.second} viewBox="0 0 512 512">
          <path d="M290.7 93.2l128 128-278 278-114.1 12.6C11.4 513.5-1.6 500.6 .1 485.3l12.7-114.2 277.9-277.9zm207.2-19.1l-60.1-60.1c-18.8-18.8-49.2-18.8-67.9 0l-56.6 56.6 128 128 56.6-56.6c18.8-18.8 18.8-49.2 0-67.9z" />
        </svg>
      </button>
      <button className={styles.button} onClick={add}>
        <svg className={styles.third} viewBox="0 -960 960 960">
          <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
        </svg>
      </button>
    </div>
  );
};

export default CategoryOptions;
