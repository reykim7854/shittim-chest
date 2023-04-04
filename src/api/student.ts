import { apiGet } from 'src/api/index'

const getStudents = (params: any = {}) => {
  return apiGet('/character', params)
}

export { getStudents }
