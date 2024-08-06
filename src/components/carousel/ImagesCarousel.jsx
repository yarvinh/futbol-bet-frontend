import { useRef } from 'react';
import './style.css';

const ImagesCarousel = ({images}) => {
    const prev = useRef()
    const handleOnClick = (e)=> {
        if(e.target.className.includes("onclick") ){
           prev.current.style.backgroundColor = "black"
           prev.current = e.target
           e.target.style.backgroundColor = "blue"
        }
    }

    const handleOnMouseOver = (e)=>{
        let prevElementId = '0'
        const currentElementId = e.target.id.split("-")[1]

        if(e.relatedTarget?.className.includes("is-here"))
          prevElementId = e.relatedTarget.id?.split("-")[1]

        const prevElement = document.getElementById(`slider-nav-${prevElementId}`)
        const currentElement = document.getElementById(`slider-nav-${currentElementId}`)
        currentElement.style.backgroundColor = "blue";
        prev.current = currentElement

        if(e.relatedTarget?.className.includes("is-here"))
          prevElement.style.backgroundColor = "black";
       
    } 

   const handleOnTouchStart = (e)=>{
     console.log(e.target)
   }


   return(
    <section>
        <div className="images-conainer">
           <div className="slider-wrapper">
            <div  className="slider">
                 {images.map((img,index)=>{
                    // return <Image key={img.id} img={img} index={index}/>
                    return <img onTouchEnd={handleOnTouchStart} onMouseOver={handleOnMouseOver}  src={img.image_url} id={`slider-${index}`} className="chat-img is-here" key={img.id} alt="reply image"/>
                    //  return <img src={img.image_url} id={`slider-${index}`} className="chat-img" key={img.id} alt="reply image"/>
                 })}
            </div>
           </div>
        </div>
        <div className="slider-nav">
            {images.map((image,index)=>{
               return <a ref={prev} onClick={handleOnClick} className="onclick" key={index} id={`slider-nav-${index}`} href={`#slider-${index}`}/>
            })}
        </div>
    </section>
   )
}

export default ImagesCarousel

