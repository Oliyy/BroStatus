// type definitions for the whole app

export interface status {
  main: string,
  sub?: string
}

export interface person {
  name: string,
  profilePicture?: string,
  status?: status
}

export interface socketRequest {
  type: string,
  status?: status,
  person?: person
}

export interface stateFunctions {
  setConnected: any,
  setPeopleStatus: any,
  setStatusList: any
}

export interface statusListOption {
  name: string,
  color: string,
  subStatusOptions: Array<string>
}
