export const token = (dataType = "")=>{
    const token = localStorage.getItem('token')
    // const secretKey = localStorage.getItem('secret_key')
    const header = {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
    }
    if (dataType.length > 0)
        header["Content-type"] = dataType
    return header
}


export const removeLoginToken = ()=>{
    localStorage.removeItem('token')
    // localStorage.removeItem('secret_key')
    // localStorage.removeItem('account_type')
}

export const tokenExist = () => !!localStorage.getItem('token')
