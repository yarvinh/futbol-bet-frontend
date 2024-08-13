export const SERVER_ERROR = {from: "from_server" , errors: ["Something went wrong with the server", "please try again later."]}

export const serverErrors = (error) =>{
    return {
        from: "from_server",
        errors: [error, "please try again later."]}
}