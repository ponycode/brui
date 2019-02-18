
import axios from 'axios'

export async function saveSettings ( settings ) {
  const result = await axios.put( '/api/settings', settings )
  return result
}
