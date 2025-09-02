import { AxiosError } from "axios";

export default function (axiosError: AxiosError | any) {
  const response: any = axiosError?.response

  if (response != null){
    let message = response.data?.detail?.message
    if (message) return message.toString()

    message = response.data?.detail
    if (message != null){
      if (typeof message === 'string'){
        return message
      } else{
        return JSON.stringify(message)
      }
    }

    return JSON.stringify(response.data)
  }

  return axiosError.message
}
