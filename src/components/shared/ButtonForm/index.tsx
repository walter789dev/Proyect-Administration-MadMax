import { FC } from "react";
import styles from "./ButtonForm.module.css";

interface ButtonProps {
  text: string;
  type: "confirm" | "cancel";
  event: () => void;
}
// --- Componente para manejar Eventos de Formularios --
const ButtonForm: FC<ButtonProps> = ({ text, type, event }) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[type]}`}
      onClick={event}
    >
      {text}
    </button>
  );
};

export default ButtonForm;
