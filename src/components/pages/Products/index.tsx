import ContainerGrid from "../../ui/ContainerGrid/ContainerGrid"
import Header from "../../ui/Header/Header"
import { Options } from "./Options/Options"
import { TableAllergen } from "./TableAllergen/TableAllergen"


export const Products = () => {
  return (
    <>
        <Header title="" type="primary" />
        <ContainerGrid>
          <Options />
        <TableAllergen></TableAllergen>
        </ContainerGrid>

    </>
  )
}
