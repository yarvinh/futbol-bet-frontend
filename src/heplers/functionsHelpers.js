export const dateAndTime =(d)=>{
    const date = new Date(d)
    const time = new Date(d)
    return (
        <div>
            <span>{date.toDateString()} at </span>      
            <span>{time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
        </div>
    )
}