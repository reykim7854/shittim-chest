import { api } from 'src/boot/axios'

const apiGet = async (url: string, params: any = {}) => {
  return await api.get(url, params)
}

export { apiGet }
