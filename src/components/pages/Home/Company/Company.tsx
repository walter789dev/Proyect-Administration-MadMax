import IconItem from "../../../ui/iconItem/IconItem";
import styles from "./company.module.css";

const Company = () => {
  return (
    <li className={styles.company}>
      <div>
        <h3 className={styles.companyTitle}>Bendito Rufian</h3>
        <h4 className={styles.companySubTitle}>Restaurante</h4>
      </div>
      <div className={styles.companySvg}>
        <IconItem>
          <svg width="30" viewBox="0 0 576 512" fill="#fff">
            <path d="M288 144a110.9 110.9 0 0 0 -31.2 5 55.4 55.4 0 0 1 7.2 27 56 56 0 0 1 -56 56 55.4 55.4 0 0 1 -27-7.2A111.7 111.7 0 1 0 288 144zm284.5 97.4C518.3 135.6 410.9 64 288 64S57.7 135.6 3.5 241.4a32.4 32.4 0 0 0 0 29.2C57.7 376.4 165.1 448 288 448s230.3-71.6 284.5-177.4a32.4 32.4 0 0 0 0-29.2zM288 400c-98.7 0-189.1-55-237.9-144C98.9 167 189.3 112 288 112s189.1 55 237.9 144C477.1 345 386.7 400 288 400z" />
          </svg>
        </IconItem>
        <IconItem>
          <svg width="20" viewBox="0 0 512 512" fill="#fff">
            <path d="M290.7 93.2l128 128-278 278-114.1 12.6C11.4 513.5-1.6 500.6 .1 485.3l12.7-114.2 277.9-277.9zm207.2-19.1l-60.1-60.1c-18.8-18.8-49.2-18.8-67.9 0l-56.6 56.6 128 128 56.6-56.6c18.8-18.8 18.8-49.2 0-67.9z" />
          </svg>
        </IconItem>
      </div>
    </li>
  );
};

export default Company;
