import { FC } from "react";
import styles from "./buttonForm.module.css";

interface ButtonProps {
  text: string;
  type: "confirm" | "cancel";
  event: () => void;
}

// Props: event -> Evento a realizar por el Button
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
