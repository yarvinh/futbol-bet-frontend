import './style.css';

const ImagesCarrusel = ({images}) => {
   return(
    <section>
        <div className="images-conainer">
           <div className="slider-wrapper">
            <div className="slider">
                 {images.map((img,index)=>{
                     return <img src={img.image_url} id={`slider-${index}`} className="chat-img" key={img.id} alt="reply image"/>
                 })}
            </div>
           </div>
        </div>
        <div className="slider-nav">
            {images.map((image,index)=>{
               return <a key={index} href={`#slider-${index}`}/>
            })}
        </div>
    </section>
   )
}

export default ImagesCarrusel

