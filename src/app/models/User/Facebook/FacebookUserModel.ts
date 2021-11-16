export interface FacebookUserModel {
  id: string
  name: string
  email: string
  photoUrl: string
  firstName: string
  lastName: string
  authToken: string
  response: Response
  provider: string
}

export interface Response {
  name: string
  email: string
  picture: Picture
  first_name: string
  last_name: string
  id: string
}

export interface Picture {
  data: Data
}

export interface Data {
  height: number
  is_silhouette: boolean
  url: string
  width: number
}
