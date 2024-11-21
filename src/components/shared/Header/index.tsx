import { FC } from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title?: string | undefined;
  type?: "sucursal";
}
// ------- Header con el titulo de la página + estilos ----------
const Header: FC<HeaderProps> = ({ title, type }) => {
  const navigate = useNavigate();

  return (
    <header className={`${styles.header} ${styles.primary}`}>
      <h1 className={styles.headerTitle}>
        {title ? `Sucursal: ${title}` : "MadMax Administración"}
      </h1>
      {/*Boton para volver a Inicio */}
      {type && (
        <button onClick={() => navigate("/")}>
          <svg width="25" version="1.1" viewBox="0 0 1024 1024">
            <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
          </svg>
          <span>Volver a Inicio</span>
        </button>
      )}
    </header>
  );
};

export default Header;
