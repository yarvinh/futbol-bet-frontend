
const Image = ({img,index})=>{
    return (
        <img  src={img.image_url} id={`slider-${img.id}`} className="chat-img is-here" key={img.id} alt="reply image"/>
    )
}

export default Image