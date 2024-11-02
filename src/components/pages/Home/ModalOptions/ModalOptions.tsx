import { useNavigate } from "react-router-dom";
import styles from "./ModalOptions.module.css";
import { useAppDispatch } from "../../../../hooks/redux";
import { setActiveBranch } from "../../../../redux/slices/BranchSlice";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";

interface OptionsProp<T> {
  size?: "sm" | "lg";
  item: T;
  edit: (data: T) => void;
  view: (data: T) => void;
}

// Maneja el modal de Vista, Editar de Empresa y Sucursal + Estilos
const ModalOptions = <T,>({
  size = "sm",
  item,
  edit,
  view,
}: OptionsProp<T>) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const color = size == "lg" ? "#fff" : "#246A73";
  const svgSize = size == "lg" ? ["30", "20", "0"] : ["25", "18", "15"];

  const activeBranch = () => {
    dispatch(setActiveBranch(item as ISucursal));
    navigate("/products");
  };

  return (
    <div className={styles.options}>
      {/* Boton de Ver información */}
      <button
        className={styles.button}
        onClick={(e) => {
          e.stopPropagation();
          view(item);
        }}
      >
        <svg width={svgSize[0]} viewBox="0 0 576 512" fill={color}>
          <path d="M288 144a110.9 110.9 0 0 0 -31.2 5 55.4 55.4 0 0 1 7.2 27 56 56 0 0 1 -56 56 55.4 55.4 0 0 1 -27-7.2A111.7 111.7 0 1 0 288 144zm284.5 97.4C518.3 135.6 410.9 64 288 64S57.7 135.6 3.5 241.4a32.4 32.4 0 0 0 0 29.2C57.7 376.4 165.1 448 288 448s230.3-71.6 284.5-177.4a32.4 32.4 0 0 0 0-29.2zM288 400c-98.7 0-189.1-55-237.9-144C98.9 167 189.3 112 288 112s189.1 55 237.9 144C477.1 345 386.7 400 288 400z" />
        </svg>
      </button>
      {/* Boton de Editar información */}
      <button
        className={styles.button}
        onClick={(e) => {
          e.stopPropagation();
          edit(item);
        }}
      >
        <svg width={svgSize[1]} viewBox="0 0 512 512" fill={color}>
          <path d="M290.7 93.2l128 128-278 278-114.1 12.6C11.4 513.5-1.6 500.6 .1 485.3l12.7-114.2 277.9-277.9zm207.2-19.1l-60.1-60.1c-18.8-18.8-49.2-18.8-67.9 0l-56.6 56.6 128 128 56.6-56.6c18.8-18.8 18.8-49.2 0-67.9z" />
        </svg>
      </button>
      {/* Boton de ¿Ver Productos de Sucursal? */}
      {size === "sm" && (
        <button className={styles.button} onClick={activeBranch}>
          <svg width={svgSize[2]} viewBox="0 0 384 512" fill={color}>
            <path d="M48 0C21.5 0 0 21.5 0 48L0 464c0 26.5 21.5 48 48 48l96 0 0-80c0-26.5 21.5-48 48-48s48 21.5 48 48l0 80 96 0c26.5 0 48-21.5 48-48l0-416c0-26.5-21.5-48-48-48L48 0zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm112-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM80 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM272 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ModalOptions;
