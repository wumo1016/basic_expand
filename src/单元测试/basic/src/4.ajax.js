import axios from 'axios'

export async function getList() {
  return await axios.get('/list')
}
