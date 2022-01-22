export interface status {
  main: string,
  sub?: string
}

export interface person {
  name: string,
  profilePicture?: string
  status?: status
}

export interface socketRequest {
  type: string,
  status?: status,
  person?: person
}

export interface stateFunctions {
  setConnected: any;
  setPeopleStatus: any;
}
