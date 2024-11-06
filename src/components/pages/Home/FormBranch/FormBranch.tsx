import { ChangeEvent, FC, useEffect, useState } from "react";
import ButtonForm from "../../../ui/ButtonForm/ButtonForm";
import styles from "./FormBranch.module.css";
import { ICreateSucursal } from "../../../../types/dtos/sucursal/ICreateSucursal";
import { helpHttp } from "../../../../helpers/helpHttp";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import { IPais } from "../../../../types/IPais";
import { IProvincia } from "../../../../types/IProvincia";
import { ILocalidad } from "../../../../types/ILocalidad";
import Modal from "../../../ui/Modal/Modal";
import { IUpdateSucursal } from "../../../../types/dtos/sucursal/IUpdateSucursal";
import Loader from "../../../ui/Loader/Loader";
import useImage from "../../../../hooks/useImage";
import useForm from "../../../../hooks/useForm";

interface ModalFormProps {
  idCompany: number | undefined;
  dataToEdit: ISucursal | null;
  closeModal: (state?: string) => void;
  getBranches: () => void;
}

interface Position {
  paises: IPais[] | null;
  provincias: IProvincia[] | null;
  localidades: ILocalidad[] | null;
}

const initial: ICreateSucursal = {
  nombre: "",
  horarioApertura: "00:00",
  horarioCierre: "00:00",
  esCasaMatriz: false,
  latitud: 0,
  longitud: 0,
  logo: "",
  domicilio: {
    calle: "",
    numero: 0,
    cp: 0,
    nroDpto: 0,
    idLocalidad: 0,
    piso: 0,
  },
  idEmpresa: 0,
  eliminado: false,
};

