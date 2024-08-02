import { useState } from "react"

export const useGetImage = (files)=>{
    const [image, setImage] = useState(null)

    if (files && files[0]) {
        setImage(URL.createObjectURL(files[0]));
    }

    return image

}