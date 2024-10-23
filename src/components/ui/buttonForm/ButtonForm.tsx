import { FC } from "react";
import styles from "./buttonForm.module.css";

interface ButtonProps {
  type: "confirm" | "cancel";
  event: (state: boolean) => void;
}

const ButtonForm: FC<ButtonProps> = ({ type, event }) => {
  return (
    <button
      className={`${styles.button} ${styles[type]}`}
      onClick={() => event(false)}
    >
      {type === "confirm" ? "Confirmar" : "Cancelar"}
    </button>
  );
};

export default ButtonForm;