const FormBranch: FC<ModalFormProps> = ({
  idCompany,
  dataToEdit,
  closeModal,
  getBranches,
}) => {
  const { dataForm, setDataForm, handlerChange } = useForm<
    ICreateSucursal | ISucursal
  >({
    ...initial,
    idEmpresa: idCompany || 0,
  });

  const [position, setPosition] = useState<Position>({
    paises: null,
    provincias: null,
    localidades: null,
  });

  const { loading, handler, service } = useImage();
  const { getAll, post, put } = helpHttp();

  const handlerChangeDomicilio = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setDataForm(
      (data) =>
        ({
          ...data,
          domicilio: {
            ...data.domicilio,
            [e.target.name]:
              isNaN(Number(e.target.value)) || Number(e.target.value) == 0
                ? e.target.value
                : Number(e.target.value),
          },
        } as ISucursal | ICreateSucursal)
    );
  };

  const manageData = async (url: string) => {
    const items = await getAll<IProvincia | ILocalidad>(url);

    if ("provincia" in items[0]) {
      setPosition((elements) => ({
        ...elements,
        localidades: items as ILocalidad[],
      }));
    } else {
      setPosition((elements) => ({
        ...elements,
        provincias: items as IProvincia[],
      }));
    }
  };

  const handlerSubmit = async () => {
    const newImage = await service();
    let response = {};

    if (dataToEdit) {
      const { empresa, domicilio, ...preDataForm } = dataForm as ISucursal;
      const { localidad, ...finalDomicilio } = domicilio;

      const finalEdit: IUpdateSucursal = {
        ...preDataForm,
        idEmpresa: empresa?.id as number,
        domicilio: finalDomicilio,
        logo: newImage,
      };

      response = await put<IUpdateSucursal>(
        `sucursales/update/${finalEdit.idEmpresa}`,
        finalEdit
      );
    } else {
      response = await post<ICreateSucursal>(`sucursales/create`, {
        ...dataForm,
        logo: newImage,
      } as ICreateSucursal);
    }

    if (response) getBranches();
    closeModal();
  };

  useEffect(() => {
    if (dataToEdit) setDataForm(dataToEdit);

    getAll<IPais>(`paises`)
      .then((paises) =>
        setPosition((elements) => ({
          ...elements,
          paises: paises,
        }))
      )
      .catch(() => console.log("Conexion: No se ha podido obtener Paises"));
  }, []);

  return (
    <Modal>
      <div className={styles.modalContent}>
        <h2>{dataToEdit ? "Editar" : "Añadir"} Sucursal</h2>
        <form className={styles.modalForm}>
          <div className={styles.first}>
            <label>Ingrese nombre: </label>
            <input
              type="text"
              className={styles.formGroup}
              name="nombre"
              required
              placeholder="Ej: Rodolfo"
              value={dataForm.nombre}
              onChange={handlerChange}
            />
            <label>Ingrese latitud: </label>
            <input
              type="number"
              className={styles.formGroup}
              name="latitud"
              placeholder="Ingrese latitud"
              value={dataForm.latitud}
              onChange={handlerChange}
            />
            <label>Ingrese longitud: </label>
            <input
              type="number"
              className={styles.formGroup}
              name="longitud"
              placeholder="Ingrese longitud"
              value={dataForm.longitud}
              onChange={handlerChange}
            />
            <label>Ingrese codigo postal: </label>
            <input
              type="number"
              className={styles.formGroup}
              name="cp"
              required
              placeholder="Ingrese codigo postal"
              value={dataForm.domicilio.cp}
              onChange={handlerChangeDomicilio}
            />
          </div>
          <div className={styles.third}>
            <label>Ingrese calle: </label>
            <input
              type="text"
              className={styles.formGroup}
              name="calle"
              required
              placeholder="Ej: Avenida Ferro"
              value={dataForm.domicilio.calle}
              onChange={handlerChangeDomicilio}
            />
            <label>Ingrese número de calle: </label>
            <input
              type="number"
              className={styles.formGroup}
              name="numero"
              required
              placeholder="Ingrese número de calle"
              value={dataForm.domicilio.numero}
              onChange={handlerChangeDomicilio}
            />
            <label>Ingrese número de departamento: </label>
            <input
              type="number"
              className={styles.formGroup}
              name="nroDpto"
              placeholder="Ingrese N° de departamento"
              value={dataForm.domicilio.nroDpto}
              onChange={handlerChangeDomicilio}
            />
            <label>Ingrese número de piso: </label>
            <input
              type="number"
              className={styles.formGroup}
              name="piso"
              placeholder="Ingrese N° de piso"
              value={dataForm.domicilio.piso}
              onChange={handlerChangeDomicilio}
            />
          </div>
          <div className={styles.second}>
            <div>
              <label>Ingrese horario de apertura: </label>
              <input
                type="time"
                className={styles.formGroup}
                name="horarioApertura"
                required
                value={dataForm.horarioApertura}
                onChange={handlerChange}
              />
            </div>
            <div>
              <label htmlFor="horario-c">Ingrese horario de cierre: </label>
              <input
                type="time"
                className={styles.formGroup}
                name="horarioCierre"
                required
                value={dataForm.horarioCierre}
                onChange={handlerChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Seleccione país: </label>
              <select
                name="country"
                required
                onChange={(e) =>
                  manageData(`provincias/findByPais/${e.target.value}`)
                }
              >
                <option value="">Seleccione...</option>
                {position.paises != null &&
                  position.paises?.map((pais, id) => (
                    <option key={id} value={pais.id}>
                      {pais.nombre}
                    </option>
                  ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Seleccione provincia: </label>
              <select
                name="province"
                required
                onChange={(e) =>
                  manageData(`localidades/findByProvincia/${e.target.value}`)
                }
              >
                <option value="">Seleccione...</option>
                {position.provincias != null &&
                  position.provincias?.map((prov, id) => (
                    <option key={id} value={prov.id}>
                      {prov.nombre}
                    </option>
                  ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Seleccione localidad: </label>
              <select
                name="idLocalidad"
                onChange={handlerChangeDomicilio}
                required
              >
                <option value="">Seleccione...</option>
                {position.localidades != null &&
                  position.localidades?.map((local, id) => (
                    <option key={id} value={local.id}>
                      {local.nombre}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className={styles.fourthy}>
            <div>
              <label htmlFor="image">Elija una imagen: </label>
              <label className={styles.customFileUpload}>
                <input
                  type="file"
                  id="image"
                  name="image"
                  required
                  onChange={handler}
                />
              </label>
            </div>
            <div className={styles.containerButtons}>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <ButtonForm
                    type="cancel"
                    text="Cancelar"
                    event={() => closeModal()}
                  />
                  <ButtonForm
                    type="confirm"
                    text="Confirmar"
                    event={handlerSubmit}
                  />
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default FormBranch;
