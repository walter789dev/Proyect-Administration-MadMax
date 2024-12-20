import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./FormBranch.module.css";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { IPais } from "../../../types/IPais";
import { IProvincia } from "../../../types/IProvincia";
import { ILocalidad } from "../../../types/ILocalidad";
import { ICreateSucursal } from "../../../types/dtos/sucursal/ICreateSucursal";
import { IUpdateSucursal } from "../../../types/dtos/sucursal/IUpdateSucursal";
import useForm from "../../../hooks/useForm";
import useImage from "../../../hooks/useImage";
import Modal from "../../shared/Modal";
import Loader from "../../shared/Loader";
import ButtonForm from "../../shared/ButtonForm";
import { BranchService } from "../../../services/Home/BranchService";
import { PaisService } from "../../../services/Home/PaisService";
import { ProvinciaService } from "../../../services/Home/ProvinciaService";
import { LocalidadService } from "../../../services/Home/LocalidadService";

interface ModalFormProps {
  idCompany: number | undefined;
  dataToEdit: ISucursal | null;
  closeModal: (state?: string) => void;
  setBranches: (updater: (state: ISucursal[]) => ISucursal[]) => void;
}

interface Position {
  paises: IPais[] | null;
  provincias: IProvincia[] | null;
  localidades: ILocalidad[] | null;
}

// Estado Inicial del Formulario
const initial: ICreateSucursal = {
  nombre: "",
  horarioApertura: "00:00",
  horarioCierre: "00:00",
  esCasaMatriz: false,
  latitud: null,
  longitud: null,
  logo: "",
  domicilio: {
    calle: "",
    numero: null,
    cp: null,
    nroDpto: null,
    idLocalidad: 0,
    piso: null,
  },
  idEmpresa: 0,
  eliminado: false,
};

