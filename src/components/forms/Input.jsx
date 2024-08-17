import { useRef, useState } from "react";
import { useDispatch} from "react-redux";
import imageCompression from 'browser-image-compression';
import Emojis from "./Emojis";
import './style.css';
import { v4 as uuidv4 } from 'uuid';

const Input = ({submitButton, ids, createAction, name, path, upLoadImages})=>{

    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState("")
    const [imageUrl, setImageUrl] = useState([])
    const imagesRef = useRef([])
    const imagesPayload = useRef([])

    const handleOnImg = (e) =>{
        const imgsArray = Array.from(e.target.files)
        if (e.target.files && e.target.files[0]) {
            const imgsUrl = imgsArray.map(img => URL.createObjectURL(img))
            setImageUrl(imgsUrl);
        }

        imagesRef.current = imgsArray

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }
        imagesRef.current.forEach(async (file)=>{   
            const compressedFile = await imageCompression(file, options);  
            imagesPayload.current.push(compressedFile)
        })
    }
 
    const handleOnChange = (e)=>{
        if(e.which === 13 && !submitButton)
          e.preventDefault()
        e.target.style.height = "1px";
        e.target.style.height = (e.target.scrollHeight)+"px";
        setInputValue(e.target.value,)
    }

    const handleOnKeyUp = (e)=>{
        if (e.code  === 'Enter' && !submitButton){
            dispatch(createAction({
                payload: imagesRef.current,
                [name]: {
                    ...ids,
                    [name]: inputValue
                },
                path: path
            }))
            setInputValue('')
            setImageUrl([])
            e.target.style.height = "1px";  
        }
    }

    const handleOnClick=(e)=>{
        setInputValue((pre)=>{
            return `${pre} ${e.target.value}`
        })
    }

    const handleOnSubmit = (e)=>{
        e.preventDefault()
        const formData = new FormData(); 
        imagesRef.current.forEach(async file =>formData.append("images[]", file) )
        dispatch(createAction({
            payload: formData ,
            [name]: {
                ...ids,
                [name]: inputValue
            },
            path: path
        }))
        imagesPayload.current = []
        setImageUrl([])
        setInputValue('')
    }

    const handleOnClickRemove = (e) =>{
        imagesRef.current.splice(e.target.name, 1)
        const modifiedImgsUrl = imagesRef.current.map(img => URL.createObjectURL(img))
        setImageUrl( modifiedImgsUrl);
    }

    return(
        <div >
            <form className="reply-form" onSubmit={handleOnSubmit} onKeyUp={handleOnKeyUp} >
                {imageUrl.length > 0 && <div className="payload-images">
                    {imageUrl.map((url,index)=>{
                        return (
                            <div className="image-frame" key={uuidv4()}>
                                <img src="../close.svg" onClick={handleOnClickRemove} name={index} className='delete-image' alt="X delete reply"/>
                                <img id="blah"  className="comment-and-reply-image" src={url} alt="your image" /> 
                            </div>
                        )
                    })}
                </div>}
                <textarea  onKeyPress={handleOnChange} onChange={handleOnChange} rows="1" className="reply-input standar-input" value={inputValue}></textarea> 
                {submitButton && <input className="comment-submit-button" type="submit" value="Submit"/>}
                <div className="text-area-emojis-container">
                    {upLoadImages && <div className="input-container">
                        <input onChange={handleOnImg} name="images"   multiple className='input-file' type="file" accept="image/png, image/jpeg"/>
                    </div>}
                    <Emojis handleOnClick={handleOnClick}/>
                </div> 
            </form> 
        </div>
    )
}

export default Input