import { ChangeEvent, useState } from "react";

function useForm<T>(initial: T) {
   // Manejo de información de formulario
   const [dataForm, setDataForm] = useState<T>(initial);
   // Verifica que el campo tenga el tipo de dato solicitado correctamente
   const handlerChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      const newValue =
         !isNaN(Number(value)) && Number(value) !== 0 ? Number(value) : value;

      setDataForm(prevData => ({
         ...prevData,
         [name]: newValue
      }));
   };
   // Se utiliza para obtener booleano de input:checkbox
   const handlerCheck = (e: ChangeEvent<HTMLInputElement>) => {
      setDataForm({
         ...dataForm,
         [e.target.name]: e.target.checked
      })
   }

   return {
      dataForm,
      setDataForm,
      handlerChange,
      handlerCheck
   };
}

export default useForm;