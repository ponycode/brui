
import axios from 'axios'

export async function getSettings ( settings ) {
  const result = await axios.get( '/api/settings', settings )
  return result.data
}

export async function saveSettings ( settings ) {
  const result = await axios.put( '/api/settings', settings )
  return result.data
}
