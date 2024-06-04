const ErrorsOrMsg = ({errorsOrMsg})=>{
   return(
    <div>
       {errorsOrMsg.map((e,index)=>{
        return <p key={index} className="Errors"><strong>{e}</strong></p>
       })}
    </div>
   )
}

export default ErrorsOrMsg