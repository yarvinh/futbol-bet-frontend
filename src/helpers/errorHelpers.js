import { SERVER_ERROR } from "../actions/errorsConst"

export const serverErrors = (error) =>{
    if(error.response?.data.errors_or_messages)
      return error.response?.data.errors_or_messages
    else
     return SERVER_ERROR
}