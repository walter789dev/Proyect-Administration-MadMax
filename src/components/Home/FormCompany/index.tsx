import { FC, useEffect } from "react";
import styles from "./FormCompany.module.css";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import useForm from "../../../hooks/useForm";
import useImage from "../../../hooks/useImage";
import Modal from "../../shared/Modal";
import Loader from "../../shared/Loader";
import ButtonForm from "../../shared/ButtonForm";
import { CompanyService } from "../../../services/Home/CompanyService";

interface ModalProps {
  dataToEdit: IEmpresa | null;
  closeModal: (state?: string) => void;
  setCompany: (updater: (state: IEmpresa[]) => IEmpresa[]) => void;
}

// ------------ Formulario de Empresa ---------
const FormCompany: FC<ModalProps> = ({
  dataToEdit,
  closeModal,
  setCompany,
}) => {
  const { dataForm, setDataForm, handlerChange } = useForm<IEmpresa>({
    nombre: "",
    razonSocial: "",
    cuit: "",
    logo: "",
  });

  const companyService = new CompanyService("empresas");
  // Información de la imagen creada para enviar al servidor
  const { image, loading, handler, service, setLoading } = useImage();

  const handlerSubmit = async () => {
    const voidValues = Object.keys(dataForm).some((item) => item.length === 0);

    if (voidValues && !image && dataForm.logo.length) {
      alert("Faltan campos por completar");
      setLoading(false);
      return;
    }

    const newImage = await service();
    let resInfo = { ...dataForm, logo: newImage || dataForm.logo };

    if (dataToEdit) {
      const editCompany = await companyService.put(`${dataForm.id}`, resInfo);
      setCompany((companies: IEmpresa[]) =>
        companies.map((c) => (c.id === editCompany.id ? editCompany : c))
      );
    } else {
      const newCompany = await companyService.post(resInfo);
      setCompany((companies: IEmpresa[]) => ({
        ...companies,
        newCompany,
      }));
    }
    closeModal();
  };

  useEffect(() => {
    if (dataToEdit) setDataForm(dataToEdit);
  }, []);

  return (
    <Modal>
      <section className={styles.modalSection}>
        <h2>{dataToEdit ? "Editar" : "Añadir"} Empresa</h2>
        <form className={styles.modalForm}>
          <input
            name="nombre"
            type="text"
            required
            placeholder="Ingrese Nombre"
            value={dataForm.nombre}
            onChange={handlerChange}
          />
          <input
            name="razonSocial"
            type="text"
            required
            placeholder="Ingrese Razon Social"
            value={dataForm.razonSocial}
            onChange={handlerChange}
          />
          <input
            name="cuit"
            type="number"
            required
            placeholder="Ingrese Cuit"
            value={dataForm.cuit}
            onChange={handlerChange}
          />
          <label className={styles.modalLabel} htmlFor="image">
            Ingrese Logo de empresa:{" "}
            {(image || dataForm.logo) && <b>Tiene una imagen cargada</b>}
          </label>
          <label className={styles.customFileUpload}>
            <svg viewBox="0 -960 960 960">
              <path d="M440-440ZM120-120q-33 0-56.5-23.5T40-200v-480q0-33 23.5-56.5T120-760h126l74-80h240v80H355l-73 80H120v480h640v-360h80v360q0 33-23.5 56.5T760-120H120Zm640-560v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM440-260q75 0 127.5-52.5T620-440q0-75-52.5-127.5T440-620q-75 0-127.5 52.5T260-440q0 75 52.5 127.5T440-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Z" />
            </svg>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handler}
              accept="image/jpge, image/jpg"
            />
          </label>
          {/* Cancelar y Enviar/Actualizar Empresa en BBDD */}
          <div className={styles.modalButtons}>
            {loading ? (
              <Loader />
            ) : (
              <>
                <ButtonForm
                  text="Cancelar"
                  type="cancel"
                  event={() => closeModal()}
                />
                <ButtonForm
                  text="Confirmar"
                  type="confirm"
                  event={handlerSubmit}
                />
              </>
            )}
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default FormCompany;
