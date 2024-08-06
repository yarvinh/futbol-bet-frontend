
const Image = ({img,index})=>{

    const handleOnMouseOver = (e)=>{
        let prevElementId = '0'
        const currentElementId = e.target.id.split("-")[1]
        if(e.relatedTarget?.className.includes("is-here"))
          prevElementId = e.relatedTarget.id?.split("-")[1]
        const prevElement = document.getElementById(`slider-nav-${prevElementId}`)
        const currentElement = document.getElementById(`slider-nav-${currentElementId}`)
        if(e.relatedTarget?.className.includes("is-here"))
          prevElement.style.backgroundColor = "black";
        currentElement.style.backgroundColor = "blue";
    } 


    return (
        <img  onMouseOver={handleOnMouseOver}  src={img.image_url} id={`slider-${index}`} className="chat-img is-here" key={img.id} alt="reply image"/>
    )
}

export default Image