const ErrorsOrMsg = ({errors,msg,className})=>{
   if(errors){
      return(
         <div className="alert alert-danger">
            {errors.map((e,index)=>{
            return <p key={index} className={className}><strong>{e}</strong></p>
            })}
         </div>
      )
   }else{
      return(
         <div className="alert alert-primary">
            {msg.map((e,index)=>{
            return <p key={index} className={className}><strong>{e}</strong></p>
            })}
         </div>
      )
   }
}

export default ErrorsOrMsg