// ------------- Formulario de Sucursal ------------
const FormBranch: FC<ModalFormProps> = ({
  idCompany,
  dataToEdit,
  closeModal,
  setBranches,
}) => {
  const { dataForm, setDataForm, handlerChange } = useForm<
    ICreateSucursal | ISucursal
  >({
    ...initial,
    idEmpresa: idCompany || 0,
  });
  // Manejo de los valores de los selects del formulario
  const [position, setPosition] = useState<Position>({
    paises: null,
    provincias: null,
    localidades: null,
  });
  // Contiene la información de la imagen cargada + manejo
  const branchService = new BranchService("sucursales");
  const { image, loading, handler, service } = useImage();

  const handlerChangeDomicilio = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const numValue = Number(e.target.value);
    const finalValue =
      !isNaN(numValue) && numValue !== 0 ? numValue : e.target.value;

    setDataForm(
      (data) =>
        ({
          ...data,
          domicilio: {
            ...data.domicilio,
            [e.target.name]: finalValue,
          },
        } as ISucursal | ICreateSucursal)
    );
  };
  // Obtiene las provincias y localidades del pais seleccionado
  const manageData = async (id: string, type?: "Prov") => {
    const service =
      type === "Prov"
        ? new ProvinciaService("provincias")
        : new LocalidadService("localidades");

    const endpoint =
      type === "Prov" ? `findByPais/${id}` : `findByProvincia/${id}`;

    const items = await service.getAll(endpoint);

    setPosition((prev) => ({
      ...prev,
      [type === "Prov" ? "provincias" : "localidades"]: items,
    }));
  };

  const handlerSubmit = async () => {
    let newImage = image ? await service() : dataForm.logo;

    if (dataToEdit) {
      const { empresa, domicilio, ...preDataForm } = dataForm as ISucursal;
      const { localidad, ...finalDomicilio } = domicilio;

      const finalEdit: IUpdateSucursal = {
        ...preDataForm,
        idEmpresa: empresa?.id as number,
        domicilio: {
          ...finalDomicilio,
          idLocalidad: domicilio.idLocalidad,
        },
        logo: newImage,
      };

      const editBranch = await branchService.put(
        `update/${finalEdit.idEmpresa}`,
        finalEdit
      );

      setBranches(
        (branches: ISucursal[]) =>
          branches.map((branch) =>
            branch.id === editBranch.id ? editBranch : branch
          ) as ISucursal[]
      );
    } else {
      const newBranch = await branchService.post(`create`, {
        ...dataForm,
        logo: newImage,
      });
      setBranches(
        (branches: ISucursal[]) => [...branches, newBranch] as ISucursal[]
      );
    }

    closeModal();
  };

  useEffect(() => {
    const getFormBranch = async () => {
      const paisService = new PaisService("paises");

      const paises = await paisService.getAll();
      setPosition((elements) => ({
        ...elements,
        paises: paises,
      }));

      if (dataToEdit) {
        const localidad = dataToEdit.domicilio.localidad;
        manageData(`${localidad.provincia.pais.id}`, "Prov");
        manageData(`${localidad.provincia.id}`);
        setDataForm(dataToEdit);
      }
    };

    getFormBranch();
  }, []);

  return (
    <Modal>
      <section className={styles.modalContent}>
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
              value={dataForm.latitud ?? ""}
              onChange={handlerChange}
            />
            <label>Ingrese longitud: </label>
            <input
              type="number"
              className={styles.formGroup}
              name="longitud"
              placeholder="Ingrese longitud"
              value={dataForm.longitud ?? ""}
              onChange={handlerChange}
            />
            <label>Ingrese codigo postal: </label>
            <input
              type="number"
              className={styles.formGroup}
              name="cp"
              required
              placeholder="Ingrese codigo postal"
              value={dataForm.domicilio.cp ?? ""}
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
              value={dataForm.domicilio.numero ?? ""}
              onChange={handlerChangeDomicilio}
            />
            <label>Ingrese número de departamento: </label>
            <input
              type="number"
              className={styles.formGroup}
              name="nroDpto"
              placeholder="Ingrese N° de departamento"
              value={dataForm.domicilio.nroDpto ?? ""}
              onChange={handlerChangeDomicilio}
            />
            <label>Ingrese número de piso: </label>
            <input
              type="number"
              className={styles.formGroup}
              name="piso"
              placeholder="Ingrese N° de piso"
              value={dataForm.domicilio.piso ?? ""}
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
                value={dataToEdit?.domicilio.localidad.provincia.pais.id}
                onChange={(e) => manageData(e.target.value, "Prov")}
              >
                <option value="">Seleccione...</option>
                {position.paises != null &&
                  position.paises?.map((pais, id) => {
                    if (
                      dataToEdit?.domicilio.localidad.provincia.pais.id ===
                      pais.id
                    ) {
                      return (
                        <option key={id} value={pais.id} selected>
                          {pais.nombre}
                        </option>
                      );
                    }
                    return (
                      <option key={id} value={pais.id}>
                        {pais.nombre}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Seleccione provincia: </label>
              <select
                name="province"
                required
                onChange={(e) => manageData(e.target.value)}
              >
                <option value="">Seleccione...</option>
                {position.provincias != null &&
                  position.provincias?.map((prov, id) => {
                    if (
                      dataToEdit?.domicilio.localidad.provincia.id === prov.id
                    ) {
                      return (
                        <option key={id} value={prov.id} selected>
                          {prov.nombre}
                        </option>
                      );
                    }
                    return (
                      <option key={id} value={prov.id}>
                        {prov.nombre}
                      </option>
                    );
                  })}
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
                  position.localidades?.map((local, id) => {
                    if (dataToEdit?.domicilio.localidad.id === local.id) {
                      return (
                        <option key={id} value={local.id} selected>
                          {local.nombre}
                        </option>
                      );
                    } else {
                      return (
                        <option key={id} value={local.id}>
                          {local.nombre}
                        </option>
                      );
                    }
                  })}
              </select>
            </div>
          </div>
          <div className={styles.fourthy}>
            <div>
              <label htmlFor="image">
                Elija una imagen:{" "}
                <b>
                  {image || dataForm.logo
                    ? "Tiene una imagen cargada"
                    : "No hay imagen"}
                </b>
              </label>
              <label className={styles.customFileUpload}>
                <svg viewBox="0 -960 960 960">
                  <path d="M440-440ZM120-120q-33 0-56.5-23.5T40-200v-480q0-33 23.5-56.5T120-760h126l74-80h240v80H355l-73 80H120v480h640v-360h80v360q0 33-23.5 56.5T760-120H120Zm640-560v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM440-260q75 0 127.5-52.5T620-440q0-75-52.5-127.5T440-620q-75 0-127.5 52.5T260-440q0 75 52.5 127.5T440-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Z" />
                </svg>
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
      </section>
    </Modal>
  );
};

export default FormBranch;
