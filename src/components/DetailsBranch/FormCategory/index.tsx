import { FC, useEffect } from "react";
import styles from "./FormCategory.module.css";
import { IUpdateCategoria } from "../../../types/dtos/categorias/IUpdateCategoria";
import { ICreateCategoria } from "../../../types/dtos/categorias/ICreateCategoria";
import ButtonForm from "../../shared/ButtonForm";
import Modal from "../../shared/Modal";
import useForm from "../../../hooks/useForm";
import { helpHttp } from "../../../helpers/helpHttp";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";

interface FormProps {
  id: string | undefined;
  dataToEdit: IUpdateCategoria | null;
  type: "Padre" | "Hija";
  closeModal: () => void;
  setCategorias: (updater: (state: ICategorias[]) => ICategorias[]) => void;
}

const FormCategory: FC<FormProps> = ({
  id,
  dataToEdit,
  type,
  closeModal,
  setCategorias,
}) => {
  const { dataForm, handlerChange, setDataForm } = useForm<
    ICreateCategoria | IUpdateCategoria
  >({
    denominacion: "",
    idSucursales: [Number(id)],
  });

  const { post } = helpHttp();

  const handlerSubmit = async () => {
    if (type === "Padre") {
      if (dataToEdit) {
      } else {
        console.log(dataForm, dataToEdit);
        const res = await post<ICreateCategoria>(
          `categorias/create`,
          dataForm as ICreateCategoria
        );
        if (res)
          setCategorias(
            (categorias) =>
              [...categorias, { ...dataForm, id: res.id }] as ICategorias[]
          );
      }
    } else {
    }
    closeModal();
  };

  useEffect(() => {
    if (dataToEdit) setDataForm(dataToEdit);
  }, []);
  return (
    <Modal>
      <section className={styles.modalSection}>
        <h2>
          {dataToEdit ? "Editar" : "Añadir"} Categoria {type}
        </h2>
        <form className={styles.modalForm}>
          <input
            name="denominacion"
            type="text"
            required
            placeholder="Ingrese nombre de categoria"
            value={dataForm.denominacion}
            onChange={handlerChange}
          />
          <div className={styles.modalButtons}>
            <ButtonForm
              text="Cancelar"
              type="cancel"
              event={() => closeModal()}
            />
            <ButtonForm text="Confirmar" type="confirm" event={handlerSubmit} />
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default FormCategory;
