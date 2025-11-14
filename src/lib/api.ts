export type BackendApiErr = {
  errMessage: string
}

export type Err = {
  status: number
} & BackendApiErr

export type ErrResponse = {
  status: number
  data: null
  err: Err
}

export type DataResponse<T> = {
  status: number
  data: T
  err: null
}

export type HttpResponse<T> = DataResponse<T> | ErrResponse
