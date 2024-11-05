import { FC } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  type: "primary" | "secondary" | "tertiary";
  openModal: () => void;
}
// --- Componente para abrir el Modal correspondiente --
const Button: FC<ButtonProps> = ({ text, type, openModal }) => {
  return (
    <button
      className={`${styles.button} ${styles[type]}`}
      onClick={() => openModal()}
    >
      <svg width="20" viewBox="0 0 512 512">
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
      </svg>
      Añadir {text}
    </button>
  );
};

export default Button;
