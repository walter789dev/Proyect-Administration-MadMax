import { FC } from "react";
import styles from "./buttonForm.module.css";

interface ButtonProps {
  type: "confirm" | "cancel";
}

const ButtonForm: FC<ButtonProps> = ({ type }) => {
  return (
    <button className={`${styles.button} ${styles[type]}`}>
      {type === "confirm" ? "Confirmar" : "Cancelar"}
    </button>
  );
};

export default ButtonForm;
