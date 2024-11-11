import { FC, useEffect } from "react";
import styles from "./FormCategory.module.css";
import { IUpdateCategoria } from "../../../types/dtos/categorias/IUpdateCategoria";
import { ICreateCategoria } from "../../../types/dtos/categorias/ICreateCategoria";
import ButtonForm from "../../shared/ButtonForm";
import Modal from "../../shared/Modal";
import useForm from "../../../hooks/useForm";
import { helpHttp } from "../../../helpers/helpHttp";
import { useAppSelector } from "../../../hooks/redux";

interface Type {
  type: "Padre" | "Hija";
  id: number | null;
}

interface FormProps {
  id: number | undefined;
  dataToEdit: IUpdateCategoria | null;
  type: Type;
  closeModal: () => void;
  setCategorias: (
    updater: (state: ICreateCategoria[]) => ICreateCategoria[]
  ) => void;
  setActive: (state: boolean) => void;
}

const FormCategory: FC<FormProps> = ({
  id,
  dataToEdit,
  type,
  closeModal,
  setCategorias,
  setActive,
}) => {
  const idEmpresa = useAppSelector((state) => state.companyReducer.active?.id);
  const { dataForm, handlerChange, setDataForm } = useForm<
    ICreateCategoria | IUpdateCategoria
  >({
    denominacion: "",
    idEmpresa: idEmpresa,
    idCategoriaPadre: type.id,
  });

  const { post, put } = helpHttp();

  const handlerSubmit = async () => {
    if (type.type === "Padre") {
      if (dataToEdit) {
        const res = await put<IUpdateCategoria>(
          `categorias/update/${dataForm.id}`,
          {
            ...dataForm,
            idSucursales: [id],
            idEmpresa,
          } as IUpdateCategoria
        );

        if (res) {
          setCategorias((categorias) => {
            const filter = categorias.filter(
              (category) => category.id != dataForm.id
            );
            return [...filter, dataForm];
          });
        }
      } else {
        const res = await post<ICreateCategoria>(
          `categorias/create`,
          dataForm as ICreateCategoria
        );
        if (res) setCategorias((categorias) => [...categorias, res]);
      }
    } else {
      if (dataToEdit) {
        const res = await put<IUpdateCategoria>(
          `categorias/update/${dataForm.id}`,
          dataForm as IUpdateCategoria
        );
        if (res) setActive(false);
      } else {
        await post<ICreateCategoria>(`categorias/create`, dataForm);
      }
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
          {dataToEdit ? "Editar" : "Añadir"} Categoria {type.type}
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
