const ErrorsOrMsg = ({errorsOrMsg,className})=>{
   return(
    <div>
       {errorsOrMsg.map((e,index)=>{
        return <p key={index} className={className}><strong>{e}</strong></p>
       })}
    </div>
   )
}

export default ErrorsOrMsg