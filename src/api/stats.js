
import axios from 'axios'

export async function getPourHistory () {
  const result = await axios.get( '/api/pours' )
  return result.data.pours
}
