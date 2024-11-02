import styles from "./ModalOption.module.css";
import { FC } from 'react'
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";

interface ModalProps {
  item: IAlergenos,
  enabled?: () => void
  edit: (state: IAlergenos) => void
  view: (state: IAlergenos) => void
  del: (id: number | undefined) => void
  addSubC?: () => void
}

export const ModalOption: FC<ModalProps> = ({item, enabled, edit, view, del, addSubC}) => {
  return (
    <>
      {/* Boton de Habilitado Producto */}
      {/* Revisar cuando hagamos la tabla productos */}
      {"precioVenta" in item && ( 
        <button className={styles.button} onClick={() => {}}>
          <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"/></svg>
        </button>
      )}
      {/* Boton de Ver información */}
      <button className={styles.button } onClick={() => view(item)}>
        <svg width="32" viewBox="0 0 576 512" fill="#0093e9">
          <path d="M288 144a110.9 110.9 0 0 0 -31.2 5 55.4 55.4 0 0 1 7.2 27 56 56 0 0 1 -56 56 55.4 55.4 0 0 1 -27-7.2A111.7 111.7 0 1 0 288 144zm284.5 97.4C518.3 135.6 410.9 64 288 64S57.7 135.6 3.5 241.4a32.4 32.4 0 0 0 0 29.2C57.7 376.4 165.1 448 288 448s230.3-71.6 284.5-177.4a32.4 32.4 0 0 0 0-29.2zM288 400c-98.7 0-189.1-55-237.9-144C98.9 167 189.3 112 288 112s189.1 55 237.9 144C477.1 345 386.7 400 288 400z" />
        </svg>
      </button>
      {/* Boton de Editar información */}
      <button className={styles.button} onClick={() => edit(item)}>
        <svg width="24" viewBox="0 0 512 512" fill="#1abc9c">
          <path d="M290.7 93.2l128 128-278 278-114.1 12.6C11.4 513.5-1.6 500.6 .1 485.3l12.7-114.2 277.9-277.9zm207.2-19.1l-60.1-60.1c-18.8-18.8-49.2-18.8-67.9 0l-56.6 56.6 128 128 56.6-56.6c18.8-18.8 18.8-49.2 0-67.9z" />
        </svg>
      </button>
      {/* Boton de borrar información */}
      <button className={styles.button} onClick={() => del(item.id)}>
        <svg viewBox="0 -960 960 960" width="30" fill="#d63031">
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
      </button>
      {/* Boton de Añadir subcategoria */}
      {/* Revisar cuando hagamos la tabla Categorias */}

      {"sucursales" in item && (
        <button className={styles.button} onClick={() => {}}>
          <svg
            width="20"
            viewBox="0 0 512 512"
            fill= "green"      >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
          </svg>
      </button>
      )}
    </>
  );
};
