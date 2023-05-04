export type MailTokenData = {
  email: string
  token: string
}
export interface ResponseGetMailToken {
  status: string
  message: string
  responseData: MailTokenData
}

export interface ResponseGetEmail {
  status: string
  message: string
  responseData: string
}
