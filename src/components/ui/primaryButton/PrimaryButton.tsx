import { FC } from "react";
import styles from "./primaryButton.module.css";

interface ButtonProps {
  text: string;
  type: "primary" | "secondary" | "disabled";
}

const PrimaryButton: FC<ButtonProps> = ({ text, type }) => {
  const colors = {
    primary: "#fff",
    secondary: "#368f8b",
    disabled: "#879796",
  };

  return (
    <button className={`${styles.button} ${styles[type]}`}>
      {/* Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        viewBox="0 0 512 512"
        fill={colors[type]}
      >
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
      </svg>
      Añadir {text}
    </button>
  );
};

export default PrimaryButton;
