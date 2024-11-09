import { ChangeEvent, useState } from "react";

function useImage() {
   const [loading, setLoading] = useState(false);
   const [image, setImage] = useState<FormData>();
   const URL = "http://190.221.207.224:8090"
   const API_URL = `${URL}/images/uploads`

   const handler = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
         const formData = new FormData();
         formData.append("uploads", e.target.files[0]);
         setImage(formData);
      }
   };

   const service = async () => {
      setLoading(true)
      const resImage = await fetch(API_URL, {
         method: "POST",
         body: image,
      });
      const newData = await resImage.text();
      return newData
   }

   return {
      image,
      loading,
      setLoading,
      handler,
      service
   };
}

export default useImage;