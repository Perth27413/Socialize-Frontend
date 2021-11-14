export interface ImageModel {
  data: Data
  success: boolean
  status: number
}

export interface Data {
  id: string
  title: string
  url_viewer: string
  url: string
  display_url: string
  size: number
  time: string
  expiration: string
  image: Image
  thumb: Thumb
  delete_url: string
}

export interface Image {
  filename: string
  name: string
  mime: string
  extension: string
  url: string
}

export interface Thumb {
  filename: string
  name: string
  mime: string
  extension: string
  url: string
}
