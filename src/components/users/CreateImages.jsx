import { useRef } from "react"
import { useDispatch } from "react-redux"
import {createImg} from "../../actions/settingsActions"
import imageCompression from 'browser-image-compression';

const CreateImages = () => {
    const dispatch = useDispatch()
    const imgRef = useRef({})

    const handleOnChange = async (e) => {
        const options = {
            maxSizeMB: .1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }
        const compressedFile =  await imageCompression(e.target.files[0], options);  
        // const imgUrl = URL.createObjectURL(compressedFile)
        imgRef.current = compressedFile
    }

    const handleOnSubmit = (e)=>{
        e.preventDefault()
        const formData = new FormData(); 
        formData.append("image", imgRef.current)
        dispatch(createImg(formData))
    }

   return (
    <form onSubmit={handleOnSubmit} className='img-form'> 
        <label className='sellect-img'>Add profile image</label>
        <input onChange={handleOnChange} name="image" className='sellect-img' type="file" accept="image/png, image/jpeg"/><br/>
        <input className="submit-image" type="submit" value="Add Image"/>
    </form>
   )
}

export default CreateImages