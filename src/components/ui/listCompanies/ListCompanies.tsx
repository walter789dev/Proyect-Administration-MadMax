import { FC, useState } from "react";
import styles from "./listCompanies.module.css";
import Company from "../company/Company";
import PrimaryButton from "../button/Button";
import { Button, Form, Modal } from "react-bootstrap";
import { ICreateEmpresaDto } from "../../../types/dtos/empresa/ICreateEmpresaDto";

interface CompaniesProps {
  color: string;
}

const ListCompanies: FC<CompaniesProps> = ({ color }) => {

  const [empresas, setEmpresas] = useState<ICreateEmpresaDto[]>([]);
  
  const [empresaData, setEmpresaData] = useState<ICreateEmpresaDto>({
    nombre: "",
    razonSocial: "",
    cuit: 0,
    logo: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmpresaData({
      ...empresaData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setEmpresas([...empresas, empresaData]);
    
    setEmpresaData({
      nombre: "",
      razonSocial: "",
      cuit: 0,
      logo: null,
    });
    handleCloseModal();
  };


  return (
    <nav className={styles.companies} style={{ backgroundColor: color }}>
      <h2 className={styles.companiesTitle}>Todas las Empresas </h2>
      <Button variant="primary" onClick={handleOpenModal}>Agregar Empresa</Button>
      <ul className={styles.companiesUl}>
        <Company />
      </ul>
      <PrimaryButton text="Empresa" type="primary" />

      {/* Modal */}
      <Modal show={isModalOpen} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Empresa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre de la Empresa</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={empresaData.nombre}
                onChange={handleInputChange}
                placeholder="Nombre de la empresa"
              />
            </Form.Group>
            <Form.Group controlId="formRazonSocial">
              <Form.Label>Razón Social</Form.Label>
              <Form.Control
                type="text"
                name="razonSocial"
                value={empresaData.razonSocial}
                onChange={handleInputChange}
                placeholder="Razón social"
              />
            </Form.Group>
            <Form.Group controlId="formCuit">
              <Form.Label>CUIT</Form.Label>
              <Form.Control
                type="text"
                name="cuit"
                value={empresaData.cuit}
                onChange={handleInputChange}
                placeholder="CUIT"
              />
            </Form.Group>
            <Form.Group controlId="formLogo">
              <Form.Label>Logo</Form.Label>
              <Form.Control
                type="text"
                name="logo"
                value={empresaData.logo || ""}
                onChange={handleInputChange}
                placeholder="URL del logo"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Guardar Empresa
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default ListCompanies;
